const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = 'Scuko123' //process.argv[2]

const url = `mongodb+srv://hell:${password}@react-course.92l5q.mongodb.net/?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const Contact = mongoose.model('Contact', contactSchema)

export {Contact}