const express = require('express');
const transactionRouter = express.Router();
const services = require('../services/transactionService');

transactionRouter.get("/", services.getTransactions);
transactionRouter.delete("/:id",services.deleteTransaction)
transactionRouter.put("/",services.updateTransaction)
transactionRouter.post("/",services.insertTransaction)

transactionRouter.get("/periods",services.getPeriods)

module.exports = transactionRouter;
