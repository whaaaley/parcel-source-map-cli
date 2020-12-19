#!/usr/bin/env node

const fs = require('fs')
const readline = require('readline')
const SourceMap = require('@parcel/source-map').default
const args = require('./parse-argv')(process.argv)

const map = args['--map']
const out = args['--out']

let stdin = ''
const rl = readline.createInterface({ input: process.stdin })
rl.on('line', data => stdin += data)

const paths = Array.isArray(map) ? map : [map]
const files = stdin === '' ? [] : [JSON.parse(stdin)]
const sourceMap = new SourceMap()

for (let i = 0; i < paths.length; i++) {
  const file = fs.readFileSync(paths[i])
  const data = JSON.parse(file)
  files.push(data)
}

if (files.length < 1) {
  console.log('Too few source maps. Exiting...')
  process.exit()
}

for (let i = 0; i < files.length; i++) {
  sourceMap.addRawMappings(files[i])
}

const go = async () => {
  const data = await sourceMap.stringify()

  if (typeof out === 'string') {
    console.log('Writing to', out)
    fs.writeFileSync(out, data)
  } else {
    // No --out flag. Writing to stdout...
    process.stdout.write(data)
  }
}

go()
