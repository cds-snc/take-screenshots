import React, { Component } from "react";
import { css, cx } from "react-emotion";
import PropTypes from "prop-types";
import Layout from "../components/layout";
import Header from "../components/header";
import Button from "../components/button";
import Link from "next/link";

const Container = css`
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  height: 100vh;
  margin-top: -80px;
  padding-top: 80px;
  position: relative;
  width: 100%;
  top: 0px;
  backface-visibility: hidden;
  will-change: overflow;
`;
const Main = css`
  overflow: auto;
  height: auto;
  padding: 2rem;
  -webkit-overflow-scrolling: touch;
  -ms-overflow-style: none;
`;

export class Index extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Layout>
          <div className={Main}>
            <Link href="/">
              <Button>Download GIF</Button>
            </Link>
          </div>
        </Layout>
      </React.Fragment>
    );
  }
}

Index.propTypes = {
  store: PropTypes.object
};

export default Index;
