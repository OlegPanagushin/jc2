import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import injectSheet from "react-jss";
import onClickOutside from "react-onclickoutside";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  ComboBoxProvider as Provider,
  connectComboBox as connect
} from "../../redux";
import Popover from "../Popover";
import List from "../List";
import listReducer from "../List/reducer";
import { moveUp, moveDown } from "../List/actions";
import { blur, focus, closePopover } from "./actions";
import { loadItems, updateQuery, select } from "../List/actions";
import reducer, { defaultState } from "./reducer";
import { defaultState as listReducerDefaultState } from "../List/reducer";
import styles from "./styles";

const configureStore = initialState =>
  createStore(
    combineReducers({ combo: reducer, list: listReducer }),
    initialState,
    applyMiddleware(thunk)
  );

const placeholderWithArrow = "Введите или выберите из списка";
const placeholderWithoutArrow = "Начните вводить";

class CustomComboBox extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    autocomplete: PropTypes.bool,
    getItems: PropTypes.func.isRequired,
    name: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired
    })
  };

  inputRef = React.createRef();

  handleFocus = () => {
    const { autocomplete } = this.props;
    this.props.focus(autocomplete);
    if (!autocomplete) this.props.loadItems();
  };

  handleInputChange = e => this.props.updateQuery(e.target.value);

  handleArrowClick = () => this.inputRef.current.focus(this.props.autocomplete);

  handleClickOutside = () => this.props.blur();

  focusNext = () => {
    const current = this.inputRef.current;
    const all = document.querySelectorAll(
      "input, button, a, area, object, select, textarea"
    );

    if (all.length) {
      let currentIdx;
      for (let i = 0; i < all.length; i++) {
        if (current.isEqualNode(all[i])) {
          currentIdx = i;
        }
      }

      const nextIdx = currentIdx + 1;
      if (nextIdx < all.length) all[nextIdx].focus();
      else all[0].focus();
    }
    this.props.blur();
  };

  handleKeyDown = e => {
    switch (e.key) {
      case "Tab":
        this.props.blur();
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
        this.props.select(this.focusNext);
        break;
      default:
        break;
    }
  };

  render() {
    const {
      classes,
      autocomplete,
      name,

      query,
      inFocus,
      showPopover
    } = this.props;

    return (
      <div className={cn(classes.comboBox, inFocus && classes.inFocus)}>
        <input
          ref={this.inputRef}
          className={classes.input}
          type="text"
          placeholder={
            autocomplete ? placeholderWithoutArrow : placeholderWithArrow
          }
          onFocus={this.handleFocus}
          onChange={this.handleInputChange}
          onKeyDown={this.handleKeyDown}
          value={query}
          name={name}
        />
        {!autocomplete && (
          <div className={classes.arrow} onClick={this.handleArrowClick}>
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
        <Popover open={showPopover}>
          <List />
        </Popover>
      </div>
    );
  }
}

const StyledComboBox = connect(
  state => ({ ...state.combo }),
  {
    moveUp,
    moveDown,
    updateQuery,
    blur,
    focus,
    closePopover,
    loadItems,
    select
  }
)(injectSheet(styles)(onClickOutside(CustomComboBox)));

export default class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.store = configureStore({
      combo: { ...defaultState },
      list: {
        ...listReducerDefaultState,
        getItems: props.getItems,
        onChange: props.onChange
      }
    });
  }

  render() {
    return (
      <Provider store={this.store}>
        <StyledComboBox {...this.props} />
      </Provider>
    );
  }
}
