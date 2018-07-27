import React from "react";
import PropTypes from "prop-types";
import injectSheet from "react-jss";

const styles = {
  spinner: {
    display: "block",
    margin: "0 auto",
    overflow: "hidden"
  }
};

class Spinner extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.number,
    height: PropTypes.number
  };

  render() {
    const { classes, width, height } = this.props;

    return (
      <svg
        className={classes.spinner}
        width={width || 20}
        height={height || 20}
        viewBox="0 0 38 38"
        xmlns="http://www.w3.org/2000/svg"
        stroke="#999"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(1 1)" strokeWidth="2">
            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    );
  }
}

export default injectSheet(styles)(Spinner);
