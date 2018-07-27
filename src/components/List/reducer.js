import * as consts from "./consts";

export const defaultState = {
  items: [],
  highlightIdx: 0,
  value: null,
  query: "",
  loading: false,
  error: false
};

const reducer = (state = { ...defaultState }, action) => {
  const { type, items = [], highlightIdx, value, query } = action;

  switch (type) {
    case consts.LOAD_ITEMS_REQUEST:
      return {
        ...state,
        loading: true,
        error: false
      };

    case consts.LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items,
        highlightIdx: 0
      };

    case consts.LOAD_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        highlightIdx: 1
      };

    case consts.MOVE_UP: {
      const nextIdx = state.highlightIdx - 1;
      return {
        ...state,
        highlightIdx: nextIdx < 0 ? state.items.length - 1 : nextIdx
      };
    }

    case consts.MOVE_DOWN: {
      const nextIdx = state.highlightIdx + 1;
      return {
        ...state,
        highlightIdx: nextIdx >= state.items.length ? 0 : nextIdx
      };
    }

    case consts.HIGHLIGHT:
      return {
        ...state,
        highlightIdx
      };

    case consts.QUERY_CHANGED:
      return {
        ...state,
        query
      };

    case consts.VALUE_CHANGED:
      return {
        ...state,
        value
      };

    default:
      return state;
  }
};

export default reducer;
