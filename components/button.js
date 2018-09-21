import styled from "react-emotion";
import PropTypes from "prop-types";
import React from "react";
import { globalTheme } from "../theme";

const StyledButton = styled("button")(
  {
    backgroundColor: globalTheme.colour.cdsYellow,
    border: "2px solid" + globalTheme.colour.cdsYellow,
    borderRadius: "3px",
    color: "black",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "23px",
    outlineOffset: "-1px",
    outline: "1px solid transparent",
    padding: ".526315em .789473em",
    textDecoration: "none",
    WebkitAppearance: "none",
    WebkitFontSmoothing: "antialiased",
    verticalAlign: "middle",
    ":hover": {
      backgroundColor: globalTheme.colour.cdsDarkYellow,
      border: "2px solid" + globalTheme.colour.cdsDarkYellow,
      color: "black"
    },
    ":focus": {
      color: "black",
      backgroundColor: globalTheme.colour.cdsDarkYellow
    },
    ":active": {
      position: "relative",
      boxShadow: `0 0 0 ${globalTheme.colour.cdsDarkYellow}`
    },
    ":visited": {
      color: "black"
    },
    " svg": {
      verticalAlign: "middle"
    }
  },
  ({ isBig }) => ({
    fontSize: isBig ? "24px" : undefined,
    lineHeight: isBig ? "31px" : undefined,
    padding: isBig ? ".36842em .84211em" : undefined,
    " svg": {
      height: isBig ? "31px" : undefined,
      width: isBig ? "36px" : undefined
    }
  }),
  ({ isSecondary }) => ({
    backgroundColor: isSecondary ? globalTheme.colour.white : undefined,
    border: isSecondary
      ? "2px solid" + globalTheme.colour.cdsYellow
      : undefined,
    ":hover": {
      backgroundColor: isSecondary ? globalTheme.colour.white : undefined,
      border: isSecondary
        ? "2px solid" + globalTheme.colour.cdsDarkYellow
        : undefined
    },
    ":focus": {
      backgroundColor: isSecondary ? globalTheme.colour.white : undefined
    },
    ":active": {
      boxShadow: isSecondary
        ? `0 0 0 ${globalTheme.colour.darkGreyBlue}`
        : undefined
    }
  })
);

// from: https://github.com/UKHomeOffice/govuk-react/blob/master/components/button/src/index.js

const Button = ({ big, secondary, children, icon, ...props }) => (
  <StyledButton icon={icon} isBig={big} isSecondary={secondary} {...props}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  /**
   * Button text
   */
  children: PropTypes.node,
  /**
   * Button icon
   */
  icon: PropTypes.node,
  /**
   * Renders a large button if set to true
   */
  big: PropTypes.bool,
  /**
   * Renders a disabled button and removes pointer events if set to true
   */
  secondary: PropTypes.bool
};

Button.defaultProps = {
  children: "Button",
  icon: undefined,
  big: false,
  secondary: false
};

export default Button;
