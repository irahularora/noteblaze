const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const port = 5000;

// Available routs
app.use(cors());

app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongo();
