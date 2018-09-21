import React from "react";
import { mount } from "enzyme";
import Layout from "../../components/layout";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Layout", () => {
  it("renders", async () => {
    mount(<Layout />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Layout />).html();
    expect(await axe(html)).toHaveNoViolations();
  });
});
