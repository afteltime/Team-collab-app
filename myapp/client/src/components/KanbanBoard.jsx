import React, { useState } from 'react';
import KanbanColumn from './KanbanColumn';
import ModalNewTask from './ModalNewTask.jsx';
import TeamChat from './TeamChat.jsx';

const KanbanBoard = () => {
    const [columns, setColumns] = useState({
        'Created': [
            { id: '1', title: 'Создать компонент навигации', description: 'Разработать компонент для верхней панели навигации.', assignee: 'Иван Иванов', dueDate: '2025-05-25', priority: 'High' },
            { id: '2', title: 'Настроить базу данных Prisma', description: 'Завершить схему Prisma и настроить миграции.', assignee: 'Петр Петров', dueDate: '2025-05-28', priority: 'Medium' },
        ],
        'In Progress': [
            { id: '3', title: 'Разработать форму регистрации', description: 'Реализовать UI и логику для формы регистрации.', assignee: 'Иван Иванов', dueDate: '2025-05-26', priority: 'High' },
        ],
        'Review': [
            { id: '4', title: 'Проверить логику аутентификации', description: 'Провести тесты для эндпоинтов входа и регистрации.', assignee: 'Мария Сидорова', dueDate: '2025-05-27', priority: 'Medium' },
        ],
        'Done': [
            { id: '5', title: 'Настроить проект React + Vite', description: 'Базовая настройка фронтенда завершена.', assignee: 'Петр Петров', dueDate: '2025-05-20', priority: 'Low' },
        ],
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedColumn, setSelectedColumn] = useState(null);

    const [draggedTask, setDraggedTask] = useState(null);
    const [sourceColumnTitle, setSourceColumnTitle] = useState(null);


    const currentUser = "ВашеИмяПользователя";


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

        const newTaskId = String(Date.now());
        const newTask = {
            id: newTaskId,
            title: newTaskData.title,
            description: newTaskData.description || 'Нет описания',
            assignee: newTaskData.assignee || 'Не назначен',
            dueDate: newTaskData.dueDate || '',
            priority: newTaskData.priority || 'Low',
        };

        setColumns(prevColumns => ({
            ...prevColumns,
            [selectedColumn]: [...(prevColumns[selectedColumn] || []), newTask]
        }));

        console.log("Добавлена новая задача:", newTask, "в столбец:", selectedColumn);
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

        setColumns(prevColumns => {
            const newColumns = { ...prevColumns };
            const taskToMove = newColumns[sourceColumnTitle].find(task => task.id === droppedTaskId);
            if (!taskToMove) {
                return prevColumns;
            }

            newColumns[sourceColumnTitle] = newColumns[sourceColumnTitle].filter(
                task => task.id !== droppedTaskId
            );
            newColumns[targetColumnTitle] = [...(newColumns[targetColumnTitle] || []), taskToMove];

            return newColumns;
        });

        setDraggedTask(null);
        setSourceColumnTitle(null);

        console.log(`Задача "${draggedTask.title}" (ID: ${droppedTaskId}) перемещена из "${sourceColumnTitle}" в "${targetColumnTitle}"`);
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
                <TeamChat currentUser={currentUser} />
            </div>
        </div>
    );
};

export default KanbanBoard;