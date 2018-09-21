import React, { Component } from "react";
import { css } from "react-emotion";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Link from "next/link";
import { globalTheme } from "../theme";
import Button from "../components/button";

// Top taken from https://benfrain.com/independent-scrolling-panels-body-scroll-using-just-css/

const Top = css`
  box-sizing: border-box;
  align-items: center;
  justify-content: left;
  position: relative;
  z-index: 10;
  padding-top: 24px;
  background-color: #000;
  height: 80px;
`;
const H1 = css`
  display: inline-block;
  font-size: 2em;
  color: ${globalTheme.colour.cdsYellow};
  margin: 0px;
  font-weight: normal;
`;
const button = css`
  display: inline-block;
  margin-right: 10px;
`;

const Container = css`
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export class Header extends Component {
  render() {
    return (
      <div className={Top}>
        <div className={Container}>
          <h1 className={H1}>{this.props.text}</h1>
        </div>
      </div>
    );
  }
}

Header.defaultProps = {
  text: "Create a GIF"
};

Header.propTypes = {
  text: PropTypes.string
};

export default Header;
