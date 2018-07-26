import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import cn from "classnames";
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
    value: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      value: PropTypes.string.isRequired
    }).isRequired,
    highlight: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = { highlight: props.highlight };
  }

  onClick = () => this.props.onClick && this.props.onClick(this.props.value);

  onMouseEnter = () => this.setState({ highlight: true });
  onMouseLeave = () => this.setState({ highlight: false });

  componentDidUpdate(prevProps) {
    const { highlight } = this.props;
    if (prevProps.highlight !== highlight) this.setState({ highlight });
  }

  render() {
    const { classes, children } = this.props;
    const { highlight } = this.state;

    return (
      <div
        className={cn(classes.listItem, highlight && classes.highlight)}
        onClick={this.onClick}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
      >
        {children}
      </div>
    );
  }
}

export default injectSheet(styles)(ListItem);
