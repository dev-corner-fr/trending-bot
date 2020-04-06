function getExcerpt (str, limit = 140) {
  if (!str) return
  const lastWordIndex = str.lastIndexOf(' ', limit)
  return `${str.substr(0, lastWordIndex)}...`
}

module.exports = getExcerpt