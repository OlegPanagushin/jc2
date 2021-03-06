import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import theme from "../../theme";

const styles = {
  label: {
    color: theme.placeholderColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize * 0.8,
    lineHeight: theme.lineHeight,
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]]
  }
};

const Label = ({ classes, children }) => (
  <div className={classes.label}>{children}</div>
);

Label.propTypes = {
  classes: PropTypes.shape({
    label: PropTypes.string.isRequired
  }).isRequired,
  children: PropTypes.node.isRequired
};

export default injectSheet(styles)(Label);
