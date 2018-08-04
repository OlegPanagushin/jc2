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
      onMouseDown={this.onItemClick}
      onMouseEnter={this.onItemMouseEnter}
      onMouseLeave={this.onItemMouseLeave}
      item={item}
      isSelected={item.isSelected}
    >
      {item.value}
    </Item>
  );

  renderPopularItems = () => {
    const { popularItems = [] } = this.props;
    if (popularItems.length === 0) return null;

    return (
      <React.Fragment>
        {popularItems.map(this.renderItem)}
        {<Separator />}
      </React.Fragment>
    );
  };

  renderItems = ({ items, popularItems = [], infoText }) => (
    <React.Fragment>
      {popularItems.length > 0 &&
        popularItems.map(this.renderItem) && <Separator />}
      {items.length > 0 && items.map(this.renderItem)}
      {infoText && <Label>{infoText}</Label>}
    </React.Fragment>
  );

  renderError = ({ items }) => (
    <React.Fragment>
      <Label>Что-то пошло не так, попробуйте еще раз</Label>
      {this.renderItems({ items })}
    </React.Fragment>
  );

  render() {
    const { classes, isError, isLoading } = this.props;

    return (
      <div className={classes.list}>
        {isLoading ? (
          <Spinner />
        ) : isError ? (
          this.renderError(this.props)
        ) : (
          this.renderItems(this.props)
        )}
      </div>
    );
  }
}

export const StyledList = injectSheet(styles)(BaseList);
