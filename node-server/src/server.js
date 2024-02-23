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
const { rappelleRendezVous } = require('./services/RendezVousService');
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../uploads')));

connectDB();

app.use('/api', routes);

// cron.schedule('0 * * * *', () => {
//   console.log('Tâche exécutée toutes les heures !');
// });
var server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = initializeSocket(server);

app.set('socketio', io);
// cron.schedule('*/2 * * * *', () => {
//   console.log('rappel 2')
//   // io.emit('rappel', 'Rappel de rendez-vous dans 2 minutes !');
// });

// cron.schedule('*/1 * * * *', () => {
//   console.log('rappel 1')
//   rappelleRendezVous();
  
//   io.emit('notification', { message: 'Ceci est un test de socket.io depuis une route.'})
//   // io.emit('rappel', 'Rappel de rendez-vous dans 2 minutes !');
// });
cron.schedule('0 8 * * *', async() => {
  await rappelleRendezVous();
  
  io.emit('notification', { message: 'Ceci est un test de socket.io depuis une route.'})
});