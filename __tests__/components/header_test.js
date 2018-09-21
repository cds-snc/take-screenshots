import React from "react";
import { mount } from "enzyme";
import { Header } from "../../components/header";
const { axe, toHaveNoViolations } = require("jest-axe");
expect.extend(toHaveNoViolations);

describe("Header", () => {
  let props;

  beforeEach(() => {
    props = {
      reduxState: { editingMode: "researcher" },
      saveEditingMode: jest.fn()
    };
  });

  it("renders", async () => {
    mount(<Header {...props} />);
  });

  it("passes axe tests", async () => {
    let html = mount(<Header {...props} />).html();
    expect(await axe(html)).toHaveNoViolations();
  });

  it("Shows correct buttons for Generate Templates mode", () => {
    expect(mount(<Header {...props} />).text()).toContain("Policy");
    expect(mount(<Header {...props} />).text()).not.toContain("Researcher");
    expect(mount(<Header {...props} />).text()).not.toContain(
      "Refresh Airtable"
    );
  });

  it("Shows correct buttons for Template Editing mode", () => {
    props.reduxState.editingMode = "policy";
    expect(mount(<Header {...props} />).text()).not.toContain("Policy");
    expect(mount(<Header {...props} />).text()).toContain("Researcher");
    expect(mount(<Header {...props} />).text()).toContain("Refresh Airtable");
  });

  describe("HandleOnClick functions", () => {
    it("flips editing mode to Template Editing", async () => {
      const instance = mount(<Header {...props} />).instance();
      instance.handleOnClick();
      expect(instance.props.saveEditingMode).toBeCalledWith("policy");
    });

    it("flips editing mode to Generate Templates", async () => {
      props.reduxState.editingMode = "policy";
      const instance = mount(<Header {...props} />).instance();
      instance.handleOnClick();
      expect(instance.props.saveEditingMode).toBeCalledWith("researcher");
    });
  });
});
