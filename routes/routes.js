const express = require('express');
const transactionRouter = express.Router();
const services = require('../services/transactionService');

transactionRouter.get("/", services.getTransactions);

module.exports = transactionRouter;
