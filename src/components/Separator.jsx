import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";
import theme from "../theme";

const styles = {
  separator: {
    background: theme.borderColor,
    height: 1,
    margin: [[theme.spacingUnit, 0]]
  }
};

const Separator = ({ classes }) => <div className={classes.separator} />;

Separator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default injectSheet(styles)(Separator);
