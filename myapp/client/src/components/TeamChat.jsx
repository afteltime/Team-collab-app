import React, { useState, useEffect, useRef } from 'react'

const TeamChat = ({ currentUser, ws, messages }) => {
    const [inputValue, setInputValue] = useState('')

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (inputValue.trim() && ws && ws.readyState === WebSocket.OPEN) {
            const message = {
                type: 'message',
                user: currentUser || 'Аноним',
                text: inputValue.trim(),
            };
            ws.send(JSON.stringify(message))
            setInputValue('')
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-lg mt-6 w-full max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Командный чат
            </h3>
            <div className="chat-messages h-64 overflow-y-auto border border-gray-200 p-3 rounded-md mb-4 bg-gray-50">
                {messages.map((msg, index) => (
                    <div key={index} className="mb-2 text-sm">
                        <span className="font-semibold text-blue-700">{msg.user}</span>
                        <span className="text-gray-500 ml-2 text-xs">[{msg.timestamp}]</span>:
                        <p className="text-gray-800 break-words ml-4">{msg.text}</p>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="flex">
                <input
                    type="text"
                    className="flex-grow shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Напишите сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default TeamChat;