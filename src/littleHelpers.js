
// jus what the name implies; a bunch of little helper functions too small for their own files
const seperator = () => console.log("=========================================================")

// capitalize word. take first letter, uppercase it, add the rest of the word starting at pos 1
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1)

// make array of words split by space, for each word run capitalize function, then join array back with spaces
const capitalizeAll = (sentance) => sentance.split(' ').map(word => capitalize(word)).join(' ')

module.exports = { seperator, capitalize, capitalizeAll }