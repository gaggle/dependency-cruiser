/* eslint-disable node/global-require */
const path = require("path");
const { expect } = require("chai");
const { getPluginReporter } = require("../../../src/report/plugins");

const FIXTURE_DIR = path.join(__dirname, "fixtures");

describe("report/plugins - getPluginReporter", () => {
  it("throws when the plugin:reporter is not a valid plugin", () => {
    expect(() =>
      getPluginReporter(
        `plugin:${path.join(FIXTURE_DIR, "./invalid-no-exit-code-plugin")}`
      )
    ).to.throw(
      `${path.join(
        __dirname,
        "fixtures",
        "invalid-no-exit-code-plugin"
      )} is not a valid plugin`
    );
  });

  it("throws when the plugin:reporter does not exist", () => {
    expect(() =>
      getPluginReporter(`plugin:this-plugin-does-not-exist`)
    ).to.throw("Could not find reporter plugin 'this-plugin-does-not-exist'");
  });

  it("returns false when it's not a plugin", () => {
    expect(getPluginReporter(`whatever-just-not-a-plugin`)).to.equal(false);
    expect(getPluginReporter()).to.equal(false);
  });

  it("returns the plugin module when it's valid and exists", () => {
    expect(
      getPluginReporter(
        `plugin:${path.join(FIXTURE_DIR, "./valid-non-functional-plugin")}`
      )()
    ).to.deep.equal({
      output: "some string",
      exitCode: 42,
    });
  });
});
