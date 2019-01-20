import React from "react";
import PropTypes from "prop-types";

export default function Button({ children, ...props }) {
  return <button {...props}>{children}</button>;
}

Button.propTypes = {
  children: PropTypes.Node
};
