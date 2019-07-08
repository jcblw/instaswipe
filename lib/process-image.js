const Drawable = require("drawable").default;
const { promisify } = require("util");
var sizeOf = require("buffer-image-size");

// ratio 4/5 is default
const makeSwipeableImages = async ({ buffer, frames = 2, ratio = 0.8 }) => {
  const { width, height } = sizeOf(buffer);
  if (height >= width) {
    throw new Error("Image must be landscape image");
  }
  const imagesWidth = width / frames;
  const imagesHeight = imagesWidth / ratio;
  if (height < imagesHeight) {
    throw new Error("Image does not have enough height");
  }

  const images = [];
  for (let i = 0; i < frames; i++) {
    images.push(
      await makeImageFrame({
        buffer,
        width,
        height,
        imagesWidth,
        imagesHeight,
        frame: i,
        ratio
      })
    );
  }
  return images;
};

const makeImageFrame = async ({
  width,
  height,
  imagesWidth,
  imagesHeight,
  frame,
  ratio,
  buffer
}) => {
  const drawable = new Drawable({
    width: imagesWidth,
    height: imagesHeight,
    backgroundColor: "white"
  });
  const image = Drawable.image(buffer, {
    top: (height - imagesHeight) * -1,
    left: imagesWidth * frame * -1,
    width,
    height
  });
  await drawable.append(image);
  return drawable.toBuffer("image/jpeg");
};

module.exports = { makeSwipeableImages };
