import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { save } from "../Helpers/backendServices";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function CrudModal({
  title,
  showModal,
  currentTransaction,
  modalControl
}) {
  /*state*/
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isIncome, setIsIncome] = useState(false);
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState('');
  const [date, setDate] = useState('');

  /*effect*/
  useEffect(() => {
    setIsOpen(showModal);
  }, [showModal]);

  useEffect(() => {
    setIsIncome(currentTransaction?.type==='+');
    setDescription(currentTransaction?.description);
    setDate(currentTransaction?.yearMonthDay);
    setCategory(currentTransaction?.category);
    setValue(currentTransaction?.value);
  }, [currentTransaction]);

  /* Handle changing */
  const handleTypeSelect = () => {
    setIsIncome(!isIncome);
  };
  const handleValueChange = (event) => {
    setValue(event.target.value);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const closeModal = () => {
    setIsOpen(false);
    modalControl(false);
  };

  const handleSaving = async () => {
    const isNew = !currentTransaction._id;

    const model = {
      isNew,
      category,
      description,
      isIncome,
      value,
      date,
    };

    let result = await save(model);
    console.log(result);
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
    >
      <div>
        <h4>{title}</h4>
        <button onClick={closeModal}>close</button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            value="-"
            id="income"
            name="typeTransaction"
            checked={isIncome}
            onChange={handleTypeSelect}
          />
          <span>Income</span>
        </label>
        <label>
          <input
            type="radio"
            value="-"
            name="typeTransaction"
            id="expense"
            checked={!isIncome}
            onChange={handleTypeSelect}
          />
          <span>Expense</span>
        </label>
      </div>
      <div className="input-field col s6">
        <input
          placeholder="Description"
          id="description"
          type="text"
          className="validate"
          value={description}
          onChange={handleDescriptionChange}
        ></input>
        <label htmlFor="description" className="active"></label>
      </div>
      <div className="input-field col s6">
        <input
          placeholder="Category"
          id="catergory"
          type="text"
          required
          className="validate"
          value={category}
          onChange={handleCategoryChange}
        ></input>
        <label htmlFor="category" className="active"></label>
      </div>
      <div className="input-field col s6">
        <input
          placeholder="Value"
          id="value"
          type="number"
          step="0.01"
          required
          className="validate"
          min="0"
          value={value}
          onChange={handleValueChange}
        ></input>
        <input
          placeholder="Date"
          id="date"
          type="date"
          required
          value={date}
          onChange={handleDateChange}
          className="validate"
        ></input>
      </div>
      <input type="button" value="Save" onClick={handleSaving}></input>
    </Modal>
  );
}
