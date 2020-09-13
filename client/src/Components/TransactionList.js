import React from "react";
import Transaction from "./Transaction";

export default function TransactionList({
  transactions,
  deleteMode,
  editMode,
  currentTransaction
}) {
  return (
    <div>
      {transactions
        .sort((a, b) => {
          return a.day - b.day;
        })
        .map((transaction) => {
          return (
            <span key={transaction._id}>
              <br />
              <Transaction
                transaction={transaction}
                deleteMode={deleteMode}
                editMode={editMode}
                selectedTransaction={currentTransaction}
              />
            </span>
          );
        })}
    </div>
  );
}
