import React from 'react';
import PropTypes from 'prop-types';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ transactions }) => (
  <table className={styles.transaction__history}>
    <thead>
      <tr>
        <th>Transaction</th>
        <th>Amount</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {transactions.map(el => (
        <tr key={el.id}>
          <td>{el.type}</td>
          <td>{Number(el.amount).toFixed(2)}$</td>
          <td>{el.date}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

TransactionHistory.propTypes = {
  transactions: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default TransactionHistory;
