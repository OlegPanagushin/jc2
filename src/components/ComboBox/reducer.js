import * as consts from "./consts";

export const defaultState = {
  inFocus: false,
  showPopover: false,
  query: "",
  value: null
};

const reducer = (state = { ...defaultState }, action) => {
  const { type, value, isAutocomplete, query } = action;

  switch (type) {
    case consts.QUERY_CHANGED:
      return {
        ...state,
        showPopover: true,
        query
      };

    case consts.UPDATE_VALUE:
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

    default:
      return state;
  }
};

export default reducer;
