#!/usr/bin/env node

const { makeSwipeableImages, getImageBuffer } = require("../lib/process-image");
const { write, read, getFileName } = require("../lib/file");
const path = require("path");

// TODO: support more options
const filearg = process.argv[2];

(async filepath => {
  const buffer = await read(filepath);
  const fileName = getFileName(filepath);
  console.log(`Creating swipable image for ${fileName[0]}${fileName[1]}`);
  const images = await makeSwipeableImages({ buffer });
  await Promise.all(
    images.map((buffer, i) => {
      const newfilepath = path.resolve(
        process.cwd(),
        `./${fileName[0]}_${i + 1}${fileName[1]}`
      );
      console.log(`Writing ${newfilepath}`);
      return write(newfilepath, buffer);
    })
  );
  console.log("Finished successfully");
})(filearg);
