import * as consts from "./consts";
import { VALUE_CHANGED } from "../List/consts";

export const defaultState = {
  inFocus: false,
  showPopover: false,
  query: "",
  value: null,
  error: false
};

const reducer = (state = { ...defaultState }, action) => {
  const { type, value, isAutocomplete, query } = action;

  switch (type) {
    case consts.QUERY_CHANGED:
      return {
        ...state,
        showPopover: true,
        error: false,
        query
      };

    case VALUE_CHANGED:
      return {
        ...state,
        value,
        query: value ? value.value : "",
        showPopover: false
      };

    case consts.FOCUS:
      return {
        ...state,
        inFocus: true,
        error: false,
        showPopover: !isAutocomplete
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

    case consts.ERROR:
      return {
        ...state,
        error: true
      };

    default:
      return state;
  }
};

export default reducer;
