import * as consts from "./consts";

export const defaultState = {
  error: false,
  inFocus: false,
  loading: false,
  showPopover: false,
  query: null,
  label: "",
  lastQuery: null,
  value: null
};

const reducer = (state = { ...defaultState }, action) => {
  const { type, query, value } = action;

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
        loading: false
      };

    case consts.LOAD_ITEMS_FAIL:
      return {
        ...state,
        loading: false,
        error: true
      };

    case consts.QUERY_CHANGED:
      return {
        ...state,
        query,
        label: query
      };

    case consts.VALUE_CHANGED:
      return {
        ...state,
        value,
        query: "",
        showPopover: false,
        label: value ? value.value : ""
      };

    case consts.FOCUS:
      return {
        ...state,
        inFocus: true,
        showPopover: true
      };

    case consts.BLUR:
      return {
        ...state,
        inFocus: false,
        showPopover: false
      };

    case consts.CLOSE_POPOVER:
      return {
        ...state,
        showPopover: false
      };

    default:
      return state;
  }
};

export default reducer;
