const blogsRouter = require('express').Router()
const Blog = require('../models/models')

// blogsRouter.get('', async (request, response) => {
//   await Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('', async (request, response, next) => {
  const blog = new Blog(request.body)
  await blog.save()
  response.status(201).json(blog)
})

module.exports = blogsRouter