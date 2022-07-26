const mongoose = require('mongoose')

const password = process.env.DB_PASS

const url = process.env.DB_URL

mongoose.connect(url).then(() => console.log('Connection established!')).catch((error) => console.log(error.message))

const contactSchema = new mongoose.Schema({
    name: {
      type: String,
      minLength: 3,
      required: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: true,
      validate: {
        validator: function(v) {
          return /\d{2,3}-\d{7,}/.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      },
    },
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