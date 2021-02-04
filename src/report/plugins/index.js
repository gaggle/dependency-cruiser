const has = require("lodash/has");

function isValidPlugin(pPluginFunction) {
  let lReturnValue = false;
  const lMinimalCruiseResult = { modules: [], summary: {} };

  if (typeof pPluginFunction === "function") {
    const lTestReportOutput = pPluginFunction(lMinimalCruiseResult);
    lReturnValue =
      has(lTestReportOutput, "output") &&
      has(lTestReportOutput, "exitCode") &&
      typeof lTestReportOutput.exitCode === "number";
  }
  return lReturnValue;
}

/**
 *
 * @param {string} pOutputType
 */
function getPluginReporter(pOutputType) {
  let lReturnValue = false;
  const lPluginPatternRE = /^plugin:([^:]+)$/;
  const lPluginMatch = (pOutputType || "").match(lPluginPatternRE);

  if (Boolean(lPluginMatch)) {
    const lPluginName = lPluginMatch[1];
    try {
      // eslint-disable-next-line import/no-dynamic-require, node/global-require, security/detect-non-literal-require
      lReturnValue = require(lPluginName);
    } catch (pError) {
      throw new Error(`Could not find reporter plugin '${lPluginName}'`);
    }
    if (!isValidPlugin(lReturnValue)) {
      throw new Error(`${lPluginName} is not a valid plugin`);
    }
  }
  return lReturnValue;
}

module.exports = {
  isValidPlugin,
  getPluginReporter,
};
