import { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { matchAsyncState as render } from "../utils";
import reducer, { setPending, setSuccess, setError } from "./reducer";

export const useHttpRequest = (
  url,
  { initialState = {}, pendingState = {}, config = {} } = {},
) => {
  const [{ initial, pending, error, success }, dispatch] = useReducer(
    reducer,
    {
      initial: initialState,
      pending: null,
      error: null,
      success: null,
    },
  );

  const [requesting, setRequesting] = useState(false);

  const handleRequest = () => setRequesting(true);

  useEffect(() => {
    const makeRequest = async () => {
      dispatch({ type: setPending, payload: pendingState });
      return await Axios({ url, ...config });
    };

    if (requesting) {
      makeRequest()
        .then(({ data }) => {
          dispatch({ type: setSuccess, payload: data });
        })
        .catch(error => {
          dispatch({ type: setError, payload: error });
        })
        .finally(() => setRequesting(false));
    }
  }, [requesting]); // eslint-disable-line

  return [
    render({ initial, pending, error, success }),
    handleRequest,
  ];
};
