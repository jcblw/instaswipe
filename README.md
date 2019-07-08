# Instaswipe

This is right now a `cli` tool and javascript api to be able to generate "swipable" images for [Instagram](https://www.instagram.com).

[example post](https://www.instagram.com/p/BzqhFekFptS/?utm_source=ig_web_copy_link)

> Requires > Nodejs 10

## Usage

```shell
npx instaswipe IMG_9881.jpg
```

This should create two images to be create a swipable post on Instagram.

### Javascript api

```javascript
import makeSwipeableImages from 'instaswipe'


...
// resolves an array of image buffers
const images = await makeSwipeableImages({
  buffer, // image buffer of image to make swipable images from,
  frames, // amount of frames to create, two is default
  ratio, // ratio of outputted image. 0.8 is default or 4/5
})
...
```
