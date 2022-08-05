const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app/app')
const Blog = require('../models/models')

const api = supertest(app)
const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(blogs[0])
  await blogObject.save()
  blogObject = new Blog(blogs[1])
  await blogObject.save()
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
})
  
test('the first note is about HTTP methods', async () => {
const response = await api.get('/api/blogs')

expect(response.body.map(blog => blog.author)).toContain('Michael Chan')
})

afterAll(() => {
  mongoose.connection.close()
})