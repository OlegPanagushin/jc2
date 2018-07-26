import theme from "../../theme";

const arrowWidth = 22;

export default {
  comboBox: {
    border: `1px solid ${theme.borderColor}`,
    borderRadius: theme.borderRadius,
    boxSizing: "border-box",
    display: "inline-flex",
    minWidth: 250,
    position: "relative",
    transition: theme.transition(["border-color", "box-shadow"]),
    fallbacks: {
      display: "table"
    }
  },
  input: {
    border: "none",
    color: theme.textColor,
    flex: "1 1 auto",
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
    lineHeight: theme.lineHeight,
    outline: "none",
    padding: [[theme.spacingUnit / 2, theme.spacingUnit]],
    fallbacks: {
      display: "table-cell"
    },
    "&::placeholder": {
      color: theme.placeholderColor,
      fontSize: theme.fontSize * 0.9,
      transition: theme.transition(["color"])
    }
  },
  inFocus: {
    borderColor: theme.borderColorFocus,
    boxShadow: `0 0 0 1px ${theme.borderColorFocus}`,
    "& $input": {
      "&::placeholder": {
        color: theme.placeholderLighterColor
      }
    }
  },
  arrow: {
    background: theme.placeholderColor,
    cursor: "pointer",
    width: arrowWidth,
    fallbacks: {
      display: "table-cell"
    }
  }
};