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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

// app.get('/api/phonebook', (request, response) => {
//   mongoose.connect(url).then(() => Contact.find({}).then(contacts => {
//     response.json(contacts)
//   })).then(() => mongoose.connection.close())
// })

app.get('/api/phonebook', (request, response) => {
  Contact.find({}).then(contacts => {
    response.json(contacts)
  })
})

app.get('/api/phonebook/info', (request, response) => {
  Contact.find({}).then((phonebook) => response.json({info: `Phonebook has information about ${phonebook.length} people for ${ new Date()}`}))
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    Contact.findById(id).then((contact) => {
      if (contact) {
        response.json(contact)
      } else {
        response.status(404).end()
      }
    })
      .catch(() => response.status(500).end())
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = request.params.id
    Contact.findByIdAndDelete(id).then(() => response.status(204).end()).catch(() => response.status(404).end())
    
})

app.post('/api/phonebook/', (request, response) => {
  let err = {}
  if (!request.body.name) { 
    err.name = 'Name is missing'
  }
  if (!request.body.number) { 
    err.number = 'Number is missing'
  }
  // if (Contact.find(contact => contact.name === request.body.name).catch(()=>console.log('not found'))) {
  //   err.unique = 'Field Name is not unique'
  // }
  if (Object.keys(err).length !== 0) {
    return response.status(400).json(err)
  }
  const contactObj = new Contact({
    name: request.body.name,
    number: request.body.number,
  })
  
  contactObj.save().then((contact) => {response.json(contact)}).catch((error) => {console.log(error.message)})

  response.json(contactObj).status(201)
})

const unknownEdnpoint = (request, response) => {
  response.status(404).send({unknown: 'What is going on???'})
}

app.use(unknownEdnpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})