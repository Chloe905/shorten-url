
function generateUrl() {
  const lowerCaseLetter = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetter = lowerCaseLetter.toUpperCase()
  const number = '0123456789'

  // create a collection to store all individual letter
  const collection = [...lowerCaseLetter].concat([...upperCaseLetter], [...number])

  // start generating url string
  let url = ''
  for (let i = 0; i < 5; i++) {
    const index = Math.floor(Math.random() * collection.length)
    url += collection[index]
  }

  // return the generated url
  console.log(`The generate url is : ${url}`)
  return url
}

module.exports = generateUrl
