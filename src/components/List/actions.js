import debounce from "lodash.debounce";
import * as consts from "./consts";

export const moveUp = () => ({ type: consts.MOVE_UP });
export const moveDown = () => ({ type: consts.MOVE_DOWN });
export const highlight = highlightIdx => ({
  type: consts.HIGHLIGHT,
  highlightIdx
});
export const valueChange = value => ({ type: consts.VALUE_CHANGED, value });

const debouncedLoadItems = debounce((dispatch, query, getItems) => {
  getItems(query)
    .then(items => {
      dispatch({
        type: consts.LOAD_ITEMS_SUCCESS,
        items
      });
    })
    .catch(error => dispatch({ type: consts.LOAD_ITEMS_FAIL, error }));
}, 300);

export const updateQuery = query => (dispatch, getState) => {
  dispatch({ type: consts.QUERY_CHANGED, query });
  loadItems()(dispatch, getState);
};

export const loadItems = () => (dispatch, getState) => {
  const state = getState();
  const { query, getItems } = state.listReducer;
  dispatch({ type: consts.LOAD_ITEMS_REQUEST });
  debouncedLoadItems(dispatch, query, getItems);
};
