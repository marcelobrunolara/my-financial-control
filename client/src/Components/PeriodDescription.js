import React from 'react'

function calculate(transactions){

    const length = transactions.length;
     
    const expenses = transactions.filter(c=>c.type === "-").reduce((acc, curr)=>{
         return acc + curr.value;
    },0);
    const income = transactions.filter(c=>c.type === "+").reduce((acc, curr)=>{
         return acc + curr.value;
    },0);
    const balance = income - expenses;

    return {length, expenses, income, balance};
}

export default function PeriodDescription({transactions}) {
    const {length, expenses, income, balance} = calculate(transactions);

    return (
        <div>
            <label>Transactions: {length}</label><br/>
            <label>Expenses:R$ {expenses.toFixed(2)}</label><br/>
            <label>Income:R$ {income.toFixed(2)}</label><br/>
            <label>Balance:R$ {balance.toFixed(2)}</label><br/>
        </div>
    )
}
