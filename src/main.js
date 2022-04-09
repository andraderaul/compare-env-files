const core = require("@actions/core");
const R = require("ramda");
const fs = require("fs");

/**
 * Receives a file name and return a content file or an error.
 *
 * @param {string} fileName
 */
const readFile = async (fileName) => {
  try {
    const data = fs.readFileSync(fileName, "utf8");
    return {
      ok: true,
      result: data,
    };
  } catch (err) {
    return {
      ok: false,
      result: err,
    };
  }
};

/**
 * Receives a string with `=` and
 * return a sub string before the `=`.
 *
 * @param {string} line
 * @returns
 */
const getKeys = (line) => R.head(R.split("=", line));

/**
 * Receives a string with `\n` and
 * return an new array of the string split by `\n`.
 *
 * @param {string} text
 * @returns
 */
const getLines = (text) => R.split("\n", text);

/**
 * Receives a string with key value and return a
 * new array with only keys sorted by lexicography
 *
 * @param {string} fileEnv
 */
const fileEnvToKey = (fileEnv) =>
  R.sort(
    R.comparator((a, b) => a < b),
    R.map(getKeys, getLines(fileEnv))
  );

/**
 * Receives two array and return true
 * if their are equals or false when their aren't
 *
 * @param {string[]} keys1
 * @param {string[]} keys2
 */
const compareKeys = (keys1, keys2) =>
  R.all(
    R.equals(true),
    R.zipWith((x, y) => x === y, keys1, keys2)
  );

/**
 *
 * @param {string | undefined} firstEnv
 * @param {string | undefined} secondEnv
 * @returns
 */
const main = async (firstEnv, secondEnv) => {
  const fileName1 = core.getInput("firstEnv") || firstEnv;
  const fileName2 = core.getInput("secondEnv") || secondEnv;

  const file1 = await readFile(fileName1);
  if (!file1.ok) {
    core.setFailed(file1.result);
    return file1.result;
  }

  const file2 = await readFile(fileName2);
  if (!file2.ok) {
    core.setFailed(file2.result);
    return file2.result;
  }

  const result = compareKeys(
    fileEnvToKey(file1.result),
    fileEnvToKey(file2.result)
  );

  if (result) {
    core.setOutput("result", `Done`);
  } else {
    core.setFailed("The env keys are not equal");
  }

  return result;
};

module.exports = main;
