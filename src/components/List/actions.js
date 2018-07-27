import debounce from "lodash.debounce";
import * as consts from "./consts";
import { isKeyValueObject } from "../../utils";

export const highlight = highlightIdx => ({
  type: consts.HIGHLIGHT,
  highlightIdx
});

export const moveUp = () => (dispatch, getState) => {
  const state = getState();
  const { items, highlightIdx } = state.list;
  const count = items.length;
  let newIndex = highlightIdx;
  for (let i = 0; i < count; i++) {
    newIndex--;
    newIndex = newIndex >= 0 ? newIndex : count - 1;
    if (isKeyValueObject(items[newIndex])) break;

    if (i === count - 1) newIndex = highlightIdx;
  }
  dispatch(highlight(newIndex));
};

export const moveDown = () => (dispatch, getState) => {
  const state = getState();
  const { items, highlightIdx } = state.list;
  const count = items.length;
  let newIndex = highlightIdx;
  for (let i = 0; i < count; i++) {
    newIndex++;
    newIndex = newIndex < count ? newIndex : 0;
    if (isKeyValueObject(items[newIndex])) break;

    if (i === count - 1) newIndex = highlightIdx;
  }
  dispatch(highlight(newIndex));
};

export const valueChange = value => (dispatch, getState) => {
  dispatch({ type: consts.VALUE_CHANGED, value });
  const state = getState();
  const { onChange } = state.list;
  if (onChange) onChange(value);
};

export const select = (success, fail) => (dispatch, getState) => {
  const state = getState();
  const { items, highlightIdx, loading, error } = state.list;

  if (loading) return;

  if (error) dispatch(loadItems(dispatch, getState));
  else if (!items.length) {
    if (fail) fail();
    return;
  } else {
    const newValue = items[highlightIdx];
    valueChange(newValue)(dispatch, getState);
    if (success) success();
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
  const { query, getItems } = state.list;
  dispatch({ type: consts.LOAD_ITEMS_REQUEST });
  debouncedLoadItems(dispatch, query, getItems);
};
