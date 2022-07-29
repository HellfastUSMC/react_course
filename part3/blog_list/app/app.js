const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('../controller/blogs')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

module.exports = app