const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();


const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
    console.error('Ошибка: JWT_SECRET не определен в .env файле!');
    process.exit(1); // Exit if !JWT
}


exports.register = async (req, res) => {
    const { username, password } = req.body;


    if (!username || !password) {
        return res.status(400).json({ message: 'Пожалуйста, заполните все поля.' }); //for API regs/logins
    }

    try {
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username }
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким именем уже существует.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10); // 10 - сложность хеширования

        // Создание нового пользователя в базе данных
        const newUser = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            },
            select: {
                id: true,
                username: true,
                role: true,
            }
        });

        res.status(201).json({ message: 'Пользователь успешно зарегистрирован!', user: newUser });

    } catch (error) {
        console.error('Ошибка при регистрации:', error);
        res.status(500).json({ message: 'Произошла ошибка при регистрации пользователя.' });
    }
};


exports.login = async (req, res) => {
    const { email: username, password } = req.body;

    // Проверка входных данных
    if (!username || !password) {
        return res.status(400).json({ message: 'Пожалуйста, введите username и пароль.' }); //for API regs/logins
    }

    try {
        const user = await prisma.user.findUnique({
            where: { email: username }
        });

        if (!user) {
            return res.status(401).json({ message: 'Неверный username или пароль.' });
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Неверный username или пароль.' });
        }

        // Если пароль верен, генерируем JWT токен
        const token = jwt.sign(
            { userId: user.id, role: user.role }, // Payload токена (информация о пользователе)
            jwtSecret,                             // Секретный ключ
            { expiresIn: '1h' }                    // Время жизни токена (1 час)
        );


        res.status(200).json({
            message: 'Вход успешно выполнен!',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role,
            }
        });

    } catch (error) {
        console.error('Ошибка при входе:', error);
        res.status(500).json({ message: 'Произошла ошибка при входе пользователя.' });
    }
};