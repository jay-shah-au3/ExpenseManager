const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { dbConnection } = require('./server/config/dbConnection');
require("dotenv").config();

const verifyToken = require('./server/middlewares/auth.middleware').verifyToken;

const { PORT, DB_URI } = process.env;
dbConnection(DB_URI);
app.use(cors());
app.listen(PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"));
    app.get(/^\/(?!api).*/, (req, res) => {
      res.sendFile(path.join(__dirname, "./client/build/index.html"));
    });    
}


const login = require('./server/routes/auth/login');
const category = require('./server/routes/category');
const income = require('./server/routes/transaction/income');
const expense = require('./server/routes/transaction/expense');
const transaction = require('./server/routes/transaction/transaction');

app.use('/api/oauth',login);
app.use('/api/category', verifyToken, category);
app.use('/api/transaction/income', verifyToken, income);
app.use('/api/transaction/expense', verifyToken, expense);
app.use('/api/transaction/combine', verifyToken, transaction);
