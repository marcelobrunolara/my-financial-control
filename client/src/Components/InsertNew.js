import React from "react";

export default function InsertNew({value, clicked}) {

  const handleClick = (_)=>{
      clicked(!value);
  }

  return (
    <div>
      <br />
      <button onClick={handleClick}>+ insert new transaction</button>
      <br />
      <br />
    </div>
  );
}
