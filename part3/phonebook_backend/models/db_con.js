const mongoose = require('mongoose')

const password = process.env.DB_PASS

const url = process.env.DB_URL

mongoose.connect(url).then(() => console.log('Connection established!')).catch((error) => console.log(error.message))

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Contact = mongoose.model('Contact', contactSchema)

module.exports = Contact