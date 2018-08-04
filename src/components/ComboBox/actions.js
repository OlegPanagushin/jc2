import debounce from "lodash.debounce";
import * as consts from "./consts";

const errorItemKey = "";
const errorItem = {
  key: errorItemKey,
  value: "Обновить",
  isErroItem: true,
  isSelected: true
};

const loadItemsFunction = (dispatch, getState, loadItems) => {
  const state = getState();
  const { query, item } = state;
  loadItems(query)
    .then(({ items, totalCount }) => {
      const fountCount = items.length;
      let foundItems = [];
      let infoText = "";

      if (fountCount > 0) {
        const idx =
          item !== null ? items.findIndex(i => i.key === item.key) : 0;
        if (idx > -1) {
          items[idx].isSelected = true;
          items[idx].scrollIfNeeded = true;
        }
        foundItems = items;
        infoText =
          fountCount === totalCount
            ? ""
            : `Показано ${fountCount} из ${totalCount} найденных городов.`;
      } else infoText = "Не найдено";

      dispatch({
        type: consts.LOAD_ITEMS_SUCCESS,
        items: foundItems,
        infoText: infoText
      });
    })
    .catch(error =>
      dispatch({
        type: consts.LOAD_ITEMS_FAIL,
        error,
        items: [errorItem]
      })
    );
};
const debouncedLoadItems = debounce(loadItemsFunction, 300);

export const handleFocus = (isAutocomplete, loadItems) => (
  dispatch,
  getState
) => {
  dispatch({
    type: consts.HANDLE_FOCUS,
    isAutocomplete
  });

  if (!isAutocomplete) debouncedLoadItems(dispatch, getState, loadItems);
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
  if (state.isPopoverShown)
    dispatch({
      type: consts.UPDATE_ITEMS,
      items: highlightItem([...state.items], null, true, true)
    });
};

export const moveDown = () => (dispatch, getState) => {
  const state = getState();
  if (state.isPopoverShown)
    dispatch({
      type: consts.UPDATE_ITEMS,
      items: highlightItem([...state.items], null, false, true)
    });
};

export const selectActiveItem = (loadItems, succesCallback) => (
  dispatch,
  getState
) => {
  const state = getState();
  if (!state.isPopoverShown || state.isLoading) return;

  if (state.items.length === 0) {
    dispatch({
      type: consts.VALIDATION_ERROR
    });
    return;
  } else if (state.items[0].key === errorItemKey) {
    loadItemsFunction(dispatch, getState, loadItems);
    return;
  }

  const item = state.items.find(item => item.isSelected === true);
  if (item) item.scrollIfNeeded = true;

  dispatch(selectItem(item));
  succesCallback && succesCallback();
};
