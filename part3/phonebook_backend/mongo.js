const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://hell:${password}@react-course.92l5q.mongodb.net/?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
})
const dummy = () => {
    return console.log('a')
}
const Contact = mongoose.model('Contact', contactSchema)
// console.log(process.argv)
mongoose
  .connect(url)
  .then(() => {
    console.log('connected')
    if (process.argv.length === 4) {
    const contact = new Contact({
      name: process.argv[3],
      number: process.argv[4]
        
    })
    return contact.save()
    }

  })
  .then(() => {
    if (process.argv.length === 4) {
    console.log(`contact ${process.argv[3]} ${process.argv[4]} saved!`)
    }
    Contact.find({}).then(result => {
        result.forEach(contact => {
          console.log(contact)
        })
      })
      .then(() => {
        mongoose.connection.close()
    })
  })
  .catch((err) => console.log(err))