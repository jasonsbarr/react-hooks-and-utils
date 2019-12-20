import { makeReducer } from "@jasonsbarr/reducer-utils";

export const setInitial = "SET_INITIAL";
export const setPending = "SET_PENDING";
export const setError = "SET_ERROR";
export const setSuccess = "SET_SUCCESS";

const SET_INITIAL = (state, { payload = {} }) => ({
  ...state,
  initial: payload,
});

const SET_PENDING = (state, { payload = {} }) => ({
  initial: null,
  pending: payload,
});

const SET_ERROR = (
  state,
  { payload = { message: "An error occurred" } },
) => ({
  ...state,
  pending: null,
  error: payload,
});

const SET_SUCCESS = (state, { payload }) => ({
  initial: null,
  pending: null,
  error: null,
  success: payload,
});

export default makeReducer(
  { SET_INITIAL, SET_PENDING, SET_ERROR, SET_SUCCESS },
  { initial: {}, pending: {}, error: null, success: {} },
);
