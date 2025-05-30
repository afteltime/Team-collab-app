import React, { useState } from 'react';
import AppointmentModal from './Modal';

const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function Calendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    const endOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayIndex = (startOfMonth.getDay() + 6) % 7; // Пн = 0
    const daysInMonth = endOfMonth.getDate();

    const prevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    };

    const nextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    };

    const isPastDay = (date) => date < today;

    const handleDayClick = (day) => {
        const selected = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
        if (!isPastDay(selected)) {
            setSelectedDate(selected);
        }
    };

    const renderDays = () => {
        const days = [];

        for (let i = 0; i < firstDayIndex; i++) {
            days.push(<div key={`empty-${i}`} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const current = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
            const isToday = current.toDateString() === today.toDateString();
            const isSelected = selectedDate && current.toDateString() === selectedDate.toDateString();
            const isPast = isPastDay(current);

            days.push(
                <div
                    key={day}
                    onClick={() => !isPast && handleDayClick(day)}
                    className={`aspect-square flex items-center justify-center rounded-lg transition-all text-lg font-medium border border-gray-600
                        ${isPast ? 'text-gray-500 bg-gray-700 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-500 hover:text-white'}
                        ${isToday && !isSelected ? 'border border-blue-400' : ''}
                        ${isSelected ? 'bg-blue-600 text-white' : ''}
                    `}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className=" mx-auto p-6 bg-gray-900 rounded shadow text-white min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <button onClick={prevMonth} className="text-2xl px-4 hover:text-blue-400 transition">&#8592;</button>
                <h2 className="text-2xl font-bold">
                    {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
                </h2>
                <button onClick={nextMonth} className="text-2xl px-4 hover:text-blue-400 transition">&#8594;</button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold">
                {daysOfWeek.map((day, i) => (
                    <div key={i} className="uppercase tracking-wide">{day}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
                {renderDays()}
            </div>

            {selectedDate && (
                <AppointmentModal
                    selectedDate={selectedDate}
                    onClose={() => setSelectedDate(null)}
                />
            )}
        </div>
    );
}
