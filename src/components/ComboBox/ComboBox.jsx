import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import injectSheet from "react-jss";
import onClickOutside from "react-onclickoutside";
import { Provider, connect } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Popover from "../Popover";
import Spinner from "../Spinner";
import List from "../List";
import listReducer from "../List/reducer";
import { moveUp, moveDown } from "../List/actions";
import {
  updateQuery,
  blur,
  focus,
  closePopover,
  valueChanged
} from "./actions";
import reducer from "./reducer";
import styles from "./styles";

const configureStore = initialState =>
  createStore(
    combineReducers({ reducer, listReducer }),
    initialState,
    applyMiddleware(thunk)
  );

const placeholderWithArrow = "Введите или выберите из списка";
const placeholderWithoutArrow = "Начните вводить код или название";

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

  onFocus = () => this.props.focus(this.props.getItems);

  onInputChange = e =>
    this.props.updateQuery(this.props.getItems, e.target.value);

  onArrowClick = () => this.inputRef.current.focus(this.props.getItems);

  handleClickOutside = () => this.props.blur();

  onValueChanged = (newValue, prevValue) => {
    this.props.valueChanged(newValue);
    if (this.props.handleChange) this.props.handleChange(newValue, prevValue);
  };

  onKeyDown = e => {
    //console.log(e.key);
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
      default:
        break;
    }
  };

  render() {
    const {
      classes,
      autocomplete,
      name,

      label,
      loading,
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
          onFocus={this.onFocus}
          onChange={this.onInputChange}
          onKeyDown={this.onKeyDown}
          value={label}
          name={name}
        />
        {!autocomplete && (
          <i className={classes.arrow} onClick={this.onArrowClick} />
        )}
        <Popover open={showPopover}>
          {loading ? <Spinner /> : <List handleChange={this.onValueChanged} />}
        </Popover>
      </div>
    );
  }
}

const StyledComboBox = connect(
  state => ({ ...state.reducer }),
  {
    moveUp,
    moveDown,
    updateQuery,
    blur,
    focus,
    closePopover,
    valueChanged
  }
)(injectSheet(styles)(onClickOutside(CustomComboBox)));

export default class ComboBox extends React.Component {
  store = configureStore();

  render() {
    return (
      <Provider store={this.store}>
        <StyledComboBox {...this.props} />
      </Provider>
    );
  }
}
