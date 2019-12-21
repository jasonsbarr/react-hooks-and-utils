import { makeReducer } from "@jasonsbarr/reducer-utils";

export const setInitial = "SET_INITIAL";
export const setPending = "SET_PENDING";
export const setError = "SET_ERROR";
export const setSuccess = "SET_SUCCESS";
export const setRequesting = "SET_REQUESTING";
export const setConfig = "SET_CONFIG";

const SET_INITIAL = (state, { payload: initial = {} }) => ({
  ...state,
  initial,
});

const SET_PENDING = (state, { payload: pending = {} }) => ({
  initial: null,
  pending,
});

const SET_ERROR = (
  state,
  { payload: error = { message: "An error occurred" } },
) => ({
  ...state,
  pending: null,
  error,
});

const SET_SUCCESS = (state, { payload: success }) => ({
  initial: null,
  pending: null,
  error: null,
  success,
});

const SET_REQUESTING = (state, { payload: requesting = false }) => ({
  ...state,
  requesting,
});

const SET_CONFIG = (state, { payload: newConfig = {} }) => {
  return {
    ...state,
    axiosConfig: { ...state.axiosConfig, ...newConfig },
  };
};

export default makeReducer(
  {
    SET_INITIAL,
    SET_PENDING,
    SET_ERROR,
    SET_SUCCESS,
    SET_REQUESTING,
    SET_CONFIG,
  },
  {
    initial: {},
    pending: {},
    error: null,
    success: {},
    requesting: false,
    axiosConfig: {},
  },
);
