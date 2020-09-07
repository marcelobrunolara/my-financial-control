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

module.exports = { getTransactions };
