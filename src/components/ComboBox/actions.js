import * as consts from "./consts";

export const closePopover = () => ({ type: consts.CLOSE_POPOVER });
export const blur = () => ({ type: consts.BLUR });
export const focus = isAutocomplete => ({ type: consts.FOCUS, isAutocomplete });
