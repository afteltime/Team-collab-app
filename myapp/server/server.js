require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;


const initializeWebSocketServer = require('./services/websocketServer');


app.use(express.json());
app.use(cors());


const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const teamsRoutes = require('./routes/teamRoutes');
app.use('/api/team', teamsRoutes);


const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`HTTP Server (API) available at http://localhost:${PORT}`);
});



const wss = initializeWebSocketServer(server);



console.log(`WebSocket server integrated and running on port ${PORT}`);