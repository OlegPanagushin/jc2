import * as consts from "./consts";

const defaultState = {
  query: "",
  text: "",
  infoText: "",
  items: [],
  popularItems: [],
  item: null,
  itemInFocus: null,
  isInFocus: false,
  isPopoverShown: false,
  isLoading: false,
  isError: false,
  isValidationError: false
};

export default (state = { ...defaultState }, action) => {
  const { type, item, isAutocomplete, query, items, infoText } = action;

  //console.log(type, action);

  switch (type) {
    case consts.HANDLE_FOCUS:
      return {
        ...state,
        isInFocus: true,
        isValidationError: false,
        isLoading: !isAutocomplete,
        isPopoverShown: !isAutocomplete
      };

    case consts.HANDLE_BLUR:
      return {
        ...state,
        isInFocus: false,
        isPopoverShown: false
      };

    case consts.LOAD_ITEMS_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false
      };

    case consts.LOAD_ITEMS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        items,
        infoText
      };

    case consts.LOAD_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
        items
      };

    case consts.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        query,
        text: query,
        isLoading: true,
        isPopoverShown: true
      };

    case consts.SELECT_ITEM:
      return {
        ...state,
        item,
        query: "",
        text: item.value,
        isPopoverShown: false
      };

    case consts.UPDATE_ITEMS:
      return {
        ...state,
        items
      };

    case consts.VALIDATION_ERROR:
      return {
        ...state,
        isValidationError: true,
        item: null
      };

    default:
      return state;
  }
};
