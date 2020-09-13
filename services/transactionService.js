const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require("../models/TransactionModel");

const getTransactions = async (req, res) => {
  const { period } = req.query;

  if((!period)) return res.status(404).send("Parameter 'period' on format yyyy-mm is required.");

  try {
    const transactions = await TransactionModel.find({
      yearMonth: period,
    });

    if (!transactions) return res.status(404).send("Periodo not found.");

    return res.status(200).send(transactions);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const getPeriods = async (req, res) => {
  try {
    const transactions = await TransactionModel.find();

    if (!transactions) return res.status(404).send("Transactions not found");

    var yearMonths = transactions.map(c=>c.yearMonth);

    const periods = [...new Set(yearMonths)]

    return res.status(200).send(periods);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const insertTransactions = async (req, res) => {
  
  const transaction = req.body;

  try {
    const newTransaction = await TransactionModel.create({
      transaction
    },
    {
      new: true,
      runValidators: true,
    });


    return res.status(200).send(newTransaction);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const insertTransaction = async (req, res) => {
  
  const newTransaction = new TransactionModel(req.body);

  try {
    await newTransaction.save();
    return res.status(200).send(newTransaction);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const updateTransaction = async (req, res) => {
  
  const transaction = req.body;

  try {
    console.log(transaction);
    const newTransaction = await TransactionModel.findOneAndUpdate(
      { _id: transaction.id },
      transaction,
    {
      new: true,
      runValidators: true,
    });

    return res.status(200).send(newTransaction);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

const deleteTransaction = async (req, res) => {

  try {
    const id = req.params.id;
    const deleted = await TransactionModel.findByIdAndDelete(id);

    return res.status(200).send(deleted);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

module.exports = { getTransactions, insertTransaction, updateTransaction, deleteTransaction, getPeriods };
