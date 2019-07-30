require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('data', function getData(req, res) {
  return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))
app.use(morgan(function (tokens, req, res) {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.data(req, res)
    ].join(' ')
  }
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}, {
  function(req, res) {
    return req.params
  }
}))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(person => {
      res.json(person)
    })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Person.countDocuments({})
    .then(length => {
      res.send(
        `<div>Phonebook has info for ${length} people</div>
        <br />
        <div>${new Date()}</div>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (body.number.length < 8) {
    return next({ name: 'InvalidLength', message: `minimum length required for the number is 8 (curr length: ${body.number.length})` })
  }

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return next({ name: 'MissingName', message: 'name missing in the request' })
  }
  else if (!body.number) {
    return next({ name: 'MissingNumber', message: 'number missing in the request' })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      res.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'MissingName') {
    return res.status(400).json({ error: 'name missing' })
  } else if (error.name === 'MissingNumber') {
    return res.status(400).json({ error: 'number missing' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error.name === 'InvalidLength') {
    return res.status(400).json({ error: error.message })
  } else {
    res.status(404).end()
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
