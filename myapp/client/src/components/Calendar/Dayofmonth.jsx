export default function DayOfMonth({ day, onClick }) {
    if (!day) return <div className="h-20 border" />; // Пустая ячейка

    return (
        <button
            onClick={onClick}
            className="h-20 w-full bg-white border rounded hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
            <div className="text-lg text-gray-800 dark:text-white">{day}</div>
        </button>
    );
}
