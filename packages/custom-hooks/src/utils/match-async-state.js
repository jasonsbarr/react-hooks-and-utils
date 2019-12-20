import { getNull } from "./";

export const matchAsyncState = state => match =>
  state.initial
    ? match.initial()
    : state.pending
    ? match.pending()
    : state.error
    ? match.error(state.error)
    : state.success
    ? match.success(state.success)
    : getNull();
