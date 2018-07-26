import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import theme from "../theme";

const styles = {
  listLabel: {
    color: theme.placeholderColor,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize * 0.8,
    lineHeight: theme.lineHeight,
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]]
  }
};

const ListLabel = ({ classes, children }) => (
  <div className={classes.listLabel}>{children}</div>
);

ListLabel.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired
};

export default injectSheet(styles)(ListLabel);
