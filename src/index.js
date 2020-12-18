#!/usr/bin/env node

const fs = require('fs')
const SourceMap = require('@parcel/source-map').default
const args = require('./parse-argv')(process.argv)

const cli = () => {
  // collect paths
  const map = args['--map']
  let paths = []

  if (Array.isArray(map) === true) {
    paths = paths.concat(map)
  } else if (typeof map === 'string') {
    paths.push(map)
  } else {
    return console.log('Invalid --map flag. Aborting...')
  }

  // collect source maps
  const files = process.stdin ? [process.stdin] : []

  for (let i = 0; i < paths.length; i++) {
    const file = fs.readFileSync(paths[i])
    const data = JSON.parse(file)
    files.push(data)
  }

  // sadge
  if (files.length < 2) {
    return console.log('Too few source maps. Aborting...')
  }

  // merge the source maps
  const sourceMap = new SourceMap()

  for (let i = 0; i < files.length; i++) {
    sourceMap.addRawMappings(files[i])
  }

  const data = sourceMap.stringify()

  // output the source map
  const out = args['--out']

  if (typeof out === 'string') {
    console.log('Writing to', out, '...')
    fs.writeFileSync(out, data)
  } else {
    console.log('No --out flag. Writing to stdout...')
    process.stdout.write(data)
  }
}

cli()
