import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import Item from "./Item";
import Label from "./Label";
import Spinner from "../Spinner";
import Separator from "../Separator";
import theme from "../../theme";

const styles = {
  list: {
    maxHeight: props => props.maxHeight,
    padding: [[theme.spacingUnit, 0]]
  }
};

export class BaseList extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      list: PropTypes.string.isRequired
    }).isRequired,
    popularItems: PropTypes.array,
    items: PropTypes.array.isRequired,
    infoText: PropTypes.string,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    onItemClick: PropTypes.func,
    onItemMouseEnter: PropTypes.func,
    onItemMouseLeave: PropTypes.func
  };

  handle = name => (event, item) =>
    this.props[name] && this.props[name]({ event, item });

  onItemClick = this.handle("onItemClick");
  onItemMouseEnter = this.handle("onItemMouseEnter");
  onItemMouseLeave = this.handle("onItemMouseLeave");

  renderItem = item => (
    <Item
      key={item.key}
      onClick={this.onItemClick}
      onMouseEnter={this.onItemMouseEnter}
      onMouseLeave={this.onItemMouseLeave}
      item={item}
      isSelected={item.isSelected}
    >
      {item.value}
    </Item>
  );

  renderPopularItems = () => {
    const { popularItems } = this.props;
    if (!popularItems || !popularItems.length) return null;

    return (
      <React.Fragment>
        {popularItems.map(this.renderItem)}
        {<Separator />}
      </React.Fragment>
    );
  };

  renderItems = ({ items, popularItems, infoText }) => (
    <React.Fragment>
      {popularItems &&
        popularItems.length &&
        popularItems.map(this.renderItem) && <Separator />}
      {items.length && items.map(this.renderItem)}
      {infoText && <Label>{infoText}</Label>}
    </React.Fragment>
  );

  renderError = () => (
    <React.Fragment>
      <Label>Что-то пошло не так, попробуйте еще раз</Label>
      {this.renderItem({
        key: -1,
        value: "Обновить",
        isErroItem: true,
        isSelected: true
      })}
    </React.Fragment>
  );

  render() {
    const { classes, isError, isLoading } = this.props;

    return (
      <div className={classes.list}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          this.renderError()
        ) : (
          this.renderItems(this.props)
        )}
      </div>
    );
  }
}

export const StyledList = injectSheet(styles)(BaseList);
