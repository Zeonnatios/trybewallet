import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      coin: 'BRL',
    };
  }

  render() {
    const { email, expenses } = this.props;
    const { coin } = this.state;
    let { total } = this.state;
    if (expenses.length > 0) {
      total = expenses.reduce((acc, { value, currency, exchangeRates }) => {
        const conversionRate = exchangeRates[currency].ask;
        acc += Number(conversionRate) * Number(value);
        return acc;
      }, 0).toFixed(2);
    }

    return (
      <header className="header">
        <h1>TrybeWallet</h1>
        <div className="user-info">
          <div className="user-info-container">
            <p data-testid="email-field">{email}</p>
          </div>
          <div className="user-info-container">
            <p>
              Dispesa Total:
              <span data-testid="total-field">{total}</span>
              <span data-testid="header-currency-field">{coin}</span>
            </p>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(Header);
