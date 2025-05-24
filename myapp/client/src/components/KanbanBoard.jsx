import React, { useState, useEffect, useRef } from 'react';
import KanbanColumn from './KanbanColumn';
import ModalNewTask from './ModalNewTask.jsx';
import TeamChat from './TeamChat.jsx';

const WS_URL = 'ws://localhost:5000';

const KanbanBoard = () => {
    const [columns, setColumns] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);
    const [draggedTask, setDraggedTask] = useState(null);
    const [sourceColumnTitle, setSourceColumnTitle] = useState(null);

    const ws = useRef(null);
    const currentUser = "const username";


    const [chatMessages, setChatMessages] = useState([]);


    useEffect(() => {
        ws.current = new WebSocket(WS_URL);

        ws.current.onopen = () => {
            console.log('Connected to WebSocket server for Kanban updates.');
        };

        ws.current.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);
                if (message.type === 'kanban_update') {
                    console.log('Received kanban update:', message.payload);
                    setColumns(message.payload);
                } else if (message.type === 'message') {
                    console.log('Received chat message (in KanbanBoard):', message);
                    setChatMessages((prevMessages) => [...prevMessages, message]);
                }
            } catch (error) {
                console.error('Error parsing WebSocket message:', error, event.data);
            }
        };

        ws.current.onclose = () => {
            console.log('Disconnected from WebSocket server.');
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);

    const handleOpenAddTaskModal = (columnTitle) => {
        setSelectedColumn(columnTitle);
        setIsModalOpen(true);
    };

    const handleCloseAddTaskModal = () => {
        setIsModalOpen(false);
        setSelectedColumn(null);
    };

    const handleSubmitNewTask = (newTaskData) => {
        if (!newTaskData.title) return;

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'kanban_action',
                action: 'add_task',
                payload: {
                    column: selectedColumn,
                    task: {
                        title: newTaskData.title,
                        description: newTaskData.description || 'Нет описания',
                        assignee: newTaskData.assignee || 'Не назначен',
                        dueDate: newTaskData.dueDate || '',
                        priority: newTaskData.priority || 'Low',
                    },
                    user: currentUser
                }
            }));
        }
        handleCloseAddTaskModal();
    };

    const handleDragStart = (e, task, currentColumnTitle) => {
        setDraggedTask(task);
        setSourceColumnTitle(currentColumnTitle);
        e.dataTransfer.setData('text/plain', task.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDrop = (droppedTaskId, targetColumnTitle) => {
        if (!draggedTask || !sourceColumnTitle || sourceColumnTitle === targetColumnTitle) {
            return;
        }

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: 'kanban_action',
                action: 'move_task',
                payload: {
                    taskId: droppedTaskId,
                    sourceColumn: sourceColumnTitle,
                    targetColumn: targetColumnTitle,
                    user: currentUser
                }
            }));
        }

        setDraggedTask(null);
        setSourceColumnTitle(null);
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex overflow-x-auto p-6 flex-grow">
                {Object.entries(columns).map(([columnTitle, tasks]) => (
                    <KanbanColumn
                        key={columnTitle}
                        title={columnTitle}
                        tasks={tasks}
                        onAddTask={handleOpenAddTaskModal}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
            </div>

            <ModalNewTask
                isOpen={isModalOpen}
                onClose={handleCloseAddTaskModal}
                onSubmit={handleSubmitNewTask}
            />

            <div className="p-6">
                <TeamChat
                    currentUser={currentUser}
                    ws={ws.current}
                    messages={chatMessages}
                />
            </div>
        </div>
    );
};

export default KanbanBoard;