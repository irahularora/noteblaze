require('dotenv').config();
const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// Available routs
app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(__dirname, '../build')));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongo();
