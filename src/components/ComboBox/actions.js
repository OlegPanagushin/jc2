import debounce from "lodash.debounce";
import * as consts from "./consts";

const debouncedLoadItems = debounce((dispatch, getState, loadItems) => {
  const state = getState();
  const { query } = state;
  loadItems(query)
    .then(({ items, totalCount }) => {
      const fountCount = items.length;
      dispatch({
        type: consts.LOAD_ITEMS_SUCCESS,
        items,
        infoText:
          fountCount === totalCount
            ? ""
            : `Показано ${fountCount} из ${totalCount} найденных городов.`
      });
    })
    .catch(error => dispatch({ type: consts.LOAD_ITEMS_FAIL, error }));
}, 300);

export const handleFocus = (isAutocomplete, loadItems) => (
  dispatch,
  getState
) => {
  dispatch({
    type: consts.HANDLE_FOCUS,
    isAutocomplete
  });

  debouncedLoadItems(dispatch, getState, loadItems);
};

export const handleBlur = () => ({ type: consts.HANDLE_BLUR });

export const handleInputChange = (query, loadItems) => (dispatch, getState) => {
  dispatch({
    type: consts.HANDLE_INPUT_CHANGE,
    query
  });
  debouncedLoadItems(dispatch, getState, loadItems);
};

export const selectItem = item => ({
  type: consts.SELECT_ITEM,
  item
});

const highlightItem = (
  allItems,
  key = null,
  up = false,
  scrollIfNeeded = false
) => {
  const currentItemIdx = allItems.findIndex(item => item.isSelected === true),
    maxIdx = allItems.length - 1;

  let newItemIdx = currentItemIdx;
  if (key !== null) newItemIdx = allItems.findIndex(item => item.key === key);
  else {
    if (up) newItemIdx = currentItemIdx === 0 ? maxIdx : currentItemIdx - 1;
    else newItemIdx = currentItemIdx === maxIdx ? 0 : currentItemIdx + 1;
  }
  allItems[currentItemIdx].isSelected = false;
  allItems[currentItemIdx].scrollIfNeeded = false;
  allItems[newItemIdx].isSelected = true;
  allItems[newItemIdx].scrollIfNeeded = scrollIfNeeded;
  return allItems;
};

export const activateItem = item => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: consts.UPDATE_ITEMS,
    items: highlightItem([...state.items], item.key)
  });
};

export const moveUp = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: consts.UPDATE_ITEMS,
    items: highlightItem([...state.items], null, true, true)
  });
};

export const moveDown = () => (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: consts.UPDATE_ITEMS,
    items: highlightItem([...state.items], null, false, true)
  });
};

// export const moveUp = () => (dispatch, getState) => {
//   const state = getState();
//   const { items, highlightIdx } = state.list;
//   const count = items.length;
//   let newIndex = highlightIdx;
//   for (let i = 0; i < count; i++) {
//     newIndex--;
//     newIndex = newIndex >= 0 ? newIndex : count - 1;
//     if (isKeyValueObject(items[newIndex])) break;

//     if (i === count - 1) newIndex = highlightIdx;
//   }

//   // dispatch({
//   //   type: consts.HIGHLIGHT,
//   //   highlightIdx: -1
//   // });
//   dispatch(highlight(newIndex));
// };

// export const moveDown = () => (dispatch, getState) => {
//   const state = getState();
//   const { items, highlightIdx } = state.list;
//   const count = items.length;
//   let newIndex = highlightIdx;
//   for (let i = 0; i < count; i++) {
//     newIndex++;
//     newIndex = newIndex < count ? newIndex : 0;
//     if (isKeyValueObject(items[newIndex])) break;

//     if (i === count - 1) newIndex = highlightIdx;
//   }

//   // dispatch({
//   //   type: consts.HIGHLIGHT,
//   //   highlightIdx: -1
//   // });
//   dispatch(highlight(newIndex));
// };

// export const valueChange = value => (dispatch, getState) => {
//   dispatch({ type: consts.VALUE_CHANGED, value });
//   const state = getState();
//   const { onChange } = state.list;
//   if (onChange) onChange(value);
// };

// export const select = (success, fail) => (dispatch, getState) => {
//   const state = getState();
//   const { items, highlightIdx, isLoading, error } = state.list;

//   if (isLoading) return;

//   if (error) dispatch(loadItems(dispatch, getState));
//   else if (!items.length) {
//     if (fail) fail();
//     return;
//   } else {
//     const newValue = items[highlightIdx];
//     valueChange(newValue)(dispatch, getState);
//     if (success) success();
//   }
// };

// export const updateQuery = query => (dispatch, getState) => {
//   dispatch({ type: consts.QUERY_CHANGED, query });
//   loadItems()(dispatch, getState);
// };

// export const selectItem = item => ({ type: "", item });
// export const unselectItem = item => ({ type: "", item });
