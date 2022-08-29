const blogsRouter = require('express').Router()
const Blog = require('../models/models')

// blogsRouter.get('', async (request, response) => {
//   await Blog
//     .find({})
//     .then(blogs => {
//       response.json(blogs)
//     })
// })

//get
blogsRouter.get('', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//get specific
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog)
})

//post
blogsRouter.post('', async (request, response, next) => {
  const blog = new Blog(request.body)
  await blog.save()
  response.status(201).json(blog)
})

//patch
blogsRouter.patch('/:id', async (request, response, next) => {
  let u_blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { returnDocument: 'after' })
  response.status(200).json(u_blog)
})

//delete
blogsRouter.delete('/:id', async (request, response, next) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204)
})

module.exports = blogsRouter