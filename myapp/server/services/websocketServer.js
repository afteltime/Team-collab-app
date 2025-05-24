const WebSocket = require('ws');


// GET FROM DB
let kanbanBoardState = {
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
};

const broadcastKanbanState = (wss) => {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({
                type: 'kanban_update',
                payload: kanbanBoardState
            }));
        }
    });
};

const initializeWebSocketServer = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', ws => {
        console.log('Новое WebSocket соединение установлено!');

        ws.send(JSON.stringify({
            type: 'message',
            user: 'Система',
            text: 'Добро пожаловать в чат команды!',
            timestamp: new Date().toLocaleTimeString()
        }));

        ws.send(JSON.stringify({
            type: 'kanban_update',
            payload: kanbanBoardState
        }));

        ws.on('message', message => {
            try {
                const parsedMessage = JSON.parse(message);
                console.log('Получено сообщение:', parsedMessage);

                if (parsedMessage.type === 'message') {
                    parsedMessage.timestamp = new Date().toLocaleTimeString();
                    wss.clients.forEach(client => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(JSON.stringify(parsedMessage));
                        }
                    });
                } else if (parsedMessage.type === 'kanban_action') {
                    const { action, payload } = parsedMessage;
                    let shouldBroadcast = false;

                    switch (action) {
                        case 'move_task': {
                            const { taskId, sourceColumn, targetColumn } = payload
                            if (kanbanBoardState[sourceColumn] && kanbanBoardState[targetColumn]) {
                                const taskToMove = kanbanBoardState[sourceColumn].find(task => task.id === taskId);
                                if (taskToMove) {
                                    kanbanBoardState[sourceColumn] = kanbanBoardState[sourceColumn].filter(task => task.id !== taskId);
                                    kanbanBoardState[targetColumn] = [...kanbanBoardState[targetColumn], taskToMove];
                                    shouldBroadcast = true;
                                    console.log(`Задача ${taskId} перемещена из ${sourceColumn} в ${targetColumn}`)
                                }
                            }
                            break;
                        }
                        case 'add_task': {
                            const { column, task } = payload;
                            if (kanbanBoardState[column]) {
                                const newTaskId = String(Date.now());
                                const newTask = { id: newTaskId, ...task };
                                kanbanBoardState[column] = [...kanbanBoardState[column], newTask];
                                shouldBroadcast = true;
                                console.log(`Задача "${newTask.title}" добавлена в ${column}`);
                            }
                            break;
                        }
                    }

                    if (shouldBroadcast) {
                        broadcastKanbanState(wss);
                    }

                }
            } catch (error) {
                console.error('Ошибка парсинга или обработки сообщения:', error);
                console.log('Не удалось распарсить или обработать:', message.toString());
            }
        });

        ws.on('close', () => {
            console.log('WebSocket соединение закрыто.');
        });

        ws.on('error', error => {
            console.error('Ошибка WebSocket:', error);
        });
    });

    console.log('WebSocket сервер инициализирован и интегрирован.');
    return wss;
};

module.exports = initializeWebSocketServer;