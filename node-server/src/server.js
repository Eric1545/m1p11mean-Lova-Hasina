// src/app.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./database/database');
const routes = require('./routes');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../uploads')));

connectDB();

app.use('/api', routes);

// app.post('/upload', upload.single('file'),(req, res) => {
//   res.json({ message: 'File uploaded successfully' });
// })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
