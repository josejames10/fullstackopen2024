const express = require('express')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
var morgan= require('morgan')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms  :body '))
app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.name) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  /* let name=Person.filter(e=>e.name===body.name)
  let number=Person.filter(e=>e.number===body.number)
  console.log(name.length)
  if (name.length)  {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  if(number.length) {
    return response.status(400).json({
      error: 'number must be unique'
    })
  } */
  const person =new Person( {
    name: body.name,
    number: body.number
  })
  person.save().then(personSaved=>{
    response.json(personSaved)
  })
})


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  let length= persons.length.toString()
  let data=new Date()
  response.send(`Phonebook has info for ${length} people<br/>${data.toString()}`)
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(p => {
    response.json(p)
  })
}) 

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error=>next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result=>{
      response.status(204).end()
    })
    .catch(error => next(error))
})
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
app.put('/api/persons/:id',(request, response, next)=>{
  const body = request.body

  const person ={
    name:body.name,
    number:body.number
  }
  Person.findByIdAndUpdate(request.params.id, person, {new:true})
  .then(updatedPerson =>{
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})