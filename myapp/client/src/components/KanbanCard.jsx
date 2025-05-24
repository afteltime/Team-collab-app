import React from 'react';
import Badge from './Badges.jsx';

const KanbanCard = ({ task, onDragStart }) => {
    return (
        <div
            className="bg-white p-4 rounded-md shadow-sm mb-4 border border-gray-200 cursor-grab"
            draggable="true"
            onDragStart={(e) => onDragStart(e, task)}
        >
            <h4 className="font-semibold text-lg text-gray-800 mb-2">{task.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{task.description}</p>
            {task.assignee && (
                <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                    {task.assignee}
                </div>
            )}
            {task.dueDate && (
                <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                    Срок: {task.dueDate}
                </div>
            )}
            {task.priority && (
                <Badge type={task.priority} />
            )}
        </div>
    );
};

export default KanbanCard;