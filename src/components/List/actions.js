import * as consts from "./consts";

export const moveUp = () => ({ type: consts.MOVE_UP });
export const moveDown = () => ({ type: consts.MOVE_DOWN });
export const gotItems = items => ({ type: consts.GOT_ITEMS, items });
export const highlight = highlightIdx => ({
  type: consts.HIGHLIGHT,
  highlightIdx
});
