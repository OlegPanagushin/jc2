import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import cn from "classnames";
import scrollIntoView from "scroll-into-view-if-needed";
import theme from "../../theme";

const styles = {
  item: {
    cursor: "pointer",
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]]
  },
  highlight: {
    background: theme.borderColorFocus,
    color: theme.inverseColor
  }
};

class Item extends React.Component {
  static propTypes = {
    classes: PropTypes.shape({
      item: PropTypes.string.isRequired,
      highlight: PropTypes.string.isRequired
    }).isRequired,
    children: PropTypes.node.isRequired,
    item: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    isSelected: PropTypes.bool,
    onMouseDown: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  itemRef = React.createRef();

  handle = name => event => {
    event.persist();
    this.props[name] && this.props[name](event, this.props.item);
  };

  onMouseDown = this.handle("onMouseDown");
  onMouseEnter = this.handle("onMouseEnter");
  onMouseLeave = this.handle("onMouseLeave");

  reveal = () =>
    this.props.item.scrollIfNeeded &&
    scrollIntoView(this.itemRef.current, {
      scrollMode: "if-needed",
      block: "start"
    });

  componentDidUpdate() {
    this.reveal();
  }

  componentDidMount() {
    this.reveal();
  }

  render() {
    const { classes, children, item } = this.props;

    return (
      <div
        className={cn(classes.item, item.isSelected && classes.highlight)}
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        ref={this.itemRef}
      >
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(Item);
