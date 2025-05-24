import React from 'react';
import KanbanCard from './KanbanCard';

const KanbanColumn = ({ title, tasks, onAddTask, onDragStart, onDrop }) => {
    const handleDragOver = (e) => {
        e.preventDefault();
    };



    const handleDrop = (e) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('text/plain');
        onDrop(taskId, title);
    };

    return (
        <div
            className="flex-shrink-0 w-80 bg-gray-50 p-4 rounded-lg shadow-md mr-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                {title} ({tasks.length})
            </h3>
            <div className="min-h-[100px]">
                {tasks.map(task => (
                    <KanbanCard
                        key={task.id}
                        task={task}
                        onDragStart={(e) => onDragStart(e, task, title)}
                    />
                ))}
            </div>
            <button
                onClick={() => onAddTask(title)}
                className="mt-4 w-full bg-white text-black py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
                + Добавить задачу
            </button>
        </div>
    );
};

export default KanbanColumn;