import { Action } from "redux"
import { ThunkAction } from "redux-thunk"
import { RootState } from "./store"
import { currencyAPI } from "../API/api"

export interface Currency {
  ccy: string
  base_ccy: string
  buy: string
  sale: string
}
export interface CurrencyState {
  data: Currency[]
}

const LOAD_DATA = "currency/load_data"
const LOAD_SUCCEESS = "currency/load_success"
const LOAD_FAILURE = "currency/load_failure"
const CHANGE_DATA = "currency/change_data"
const CHANGE_SUCCESS = "currency/change_success"
const CHANGE_FAILURE = "currency/change_failure"

interface LoadRequestData extends Action<typeof LOAD_DATA> {}
interface LoadSucceessAction extends Action<typeof LOAD_SUCCEESS> {
  payload: { data: Currency[] }
}
interface LoadFailureAction extends Action<typeof LOAD_FAILURE> {
  error: string
}
interface ChangeRequestData extends Action<typeof CHANGE_DATA> {
  payload: { curr: Currency }
}

export const loadCurrencyData = (): ThunkAction<
  void /*Promise<void> or just void */,
  RootState,
  undefined,
  LoadRequestData | LoadSucceessAction | LoadFailureAction
> => async (dispatch) => {
  dispatch({ type: LOAD_DATA })

  //get Data
  try {
    const response = await currencyAPI.getCurrencyData()
    const data = await response

    dispatch({ type: LOAD_SUCCEESS, payload: { data } })
  } catch (e) {
    dispatch({ type: LOAD_FAILURE, error: "Currency load failed!" })
  }
}

export const changeCurrencyData = (curr: Currency) => {
  console.log("AC")

  return { type: CHANGE_DATA, payload: { curr } }
}

export const selectData = (rootState: RootState) => rootState.currency

const initialState: CurrencyState = {
  data: [{ ccy: "USD", base_ccy: "UAH", buy: "27.75000", sale: "28.10000" }],
}

const currencyReducer = (state = initialState, action: LoadSucceessAction | ChangeRequestData) => {
  switch (action.type) {
    case LOAD_SUCCEESS: {
      return action.payload
    }
    case CHANGE_DATA: {
      /* const { curr } = action.payload
      let filteredArray = state.data.filter((currency) => currency.ccy !== curr.ccy)
      const newState = { ...state, data: filteredArray, curr }
      return newState */
      const { curr } = action.payload
      console.log("CHANGE IN REDUCER", curr)
      return { ...state, data: [...state.data.filter((c) => c.ccy !== curr.ccy), curr] }
    }
    default: {
      return state
    }
  }
}

export default currencyReducer