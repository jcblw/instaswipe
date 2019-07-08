const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const getExtension = filepath => path.extname(filepath);
const getFileName = filepath => {
  const ext = getExtension(filepath);
  return [path.basename(filepath, ext), ext];
};

const read = promisify(fs.readFile);
const write = promisify(fs.writeFile);

module.exports = { read, write, getFileName };
