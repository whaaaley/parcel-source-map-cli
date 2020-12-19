
# parcel-source-map-cli
> Unofficial CLI for @parcel/source-map

This is a _super minimal_ CLI wrapper around [`@parcel/source-map`](https://github.com/parcel-bundler/source-map) to make it a bit easier to merge source maps together on the fly.

Make sure to give [`@parcel/source-map`](https://github.com/parcel-bundler/source-map) a star. The fact that a group of developers is finally working on a fast source map package with a decent API is amazing. Despite being in alpha, it's already game changing.

## Usage

If `stdin` is present it will be used as the primary source map.
If no `--out` flag is present then output is sent to `stdout`.

```sh
# simple usage
parcel-source-map --map foo.js.map --map bar.js.map --out app.js.map

# advanced usage
cat foo.js.map | parcel-source-map --map bar.js.map > app.js.map
```
