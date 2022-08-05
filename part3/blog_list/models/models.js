const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  console.log(process.env.DB_URL)
  const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.DB_URL : process.env.DB_TEST_URL
  mongoose.connect(mongoUrl)

  module.exports = Blog