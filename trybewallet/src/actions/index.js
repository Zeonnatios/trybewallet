export const SET_USER = 'SET_USER';
export const GET_CURRENCY = 'GET_CURRENCY';
export const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS';
export const GET_CURRENCY_FAILED = 'GET_CURRENCY_FAILED';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_ON = 'EDIT_ON';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const getCurrency = () => ({
  type: GET_CURRENCY,
});

export const getCurrencySuccess = (payload) => ({
  type: GET_CURRENCY_SUCCESS,
  payload,
});

export const getCurrencyFailed = (payload) => ({
  type: GET_CURRENCY_FAILED,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  id,
});

export const editOn = () => ({
  type: EDIT_ON,
});

export const editExpense = (payload) => ({
  type: EDIT_EXPENSE,
  payload,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrency());
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const results = await response.json();
    dispatch(getCurrencySuccess(results));
  } catch (error) {
    dispatch(getCurrencySuccess(error));
  }
};
