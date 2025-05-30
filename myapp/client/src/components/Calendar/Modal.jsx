import React, { useState, useEffect } from 'react';

export default function AppointmentModal({ selectedDate, onClose }) {
    const [formData, setFormData] = useState({
        clientName: '',
        clientEmail: '',
        appointmentDate: '',
        appointmentTime: '',
        service: '',
        notes: ''
    });

    useEffect(() => {
        if (selectedDate) {
            setFormData(prev => ({
                ...prev,
                appointmentDate: selectedDate.toISOString().split('T')[0]
            }));
        }
    }, [selectedDate]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Данные для записи на приём:', formData);

        // Сброс формы
        setFormData({
            clientName: '',
            clientEmail: '',
            appointmentDate: '',
            appointmentTime: '',
            service: '',
            notes: ''
        });

        onClose(); // Закрываем модалку после отправки
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
            role="dialog"
            aria-modal="true"
        >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-white"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                    Запись на {selectedDate.toLocaleDateString('ru-RU')}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="clientName" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Имя
                        </label>
                        <input
                            type="text"
                            id="clientName"
                            value={formData.clientName}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="clientEmail" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Email
                        </label>
                        <input
                            type="email"
                            id="clientEmail"
                            value={formData.clientEmail}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="appointmentTime" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Время
                        </label>
                        <input
                            type="time"
                            id="appointmentTime"
                            value={formData.appointmentTime}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="service" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Услуга
                        </label>
                        <select
                            id="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
                            required
                        >
                            <option value="">Выберите услугу</option>
                            <option value="Консультация">Консультация</option>
                            <option value="Осмотр">Осмотр</option>
                            <option value="Процедура">Процедура</option>
                            <option value="Другое">Другое</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">
                            Комментарии
                        </label>
                        <textarea
                            id="notes"
                            rows="3"
                            value={formData.notes}
                            onChange={handleChange}
                            className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 dark:bg-gray-700 dark:text-white"
                            placeholder="Дополнительная информация..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded"
                    >
                        Записаться
                    </button>
                </form>
            </div>
        </div>
    );
}
