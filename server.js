// server.js
// ==============================

// imports
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const data = require('./data')
const PORT = 4000

console.log(data)

const app = express();

// apply middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// routes
app.use('/see', require('./routes/seeRouter'))

// PORT/listen
app.listen(PORT, ()=>console.log(`listening on port ${PORT}`))
