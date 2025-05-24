const WebSocket = require('ws');


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

        ws.on('message', message => {
            try {
                const parsedMessage = JSON.parse(message);
                console.log('Получено сообщение:', parsedMessage);

                parsedMessage.timestamp = new Date().toLocaleTimeString();

                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(parsedMessage));
                    }
                });
            } catch (error) {
                console.error('Ошибка парсинга сообщения:', error);
                console.log('Не удалось распарсить сообщение:', message.toString());
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