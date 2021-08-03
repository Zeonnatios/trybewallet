import {
  GET_CURRENCY,
  GET_CURRENCY_SUCCESS,
  GET_CURRENCY_FAILED,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  EDIT_ON,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  id: 0,
  currencies: {},
  expenses: [],
  isEditing: false,
};

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case GET_CURRENCY:
    return {
      ...state,
    };
  case GET_CURRENCY_SUCCESS:
    return {
      ...state,
      currencies: action.payload,
    };
  case GET_CURRENCY_FAILED:
    return {
      ...state,
      error: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses:
        [...state.expenses, { id: state.id,
          ...action.payload,
          exchangeRates: state.currencies }],
      id: state.id + 1,
    };
  case EDIT_ON:
    return {
      ...state,
      isEditing: true,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.payload.id) {
          return { ...expense, ...action.payload };
        }
        return expense;
      }),
      isEditing: false,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((ex) => ex.id !== action.id),
    };
  default:
    return state;
  }
}

export default walletReducer;
