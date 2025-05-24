import React from 'react';

const Badge = ({ type }) => {
    let badgeClasses = "";
    let badgeText = type;


    switch (type) {
        case 'High':
            badgeClasses = "bg-red-100 text-red-800 border border-red-400";
            break;
        case 'Medium':
            badgeClasses = "bg-yellow-100 text-yellow-800 border border-yellow-300";
            break;
        case 'Low':
            badgeClasses = "bg-green-100 text-green-800 border border-green-400";
            break;
        // Можно добавить другие типы, например, для статусов
        case 'Backlog':
            badgeClasses = "bg-blue-100 text-blue-800 border border-blue-400";
            break;
        case 'In Progress':
            badgeClasses = "bg-purple-100 text-purple-800 border border-purple-400";
            break;
        case 'Review':
            badgeClasses = "bg-indigo-100 text-indigo-800 border border-indigo-400";
            break;
        case 'Done':
            badgeClasses = "bg-gray-100 text-gray-800 border border-gray-400";
            break;
        default:
            badgeClasses = "bg-gray-100 text-gray-800 border border-gray-400";
            badgeText = type || "Неизвестно";
    }

    const commonClasses = "inline-block px-2.5 py-0.5 rounded-sm text-xs font-medium me-2";

    return (
        <span className={`${commonClasses} ${badgeClasses}`}>
      {badgeText}
    </span>
    );
};

export default Badge;