import http from './http-common.js';

const getAllDistinctPeriods = async () => {
  return await http.get('api/transaction/periods');
};

const getTransactionsByPeriod = async (period) => {
  return await http.get(`/api/transaction?period=${period}`);
};

const createTransaction = async (transaction) => {
  console.log("posting");
  console.log(transaction);
  return await http.post(`/api/transaction`, transaction);
};

const updateTransaction = async (transaction) => {
  console.log("updating");
  console.log(transaction);
  return await http.put(`/api/transaction`, transaction);
};

const deleteTransaction = async (id) => {
  return await http.delete(`/api/transaction/${id}`);
};

export default {
  getAllDistinctPeriods,
  getTransactionsByPeriod,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};