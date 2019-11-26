import React from 'react';
import PropTypes from 'prop-types';
import style from './Controls.module.css';

const Controls = ({ handleChange, handleWithdraw, handleDeposit, amount }) => (
  <section className={style.controls}>
    <input
      className={style.input__controls}
      type="number"
      name="amount"
      onChange={handleChange}
      placeholder="Enter sumt"
      value={amount === 0 ? '' : amount}
    />
    <button
      className={style.button__deposit}
      onClick={handleDeposit}
      type="button"
    >
      Deposit
    </button>
    <button
      className={style.button__withdraw}
      onClick={handleWithdraw}
      type="button"
    >
      Withdraw
    </button>
  </section>
);

Controls.propTypes = {
  amount: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleWithdraw: PropTypes.func.isRequired,
  handleDeposit: PropTypes.func.isRequired,
};
export default Controls;
