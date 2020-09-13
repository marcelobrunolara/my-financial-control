import React from "react";
import { deleteTransaction } from "../Helpers/backendServices";

export default function Transaction({
  transaction,
  deleteMode,
  editMode,
  selectedTransaction,
}) {
  const labelStyle = {
    color: transaction.type === "-" ? "LightCoral" : "DarkSeaGreen",
    fontWeight: "bold",
  };

  const divStyle = {
    borderStyle: "solid",
    borderWidth: "1px",
    borderColor: "black",
    padding: "10px",
  };

  const { day, category, description, value } = transaction;

  const handleEdit = async () => {
    editMode(true);
    selectedTransaction(transaction);
  };

  const handleDelete = async () => {
    console.log(transaction._id);
    await deleteTransaction(transaction._id);
    deleteMode(true);
  };

  return (
    <div style={divStyle}>
      <label style={labelStyle}>Dia: {day} </label>
      <div>
        <label>Cat.: {category} </label>
        <label>Desc.: {description} </label>
      </div>
      <div>
        <label>R$.: {Number(value).toFixed(2)} </label>
      </div>
      <br />
      <div>
        <button onClick={handleEdit}>Edit</button>
        <span> </span>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
}
