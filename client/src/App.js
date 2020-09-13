import React, { useState, useEffect } from "react";
import Selector from "./Components/Selector";
import PeriodDescription from "./Components/PeriodDescription";
import TransactionList from "./Components/TransactionList";
import InsertNew from "./Components/InsertNew";
import Modal from "react-modal";
import CrudModal from "./Components/CrudModal";
import { fetchPeriods, fetchTransactions } from "./Helpers/backendServices";

Modal.setAppElement("#root");

export default function App() {
  const divStyle = {
    padding: "20px",
  };

  /*state*/
  const [periods, setPeriods] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);

  const [currentPeriod, setCurrentPeriod] = useState('');
  const [currentTransaction, setCurrentTransaction] = useState();

  /*effects*/
  useEffect(() => {
    getPeriods();
  }, []);

  /*effects*/
  useEffect(() => {
    if(!editMode){
      setCurrentTransaction({});
    }
  }, [editMode]);

  useEffect(() => {
    if (!currentPeriod) return;
    console.log("fetching after deletion " + currentPeriod);
    getTransactions(currentPeriod);
    setDeleteMode(false);
  }, [deleteMode]);

  useEffect(() => {
    if (!currentPeriod) return;
    getTransactions(currentPeriod);
  }, [currentPeriod]);

  /*fetching*/
  async function getPeriods() {
    let body = await fetchPeriods();
    setPeriods(body);
    setCurrentPeriod(body[0]);
  }

  async function getTransactions(value) {
    let response = await fetchTransactions(value);
    setTransactions(response);
  }

  return (
    <div style={divStyle}>
      <Selector
        currentPeriod={currentPeriod}
        periods={periods}
        periodChanged={setCurrentPeriod}
      />
      <InsertNew value={editMode} clicked={setEditMode} />
      <PeriodDescription transactions={transactions} />
      <TransactionList
        transactions={transactions}
        deleteMode={setDeleteMode}
        editMode={setEditMode}
        currentTransaction={setCurrentTransaction}
      />
      <CrudModal
        title="modalzera"
        showModal={editMode}
        modalControl={setEditMode}
        currentTransaction={currentTransaction}
      />
    </div>
  );
}
