import { useState, useEffect, useReducer } from "react";
import Axios from "axios";
import { matchAsyncState as render } from "../utils";
import reducer, {
  setPending,
  setSuccess,
  setError,
  setRequesting,
  setConfig,
} from "./reducer";

const useHttpRequest = ({
  config = {},
  initialState = {},
  pendingState = {},
} = {}) => {
  const [
    { initial, pending, error, success, requesting, axiosConfig },
    dispatch,
  ] = useReducer(reducer, {
    initial: initialState,
    pending: pendingState,
    error: null,
    success: null,
    requesting: false,
    axiosConfig: config,
  });

  const axios = Axios.create(config);

  const handleRequest = (url, { config = {}, data = null }) => {
    const requestConfig = {
      url,
      ...config,
    };

    if (data) requestConfig.data = data;

    dispatch({ type: setConfig, payload: requestConfig });
    dispatch({ type: setRequesting, payload: true });
  };

  useEffect(() => {
    const makeRequest = async () => {
      dispatch({ type: setPending, payload: pendingState });
      return await axios(axiosConfig);
    };

    if (requesting) {
      makeRequest()
        .then(({ data }) => {
          dispatch({ type: setSuccess, payload: data });
        })
        .catch(error => {
          dispatch({ type: setError, payload: error });
        })
        .finally(() =>
          dispatch({ type: setRequesting, payload: false }),
        );
    }
  }, [requesting]); // eslint-disable-line

  return [
    render({ initial, pending, error, success }),
    handleRequest,
  ];
};

export default useHttpRequest;
