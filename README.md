
# parcel-source-map-cli
> Unofficial CLI for @parcel/source-map

This is a simple CLI wrapper around [`@parcel/source-map`](https://github.com/parcel-bundler/source-map).
All you can do is merge source maps. Great for minimal builds.

Tested only with `tsc` and `esbuild` generated source-maps. Your mileage may vary.

## Usage

If `stdin` is present it will be used as the primary source map.
If no `--out` flag is present then output is sent to `stdout`.

```sh
# simple usage
parcel-source-map --map foo.js.map --map bar.js.map --out app.js.map

# advanced usage
cat foo.js.map | parcel-source-map --map bar.js.map > app.js.map
```
