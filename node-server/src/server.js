// src/app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/database');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;
const cron = require('node-cron');
const socket = require('socket.io');
const { initializeSocket } = require('./utils/socketConfig');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../uploads')));

connectDB();

app.use('/api', routes);

cron.schedule('0 * * * *', () => {
  console.log('Tâche exécutée toutes les heures !');
});

var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = initializeSocket(server);

app.set('socketio', io);