import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { connect } from "react-redux";
import ListItem from "../ListItem";
import ListLabel from "../ListLabel";
import theme from "../../theme";

const styles = {
  list: {
    padding: [[theme.spacingUnit, 0]]
  }
};

const isKeyValueObject = item =>
  typeof item === "object" && "key" in item && "value" in item;

class List extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any,
    handleChange: PropTypes.func
  };

  state = { value: null, highlightedIdx: 0 };

  onItemClick = newValue => {
    const prevValue = this.state.value;
    this.setState({ value: newValue });

    if (
      this.props.handleChange &&
      (!prevValue || prevValue.key !== newValue.key)
    )
      this.props.handleChange(newValue, prevValue);
  };

  renderItem = (item, idx) =>
    isKeyValueObject(item) ? (
      <ListItem
        key={`${idx}-${item.key}`}
        value={item}
        onClick={this.onItemClick}
        highlight={idx === this.props.highlightIdx}
      >
        {item.value}
      </ListItem>
    ) : (
      item
    );

  renderItems = items =>
    Array.isArray(items) ? (
      items.length ? (
        items.map(this.renderItem)
      ) : (
        <ListLabel>На найдено</ListLabel>
      )
    ) : (
      this.renderItem(items, 0)
    );

  render() {
    const { classes, items } = this.props;

    return <div className={classes.list}>{this.renderItems(items)}</div>;
  }
}

export default connect(state => {
  return {
    highlightIdx: state.listReducer.highlightIdx,
    items: state.listReducer.items
  };
})(injectSheet(styles)(List));
