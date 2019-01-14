import { BusinessFetchData, Business } from "../types/Business";
import {
  AppActions,
  FETCH_BUS_BEGIN,
  FETCH_BUS_FAIL,
  FETCH_BUS_SUCCSESS,
  ADD_HISTORY
} from "../actions";
import { combineReducers } from "redux";
import { organizeByDistance } from "../util/locations";

interface HomeState {
  restaurantPayload: BusinessFetchData;
  errorMessage: string;
  loading: boolean;
}

interface HistoryState {
  historic: [Business];
  loading: boolean;
}

interface IState {
  home: HomeState;
  history: HistoryState;
}

export interface AppState {
  mainReducer: IState;
}

const initialState: IState = {
  home: {
    loading: true,
    errorMessage: "",
    restaurantPayload: []
  },
  history: {
    historic: []
  }
};

export const MainReducer = (
  state: IState = initialState,
  action: AppActions
) => {
  switch (action.type) {
    case FETCH_BUS_BEGIN:
      return {
        ...state,
        home: {
          ...state.home,
          loading: true
        }
      };
    case FETCH_BUS_FAIL:
      return {
        ...state,
        home: {
          ...state.home,
          loading: true,
          errorMessage: action.payload
        }
      };
    case FETCH_BUS_SUCCSESS:
      return {
        ...state,
        home: {
          ...state.home,
          loading: false,
          restaurantPayload: organizeByDistance(action.payload)
        }
      };
    case ADD_HISTORY:
      return {
        ...state,
        history: {
          historic: [...state.history.historic, action.payload]
        }
      };
    default:
      return state;
  }
};

export const Reducers = combineReducers<AppState>({
  mainReducer: MainReducer
});
