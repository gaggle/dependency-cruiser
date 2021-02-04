const json5 = require("json5");

/**
 *
 * @param {import('../../../../types/dependency-cruiser').ICruiseResult} pCruiseResult
 * @return {string}
 */
function samplePluginReporter(pCruiseResult) {
  const lDependencyCounts = pCruiseResult.modules
    .map((pModule) => pModule.dependencies.length)
    .sort();

  return {
    moduleCount: pCruiseResult.summary.totalCruised,
    dependencyCount: pCruiseResult.summary.totalDependenciesCruised,
    minDependenciesPerModule: lDependencyCounts[0] || 0,
    maxDependenciesPerModule:
      lDependencyCounts[Math.max(lDependencyCounts.length - 1, 0)] || 0,
    meanDependenciesPerModule:
      pCruiseResult.summary.totalCruised /
      pCruiseResult.summary.totalDependenciesCruised,
    medianDependenciesPerModule:
      lDependencyCounts[
        Math.max(0, Math.floor(lDependencyCounts.length * 0.5))
      ],
    p75DependenciesPerModule:
      lDependencyCounts[
        Math.max(0, Math.floor(lDependencyCounts.length * 0.75))
      ],
  };
}

/**
 * Sample plugin
 *
 * @param {ICruiseResult} pCruiseResult - the output of a dependency-cruise adhering to dependency-cruiser's cruise result schema
 * @returns {IReporterOutput} - output: incidence matrix in csv format
 *                     exitCode: 0
 */
module.exports = (pCruiseResult) => ({
  output: JSON.stringify(samplePluginReporter(pCruiseResult), null, 2),
  exitCode: 0,
});
