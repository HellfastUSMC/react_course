const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('../controller/blogs')
const err_handler = require('../middleware/err_handler')

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use(err_handler)

module.exports = app