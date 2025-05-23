import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
            });

            const data = await response.json();

            if (response.ok){
                alert('success log in');
                //navigate('/main')

                } else {
                setError (data.message || 'something went wrong, please try again.');
                }
        } catch (error) {
            console.error('something wrong',error);
            setError('please  try again later');
        }
    }



    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800">Вход</h2>


                <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="nickname"
                        placeholder="Username"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                {/* Поле Password */}
                <div className="relative">
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                        type="password"
                        placeholder="password"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {/* Чекбокс и ссылка "Забыли пароль?" */}
                <div className="flex justify-between items-center text-sm">
                    <label className="flex items-center text-gray-600">
                        <input type="checkbox" className="mr-2 accent-blue-500" />
                        Запомнить меня
                    </label>
                    <a href="#" className="text-blue-600 hover:underline">
                        Забыли пароль?
                    </a>
                </div>

                <p className="text-red-500 text-center text-sm">{error}</p>

                {/* Кнопка входа */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Войти
                </button>

                {/* Ссылка на регистрацию */}
                <p className="text-center text-gray-600 text-sm">
                    У вас нет аккаунта?{' '}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Зарегистрироваться
                    </a>
                </p>
            </form>
        </div>
    );
}

export default Login;