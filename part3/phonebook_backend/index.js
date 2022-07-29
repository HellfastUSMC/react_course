// import { Contact } from './db_con'
//import {PASSWORD} from './.env'
require('dotenv').config()
const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Contact = require('./models/db_con')


app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('req_data', function(req, res) { return 'req: ' + JSON.stringify(req.body)})
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.req_data(req, res)
  ].join(' ')
}))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: `validation error - ${error.message}` })
  }

  next(error)
}

const unknownEdnpoint = (request, response) => {
  response.status(404).send({ unknown: 'What is going on???' })
}

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/phonebook/info', (request, response) => {
  Contact.find({}).then((phonebook) => response.json({ info: `Phonebook has information about ${phonebook.length} people for ${new Date()}` }))
})

app.get('/api/phonebook/:id', (request, response, next) => {
  const id = request.params.id
  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/phonebook/:id', (request, response, next) => {
  const id = request.params.id
  const upd_contact = {
    name: request.body.name,
    number: request.body.number
  }
  Contact.findByIdAndUpdate(id, upd_contact, { new: true, runValidators: true, context: 'query' })
    .then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/phonebook/:id', (request, response) => {
  const id = request.params.id
  Contact.findByIdAndDelete(id).then(() => response.status(204).end()).catch(() => response.status(404).end())
})

app.post('/api/phonebook/', (request, response, next) => {
  const contactObj = new Contact({
    name: request.body.name,
    number: request.body.number,
  })
  contactObj.save().then((contact) => {response.json(contact).status(201)}).catch((error) => next(error))
})

app.use(unknownEdnpoint)
app.use(errorHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})