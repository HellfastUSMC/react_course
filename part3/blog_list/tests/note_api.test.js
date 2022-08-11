const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app/app')
const { post } = require('../controller/blogs')
const Blog = require('../models/models')

const api = supertest(app)
const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogsArray = blogs.map(blog => new Blog(blog))
  const promiseArray = blogsArray.map(n_blog => n_blog.save())
  await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(blogs.length)
})

test('blogs are returned as json', async () => {
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

test('add valid blog test', async () => {
  const blog = 
  {
    title: "Go To Statement Considered Harmful test",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const response = (await api.get('/api/blogs')).body.map(cont => cont.title)

    expect(response).toHaveLength(blogs.length + 1)
    expect(response).toContain(blog.title)
}, 10000)

test('add invalid blog test', async () => {
  const blog = 
  {
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
    .expect('Content-Type', /application\/json/)

    const response = (await api.get('/api/blogs')).body.map(cont => cont.title)

    expect(response).toHaveLength(blogs.length)
}, 10000)

test('id to be defined', async () => {
  const blogs = (await api.get('/api/blogs')).body.map(blog => blog)
  expect(blogs[0].id).toBeDefined()
}, 10000)

afterAll(() => {
  mongoose.connection.close()
})