import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import injectSheet from "react-jss";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  ComboBoxStoreProvider as Provider,
  connectToComboBoxProvider as connect
} from "./redux";
import reducer from "./reducer";
import {
  handleFocus,
  handleBlur,
  handleInputChange,
  activateItem,
  moveUp,
  moveDown,
  selectActiveItem,
  closePopover,
  selectItem
} from "./actions";
import styles from "./styles";
import Popover from "../Popover";
import { StyledList } from "../List";
import { focusNextControl } from "../../utils";

const configureStore = initialState =>
  createStore(reducer, initialState, applyMiddleware(thunk));

const placeholderWithArrow = "Введите или выберите из списка";
const placeholderWithoutArrow = "Начните вводить";

const ListConnectedToStore = connect(state => {
  const { items, popularItems, infoText, isError, isLoading } = state;
  return {
    items,
    popularItems,
    infoText,
    isError,
    isLoading
  };
})(StyledList);

class CustomComboBox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    autocomplete: PropTypes.bool,
    loadPopular: PropTypes.func,
    loadItems: PropTypes.func.isRequired,
    name: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired
    })
  };

  inputRef = React.createRef();

  handle = name => ({ event, item }) => this.props[name](event, item);

  onFocus = this.handle("handleFocus");
  onBlur = this.handle("handleBlur");
  handleItemClick = this.handle("handleItemClick");
  handleMouseEnterItem = this.handle("handleMouseEnterItem");

  onInputChange = event => this.props.inputChange(event);

  onArrowClick = () => this.inputRef.current.focus();

  handleKeyDown = event => {
    switch (event.key) {
      case "Tab":
        this.props.selectActiveItem();
        break;
      case "Escape":
        this.props.closePopover();
        break;
      case "ArrowUp":
        this.props.moveUp();
        break;
      case "ArrowDown":
        this.props.moveDown();
        break;
      case "Enter":
        this.props.selectActiveItem(() =>
          focusNextControl(this.inputRef.current)
        );
        break;
      default:
        break;
    }
  };

  componentDidUpdate(prevProps) {
    //хорошо бы еще чукнуть, что это за велью пришло
    if (this.props.value !== prevProps.value) {
      this.props.itemSetOutside(this.props.value);
    }
  }

  render() {
    const {
      classes,
      autocomplete,
      name,

      text,
      isInFocus,
      isPopoverShown,
      isValidationError
    } = this.props;

    return (
      <div>
        <div
          className={cn(
            classes.comboBox,
            isInFocus && classes.inFocus,
            isValidationError && classes.error
          )}
        >
          <input
            ref={this.inputRef}
            className={classes.input}
            type="text"
            placeholder={
              autocomplete ? placeholderWithoutArrow : placeholderWithArrow
            }
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChange={this.onInputChange}
            onKeyDown={this.handleKeyDown}
            value={text}
            name={name}
          />
          {!autocomplete && (
            <div className={classes.arrow} onClick={this.onArrowClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 960 560"
                className={classes.arrowSvg}
              >
                <g>
                  <path d="M480,344.181L268.869,131.889c-15.756-15.859-41.3-15.859-57.054,0c-15.754,15.857-15.754,41.57,0,57.431l237.632,238.937 c8.395,8.451,19.562,12.254,30.553,11.698c10.993,0.556,22.159-3.247,30.555-11.698l237.631-238.937 c15.756-15.86,15.756-41.571,0-57.431s-41.299-15.859-57.051,0L480,344.181z" />
                </g>
              </svg>
            </div>
          )}
          <Popover open={isPopoverShown}>
            <ListConnectedToStore
              maxHeight={autocomplete ? "auto" : 300}
              onItemClick={this.handleItemClick}
              onItemMouseEnter={this.handleMouseEnterItem}
            />
          </Popover>
        </div>
        {isValidationError && (
          <label className={classes.errorLabel}>Выберите значение</label>
        )}
      </div>
    );
  }
}

const StyledComboBox = injectSheet(styles)(CustomComboBox);
const ComboBoxWithStore = connect(
  state => {
    const { text, isInFocus, isPopoverShown, isValidationError } = state;
    return { text, isInFocus, isPopoverShown, isValidationError };
  },
  (dispatch, ownProps) => {
    const { loadItems, loadPopular, onValueChange } = ownProps;
    const handlers = { loadItems, loadPopular, onValueChange };

    return {
      handleFocus: () => dispatch(handleFocus(ownProps.autocomplete, handlers)),

      handleBlur: () => dispatch(handleBlur(handlers, true)),

      inputChange: event =>
        dispatch(handleInputChange(event.target.value, handlers)),

      handleItemClick: event => {
        event.preventDefault();
        dispatch(selectActiveItem(handlers));
      },

      handleMouseEnterItem: (event, item) => dispatch(activateItem(item)),

      moveUp: () => dispatch(moveUp()),
      moveDown: () => dispatch(moveDown()),

      selectActiveItem: successCallback =>
        dispatch(selectActiveItem(handlers, successCallback)),

      closePopover: () => dispatch(closePopover()),

      itemSetOutside: item => dispatch(selectItem(item))
    };
  }
)(StyledComboBox);

export default class ComboBox extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <ComboBoxWithStore {...this.props} />
      </Provider>
    );
  }
}
