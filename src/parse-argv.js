
module.exports = argv => {
  const target = {}

  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i]
    const value = argv[i + 1]
    const targetValue = target[key]

    if (value[0] === '-') {
      target[key] = true
      i-- // decrement index
      continue // next iteration
    }

    if (targetValue === undefined) {
      target[key] = value
      continue // next iteration
    }

    if (Array.isArray(targetValue) === false) {
      target[key] = [targetValue]
    }

    target[key].push(value)
  }

  return target
}
