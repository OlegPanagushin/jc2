import debounce from "lodash.debounce";
import * as consts from "./consts";

const errorItemKey = "";
const errorItem = {
  key: errorItemKey,
  value: "Обновить",
  isErroItem: true,
  isSelected: true
};

const loadItemsFunction = (dispatch, getState, handlers) => {
  const state = getState();
  const { query, item } = state;
  const { loadItems, loadPopular } = handlers;
  dispatch({
    type: consts.LOAD_ITEMS_REQUEST
  });
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

      const result = {
        type: consts.LOAD_ITEMS_SUCCESS,
        items: foundItems,
        infoText: infoText,
        popularItems: []
      };

      if (loadPopular) {
        loadPopular(query)
          .then(popularItems => {
            result.popularItems = popularItems;
            dispatch(result);
          })
          .catch(() => dispatch(result));
      } else dispatch(result);
    })
    .catch(error =>
      dispatch({
        type: consts.LOAD_ITEMS_FAIL,
        error,
        items: [errorItem],
        popularItems: []
      })
    );
};
const debouncedLoadItems = debounce(loadItemsFunction, 300);

export const handleFocus = (isAutocomplete, handlers) => (
  dispatch,
  getState
) => {
  dispatch({
    type: consts.HANDLE_FOCUS,
    isAutocomplete
  });

  if (!isAutocomplete) debouncedLoadItems(dispatch, getState, handlers);
};

export const handleBlur = (handlers, shoulSelectActiveItem) => dispatch => {
  if (shoulSelectActiveItem) dispatch(selectActiveItem(handlers));

  dispatch({ type: consts.HANDLE_BLUR });
};

export const handleInputChange = (query, handlers) => (dispatch, getState) => {
  dispatch({
    type: consts.HANDLE_INPUT_CHANGE,
    query
  });
  debouncedLoadItems(dispatch, getState, handlers);
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
  let i = allItems[currentItemIdx];
  if (i) {
    i.isSelected = false;
    i.scrollIfNeeded = false;
  }
  i = allItems[newItemIdx];
  if (i) {
    i.isSelected = true;
    i.scrollIfNeeded = scrollIfNeeded;
  }
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

export const selectActiveItem = (handlers, succesCallback) => (
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
    loadItemsFunction(dispatch, getState, handlers);
    return;
  }

  const item = state.items.find(item => item.isSelected === true);
  if (item) item.scrollIfNeeded = true;

  dispatch(selectItem(item));
  succesCallback && succesCallback();
  handlers.onValueChange && handlers.onValueChange(item);
};

export const closePopover = () => ({ type: consts.CLOSE_POPOVER });
