import { createProvider } from "react-redux";
import { connect } from "react-redux";

export const COMBO_BOX_STORE_KEY = "COMBO_BOX_STORE_KEY";

function connectToComboBoxProvider(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
  options = {}
) {
  options.storeKey = COMBO_BOX_STORE_KEY;
  return connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps,
    options
  );
}

export const ComboBoxStoreProvider = createProvider(COMBO_BOX_STORE_KEY);
export { connectToComboBoxProvider };
