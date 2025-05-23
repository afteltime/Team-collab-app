require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Добавьте CORS
const bcrypt = require('bcrypt'); // Для хеширования паролей
const jwt = require('jsonwebtoken'); // Для JWT
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json()); // Для парсинга JSON-тел запросов
app.use(cors());         // Для разрешения кросс-доменных запросов



const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);



const teamsRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamsRoutes);
// app.use('/api/teams', teamRoutes);
// app.use('/api/tasks', taskRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});