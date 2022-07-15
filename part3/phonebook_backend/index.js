const { response, request } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()

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

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/phonebook', (request, response) => {
  response.json(phonebook)
})

app.get('/api/phonebook/info', (request, response) => {
  response.json({info: `Phonebook has information about ${phonebook.length} people for ${ new Date()}`})
})

app.get('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = phonebook.find(contact => contact.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/phonebook/:id', (request, response) => {
    const id = Number(request.params.id)
    phonebook = phonebook.filter(contact => contact.id !== id)
    response.status(204).end()
})

app.post('/api/phonebook/', (request, response) => {
  console.log(request.body)
  let err = {}
  if (!request.body.name) { 
    err.name = 'Name is missing'
  }
  if (!request.body.number) { 
    err.number = 'Number is missing'
  }
  if (phonebook.find(contact => contact.name === request.body.name)) {
    err.unique = 'Field Name is not unique'
  }
  if (Object.keys(err).length !== 0) {
    return response.status(400).json(err)
  }
  const contactObj = request.body
  console.log(contactObj)
  const maxId = phonebook.length > 0
  ? Math.max(...phonebook.map(n => n.id)) 
  : 0

  contactObj.id = maxId + 1

  phonebook = phonebook.concat(contactObj)

  response.json(contactObj).status(201)
})

const unknownEdnpoint = (request, response) => {
  response.status(404).send({unknown: 'What is going on???'})
}

app.use(unknownEdnpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})