const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Ожидаем формат "Bearer TOKEN"

    if (!token) {
        return res.status(401).json({ message: 'Доступ запрещен: токен не предоставлен.' });
    }

    try {
        // Верифицируем токен
        const decoded = jwt.verify(token, jwtSecret);


        req.user = decoded; // req.user будет содержать { userId: ..., role: ... }
        next();

    } catch (error) {
        console.error('Ошибка верификации токена:', error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Токен истек.' });
        }
        return res.status(403).json({ message: 'Доступ запрещен: недействительный токен.' });
    }
};


exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Доступ запрещен: недостаточно прав.' });
    }
};