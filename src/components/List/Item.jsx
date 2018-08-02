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
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]],
    transition: theme.transition(["background", "color"], 100)
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
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
  };

  itemRef = React.createRef();

  handle = name => event => {
    event.persist();
    this.props[name] && this.props[name](event, this.props.item);
  };

  onClick = this.handle("onClick");
  onMouseEnter = this.handle("onMouseEnter");
  onMouseLeave = this.handle("onMouseLeave");

  componentDidUpdate(prevProps) {
    if (this.props.highlight !== prevProps.highlight) {
      scrollIntoView(this.itemRef.current, {
        scrollMode: "if-needed",
        block: "start"
      });
    }
  }

  render() {
    const { classes, children, isSelected } = this.props;

    return (
      <div
        className={cn(classes.item, isSelected && classes.highlight)}
        onClick={this.onClick}
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
