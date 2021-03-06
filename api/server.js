const cors = require('cors')
const express = require('express');
const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const cansRouter = require('../cans/cans-router.js');
const errorHandler = require('../utils/error-handler.js');

const server = express();
server.use(cors())
server.use(express.json());
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/cans', cansRouter);



server.get('/', (req, res) => {
    res.json({api: "running"})
})

server.use(errorHandler);
module.exports = server;