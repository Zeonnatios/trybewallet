import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrenciesThunk } from '../actions';
import { Header, Form } from '../components';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.getCurrencies = this.getCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
  }

  getCurrencies() {
    const { getCurrenciesRequest } = this.props;
    getCurrenciesRequest();
  }

  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesRequest: () => dispatch(getCurrenciesThunk()),
});

Wallet.propTypes = {
  getCurrenciesRequest: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Wallet);
