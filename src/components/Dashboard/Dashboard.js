import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { ToastContainer, toast } from 'react-toastify';
import Controls from '../Controls/Controls';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import Balance from '../Balance/Balance';

export default class Dashboard extends Component {
  state = {
    transactions: [],
    balance: 0,
    amount: 0,
  };

  addToTransactions = type => {
    const { amount } = this.state;
    const newTransactions = {
      id: uuid(),
      type,
      amount,
      date: new Date().toLocaleString(),
    };
    this.setState(state => ({
      transactions: [...state.transactions, newTransactions],
    }));
  };

  handleDeposit = () => {
    if (this.state.amount !== 0) {
      this.setState(state => ({
        balance: +Number(state.balance + state.amount).toFixed(2),
      }));
      this.addToTransactions('DEPOSIT');
    } else {
      toast.success('Введите сумму для проведения операции!');
    }
    return this.setState({ amount: 0 });
  };

  handleWithdraw = () => {
    if (this.state.balance >= this.state.amount && this.state.balance !== 0) {
      this.setState(state => ({
        balance: +Number(state.balance - state.amount).toFixed(2),
      }));
      this.addToTransactions('WITHDRAW');
    } else {
      toast.error('На счету недостаточно средств для проведения операции!');
    }
    return this.setState({ amount: 0 });
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: +value });
  };

  render() {
    const { balance, transactions, amount } = this.state;
    const income = Number(
      transactions.reduce((acc, items) => {
        return items.type === 'DEPOSIT' ? acc + items.amount : acc;
      }, 0),
    ).toFixed(2);
    const expenses = Number(
      transactions.reduce((acc, items) => {
        return items.type === 'WITHDRAW' ? acc + items.amount : acc;
      }, 0),
    ).toFixed(2);

    return (
      <div>
        <Controls
          amount={amount}
          handleWithdraw={this.handleWithdraw}
          handleDeposit={this.handleDeposit}
          handleChange={this.handleChange}
        />
        <Balance balance={balance} income={income} expenses={expenses} />
        <TransactionHistory transactions={transactions} />
        <ToastContainer />
      </div>
    );
  }
}
