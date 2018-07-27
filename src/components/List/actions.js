import debounce from "lodash.debounce";
import * as consts from "./consts";

export const moveUp = () => ({ type: consts.MOVE_UP });
export const moveDown = () => ({ type: consts.MOVE_DOWN });

export const highlight = highlightIdx => ({
  type: consts.HIGHLIGHT,
  highlightIdx
});

export const valueChange = value => ({ type: consts.VALUE_CHANGED, value });

export const select = () => (dispatch, getState) => {
  const state = getState();
  const { items, highlightIdx, loading, error } = state.listReducer;
  if (loading) return;
  if (error) dispatch(loadItems(dispatch, getState));
  else if (!items.length) return;
  else {
    const newValue = items[highlightIdx];
    dispatch(valueChange(newValue));
  }
};

export const updateQuery = query => (dispatch, getState) => {
  dispatch({ type: consts.QUERY_CHANGED, query });
  loadItems()(dispatch, getState);
};

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

export const loadItems = () => (dispatch, getState) => {
  const state = getState();
  const { query, getItems } = state.listReducer;
  dispatch({ type: consts.LOAD_ITEMS_REQUEST });
  debouncedLoadItems(dispatch, query, getItems);
};
