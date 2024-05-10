function createPrefixes (input: string) {
  const prefixes = []
  let prefix = ''
  for (const char of input.toLowerCase()) {
    prefix += char
    prefixes.push(prefix)
  }
  return prefixes
}

export default createPrefixes
