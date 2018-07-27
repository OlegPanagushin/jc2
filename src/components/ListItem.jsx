import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import cn from "classnames";
import scrollIntoView from "scroll-into-view-if-needed";
import theme from "../theme";

const styles = {
  listItem: {
    cursor: "pointer",
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]],
    transition: theme.transition(["background", "color"])
  },
  highlight: {
    background: theme.borderColorFocus,
    color: theme.inverseColor
  }
};

class ListItem extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
    highlight: PropTypes.bool
  };

  itemRef = React.createRef();

  onClick = () => this.props.onClick && this.props.onClick();

  onMouseEnter = () => this.props.onHover && this.props.onHover();

  componentDidUpdate(prevProps) {
    if (this.props.highlight !== prevProps.highlight) {
      scrollIntoView(this.itemRef.current, {
        scrollMode: "if-needed",
        block: "top"
      });
    }
  }

  render() {
    const { classes, children, highlight } = this.props;

    return (
      <div
        className={cn(classes.listItem, highlight && classes.highlight)}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        ref={this.itemRef}
      >
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(ListItem);
