import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import injectSheet from "react-jss";
import theme from "../theme";

const styles = {
  popover: {
    background: "#fff",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    borderRadius: theme.borderRadius,
    boxShadow:
      "0px 1px 8px 0px rgba(0, 0, 0, 0.2),0px 3px 4px 0px rgba(0, 0, 0, 0.14),0px 3px 3px -2px rgba(0, 0, 0, 0.12)",
    overflow: "auto",
    position: "absolute",
    top: "calc(100% + 2px)",
    transform: "scale(1, 1)",
    transformOrigin: "top left",
    transition: theme.transition(["transform", "opacity"]),
    width: "100%",
    zIndex: theme.zPopover,
    fallbacks: {
      top: "100%"
    }
  },
  hide: {
    opacity: 0,
    transform: "scale(1, 0)"
  }
};

const Popover = ({ classes, open, children }) => (
  <div className={cn(classes.popover, !open && classes.hide)}>{children}</div>
);

Popover.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool,
  children: PropTypes.node
};

export default injectSheet(styles)(Popover);
