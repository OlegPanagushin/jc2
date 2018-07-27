import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import { connectComboBox as connect } from "../../redux";
import theme from "../../theme";
import Spinner from "../Spinner";
import ListItem from "../ListItem";
import ListLabel from "../ListLabel";
import { valueChange, loadItems, highlight, select } from "./actions";
import { isKeyValueObject } from "../../utils";

const styles = {
  list: {
    padding: [[theme.spacingUnit, 0]]
  }
};

class List extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.any,
    handleChange: PropTypes.func
  };

  renderItem = (item, idx) =>
    isKeyValueObject(item) ? (
      <ListItem
        key={`${idx}-${item.key}`}
        onClick={item.isErroItem ? this.props.loadItems : this.props.select}
        onHover={() => this.props.highlight(idx)}
        highlight={idx === this.props.highlightIdx}
      >
        {item.value}
      </ListItem>
    ) : (
      item
    );

  renderItems = items =>
    items.length ? (
      items.map(this.renderItem)
    ) : (
      <ListLabel>На найдено</ListLabel>
    );

  renderError = () =>
    [
      <ListLabel key="label">
        Что-то пошло не так, попробуйте еще раз
      </ListLabel>,
      { key: -1, value: "Обновить", isErroItem: true }
    ].map(this.renderItem);

  render() {
    const { classes, items, error, loading } = this.props;

    return (
      <div className={classes.list}>
        {loading ? (
          <Spinner />
        ) : error ? (
          this.renderError()
        ) : (
          this.renderItems(items)
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    ...state.list
  }),
  { valueChange, loadItems, highlight, select }
)(injectSheet(styles)(List));
