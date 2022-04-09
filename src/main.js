const R = require("ramda");
const fs = require("fs");

/**
 * Receive a file name and return a content file
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
 *
 * @param {string} line
 * @returns
 */
const getKeys = (line) => R.head(R.split("=", line));

/**
 *
 * @param {string} dataFile
 */
const dataFileToKey = (dataFile) => R.split("\n", getKeys(dataFile));
// R.pipe(getKeys, R.curry(R.split("\n")));

/**
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
 * @param {string} fileName1
 * @param {string} fileName2
 * @returns
 */
const main = async (fileName1, fileName2) => {
  const file1 = await readFile(fileName1);
  if (!file1.ok) {
    return file1.result;
  }

  const file2 = await readFile(fileName2);
  if (!file2.ok) {
    return file2.result;
  }

  return compareKeys(dataFileToKey(file1.result), dataFileToKey(file2.result));
};

module.exports = main;
