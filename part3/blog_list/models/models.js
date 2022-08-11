const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: {type: String, required: [true, 'title field is required']},
    author: {type: String, required: [true, 'author field is required']},
    url: {type: String, required: [true, 'url field is required']},
    likes:  {type: Number, required: [true, 'likes field is required']}
  })
  
  const Blog = mongoose.model('Blog', blogSchema)

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })
  const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.DB_URL : process.env.DB_TEST_URL
  mongoose.connect(mongoUrl)

  module.exports = Blog