import {
  GET_LIST_WORKER_FAILED,
  GET_LIST_WORKER_PENDING,
  GET_LIST_WORKER_SUCCESS,
} from "../actions/type";

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
  empty: false,
};

const listWorkerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_WORKER_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_WORKER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
        empty: action.payload.data.length === 0,
      };
    case GET_LIST_WORKER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
        empty: false,
      };
    default:
      return state;
  }
};

export default listWorkerReducer;
