import transactionServices from '../Services/transactionServices';

function dateTwoDiggits(n) {
  return n < 10 ? "0" + n : "" + n;
}

function convertToDate(n) {
  var parts = n.split("-");
  return new Date(parts[0], parts[1] - 1, parts[2]);
}

const save = async (model) => {
  const { isNew, category, description, isIncome, value, date, id } = model;

  if (!isNew) {
    const formattedDate = convertToDate(date);
    const transaction = {
      description,
      category,
      type: isIncome ? "+" : "-",
      value,
      year: formattedDate.getFullYear(),
      month: formattedDate.getMonth() + 1,
      day: formattedDate.getDate(),
      yearMonth: `${formattedDate.getFullYear()}-${dateTwoDiggits(
        formattedDate.getMonth() + 1
      )}`,
      yearMonthDay: date,
      id
    };
    console.log("updating");
    console.log(transaction);
      await transactionServices.updateTransaction(
        transaction
      );
  } else {
    const formattedDate = convertToDate(date);
    const transaction = {
      description,
      category,
      type: isIncome ? "+" : "-",
      value,
      year: formattedDate.getFullYear(),
      month: formattedDate.getMonth() + 1,
      day: formattedDate.getDate(),
      yearMonth: `${formattedDate.getFullYear()}-${dateTwoDiggits(
        formattedDate.getMonth() + 1
      )}`,
      yearMonthDay: date,
    };
      return await transactionServices.createTransaction(transaction);
  }
};

const fetchPeriods = async () => {
  let response = await transactionServices.getAllDistinctPeriods();
  let body = await response.data;
  return body;
};

const fetchTransactions = async (value) => {
  let response = await transactionServices.getTransactionsByPeriod(value);
  let body = await response.data;
  return body;
};

const deleteTransaction = async (id) => {
    console.log("deleted " + id);
    let response = await transactionServices.deleteTransaction(id);
    return await response.data;
}

export { save, fetchPeriods, fetchTransactions, deleteTransaction };
