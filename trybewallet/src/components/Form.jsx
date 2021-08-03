import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputText from './InputText';
import SelectField from './SelectField';
import Table from './Table';
import { addExpense, getCurrenciesThunk, editOn, editExpense } from '../actions';

const optionPayment = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const optionTag = ['Alimentação', 'Lazer', 'Saúde', 'Trabalho', 'Transporte'];

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '0',
      description: '',
      currency: 'USD',
      method: optionPayment[0],
      tag: optionTag[0],
    };
    this.handleChange = this.handleChange.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.populatingFormToEdit = this.populatingFormToEdit.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState() {
    this.setState({
      value: '0',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  addExpense() {
    const { addExpenseAction, getCurrenciesRequest } = this.props;
    getCurrenciesRequest();
    addExpenseAction(this.state);
    this.resetState();
  }

  editExpense() {
    const { editExpenseAction } = this.props;
    editExpenseAction(this.state);
    this.resetState();
  }

  handleChange({ target: { value, name } }) {
    this.setState({
      [name]: value,
    });
  }

  populatingFormToEdit(expense) {
    const { enableToEdit } = this.props;
    enableToEdit();
    this.setState(expense);
  }

  renderInput(value, name, nameState, type) {
    return (
      <InputText
        value={ value }
        name={ name }
        nameState={ nameState }
        type={ type }
        handleChange={ this.handleChange }
      />
    );
  }

  renderSelect(value, name, nameState, options) {
    return (
      <SelectField
        value={ value }
        name={ name }
        nameState={ nameState }
        handleChange={ this.handleChange }
        options={ options }
      />
    );
  }

  renderForm() {
    const { value, description, method, tag, currency } = this.state;
    const { currencies, isEditing } = this.props;
    const currenciesKeys = Object.keys(currencies);
    const currenciesFiltered = currenciesKeys.filter((coin) => coin !== 'USDT');
    return (
      <>
        <form className="form-wallet">
          {this.renderInput(value, 'Valor', 'value', 'number')}
          {this.renderInput(description, 'Descrição', 'description', 'text')}
          {this.renderSelect(currency, 'Moeda', 'currency', currenciesFiltered)}
          {this.renderSelect(method, 'Método de pagamento', 'method', optionPayment)}
          {this.renderSelect(tag, 'Tag', 'tag', optionTag)}
          {isEditing
            ? (
              <button
                className="form-wallet-button-edit-expense"
                type="button"
                onClick={ this.editExpense }
              >
                Editar despesa
              </button>
            )
            : (
              <button
                className="form-wallet-button-add-expense"
                type="button"
                onClick={ this.addExpense }
              >
                Adicionar despesa
              </button>
            )}
        </form>
        <Table clickToEdit={ this.populatingFormToEdit } />
      </>
    );
  }

  render() {
    return (
      this.renderForm()
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isEditing: state.wallet.isEditing,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrenciesRequest: () => dispatch(getCurrenciesThunk()),
  addExpenseAction: (payload) => dispatch(addExpense(payload)),
  enableToEdit: () => dispatch(editOn()),
  editExpenseAction: (payload) => dispatch(editExpense(payload)),
});

Form.propTypes = {
  enableToEdit: PropTypes.func.isRequired,
  editExpenseAction: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  getCurrenciesRequest: PropTypes.func.isRequired,
  addExpenseAction: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    code: PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
