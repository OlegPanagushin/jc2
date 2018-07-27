import { lighten } from "polished";

const transitionDuration = 200;
const color = "#404040";
const placeholderColor = "#999";
const timingFunction = "cubic-bezier(0.77, 0, 0.175, 1)";

export default {
  borderColor: "#e8e8e8",
  borderColorFocus: "#5199db",
  borderRadius: 2,
  fontFamily: "'Segoe UI', Helvetica, Arial, sans-serif",
  fontSize: 14,
  inverseColor: "#fff",
  lineHeight: "20px",
  placeholderColor: placeholderColor,
  placeholderLighterColor: lighten(0.1, placeholderColor),
  redColor: "red",
  spacingUnit: 8,
  textColor: color,
  zPopover: 100,

  transition: (
    properties = ["all"],
    duration = `${transitionDuration}ms`,
    delay = "0ms"
  ) =>
    properties.map(property => ({
      property: property,
      timingFunction,
      duration,
      delay
    }))
};
