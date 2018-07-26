import * as consts from "./consts";

const defaultState = {
  items: [],
  highlightIdx: 0,
  selected: -1
};

const reducer = (state = { ...defaultState }, action) => {
  const { type, items = [], highlightIdx, selectIdx } = action;

  switch (type) {
    case consts.GOT_ITEMS:
      return {
        ...state,
        items
      };

    case consts.MOVE_UP: {
      const nextIdx = state.highlightIdx - 1;
      return {
        ...state,
        highlightIdx: nextIdx < 0 ? state.items.length - 1 : nextIdx
      };
    }

    case consts.MOVE_DOWN: {
      const nextIdx = state.highlightIdx + 1;
      return {
        ...state,
        highlightIdx: nextIdx >= state.items.length ? 0 : nextIdx
      };
    }

    case consts.HIGHLIGHT:
      return {
        ...state,
        highlightIdx
      };

    case consts.SELECT:
      return {
        ...state,
        selected: selectIdx
      };

    default:
      return state;
  }
};

export default reducer;
