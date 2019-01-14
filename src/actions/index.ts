import { BusinessFetchData, Business } from "../types/Business";
import { getBusinesses } from "../services/Business";
import { Dispatch } from "redux";
import axios from "axios";
import { businessesSearchEndpoint, API_KEY } from "../util/constants";
import { AsyncStorage } from "react-native";

interface Action {
  type: string;
}

interface IBusinessesSuccessAction extends Action {
  payload: BusinessFetchData;
}

interface IBusinessesFailAction extends Action {
  payload: string;
}

interface IBusinessesBeginAction extends Action {
  payload: string;
}

//3 action sucesses error api get
export const FETCH_BUS_SUCCSESS = "FETCH_BUS_SUCCSESS";
export const FETCH_BUS_FAIL = "FETCH_BUS_FAIL";
export const FETCH_BUS_BEGIN = "FETCH_BUS_BEGIN";
export const ADD_HISTORY = "ADD_HISTORY";

const fetchBusinessBegin = (): IBusinessesBeginAction => ({
  type: FETCH_BUS_BEGIN,
  payload: "fetching"
});

const fetchBusinessesSuccess = (
  data: BusinessFetchData
): IBusinessesSuccessAction => ({
  type: FETCH_BUS_SUCCSESS,
  payload: data
});

const fetchBusinessesFail = (errorMessage: string): IBusinessesFailAction => ({
  type: FETCH_BUS_FAIL,
  payload: errorMessage
});

export const fetchBusiness = (latitude: number, longitude: number) => (
  dispatch: Dispatch<AppActions>
) => {
  dispatch(fetchBusinessBegin());

  return axios
    .request<BusinessFetchData>({
      url: `${businessesSearchEndpoint}?term=restaurants&latitude=${latitude}&longitude=${longitude}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_KEY}`
      }
    })
    .then(res => dispatch(fetchBusinessesSuccess(res.data)))
    .catch(err => dispatch(fetchBusinessesFail(err)));
};

//Salvar no historico

export const addToHistory = (bussiness: Business) => ({
  type: ADD_HISTORY,
  payload: bussiness
});

export type AppActions =
  | IBusinessesBeginAction
  | IBusinessesFailAction
  | IBusinessesSuccessAction;
