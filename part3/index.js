const express = require('express')
const app = express()
app.use(express.static('dist'))
app.use(express.json())
var morgan= require('morgan')
const Person = require('./models/person')

/* let persons=[ 
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
] */
const cors = require('cors')

app.use(cors())
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

morgan.token('body', function (req, res) { return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :response-time ms  :body '))

const generateId = () => {
  const Id = Math.floor(Math.random()*10000)
  return Id
}
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  let length= persons.length.toString()
  let data=new Date()
  response.send(`Phonebook has info for ${length} people<br/>${data.toString()}`)
})

app.get('/api/persons', (request, response) => {
  console.log("Pesons:+++++++",Person)
  Person.find({}).then(p => {
    response.json(p)
  })
}) 

app.get('/api/persons/:id', (request, response) => {
  const id =Number(request.params.id)
  const person = persons.find(e=> e.id === id )
  if(!person){
    response.status(404).end()
  }
  response.json(person)
  
})

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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
    const person = persons.filter(persons => persons.id !== id)
      persons=person
    
    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})