import * as consts from "./consts";
import * as listActions from "../List/actions";

const loadItemsIfNeeded = (dispatch, getItems, query) => {
  dispatch({ type: consts.LOAD_ITEMS_REQUEST });
  getItems(query)
    .then(items => {
      dispatch({
        type: consts.LOAD_ITEMS_SUCCESS,
        items
      });
      dispatch(listActions.gotItems(items));
    })
    .catch(error => dispatch({ type: consts.LOAD_ITEMS_FAIL, error }));
};

export const closePopover = () => ({ type: consts.CLOSE_POPOVER });
export const valueChanged = value => ({ type: consts.VALUE_CHANGED, value });
export const blur = () => ({ type: consts.BLUR });

export const focus = getItems => dispatch => {
  dispatch({ type: consts.FOCUS });
  loadItemsIfNeeded(dispatch, getItems, "");
};

export const updateQuery = (getItems, query) => dispatch => {
  dispatch({ type: consts.QUERY_CHANGED, query });
  loadItemsIfNeeded(dispatch, getItems, query);
};
