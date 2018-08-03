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
      if (items.length > 0) items[0].isSelected = true;
      return {
        ...state,
        isLoading: false,
        items,
        infoText
      };

    case consts.LOAD_ITEMS_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true
      };

    case consts.HANDLE_INPUT_CHANGE:
      return {
        ...state,
        query,
        text: query
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

    // case consts.QUERY_CHANGED:
    //   return {
    //     ...state,
    //     query
    //   };

    // case consts.VALUE_CHANGED:
    //   return {
    //     ...state,
    //     value
    //   };

    // case consts.SELECT:
    //   return {
    //     ...state,
    //     value: state.items[state.highlightIdx]
    //   };

    // case consts.QUERY_CHANGED:
    //   return {
    //     ...state,
    //     showPopover: true,
    //     error: false,
    //     query
    //   };

    // case consts.VALUE_CHANGED:
    //   return {
    //     ...state,
    //     value,
    //     query: value ? value.value : "",
    //     showPopover: false
    //   };

    // case consts.CLOSE_POPOVER:
    //   return {
    //     ...state,
    //     showPopover: false
    //   };

    // case consts.ERROR:
    //   return {
    //     ...state,
    //     error: true
    //   };

    default:
      return state;
  }
};
