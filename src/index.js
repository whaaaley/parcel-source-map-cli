#!/usr/bin/env node

const fs = require('fs')
const rl = require('readline').createInterface({ input: process.stdin })
const SourceMap = require('@parcel/source-map').default
const args = require('./parse-argv')(process.argv)

let stdin = ''
rl.on('line', data => stdin += data)
rl.close()

const map = args['--map']
const out = args['--out']

const paths = Array.isArray(map) ? map : [map]
const sourceMap = new SourceMap()

if (stdin !== '') {
  const data = JSON.parse(stdin)
  sourceMap.addRawMappings(data)
}

for (let i = 0; i < paths.length; i++) {
  const file = fs.readFileSync(paths[i])
  const data = JSON.parse(file)
  sourceMap.addRawMappings(data)
}

const output = async () => {
  const data = await sourceMap.stringify()

  if (typeof out === 'string') {
    fs.writeFileSync(out, data)
  } else {
    process.stdout.write(data)
  }
}

output()
