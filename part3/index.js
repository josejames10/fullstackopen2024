const express = require('express')
const app = express()

app.use(express.json())

let persons=[
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
  response.json(persons)
}) 
app.get('/api/persons/:id', (request, response) => {
    const id =Number(request.params.id)
    const person = persons.find(e=> e.id === id )
    console.log(person);
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
    const name=persons.filter(e=>e.name===body.name)
    const number=persons.filter(e=>e.number===body.number)
    if (name || number) {
      return response.status(400).json({
        error: 'name must be unique'
      })
    } 
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    }
    

    persons = persons.concat(person)
    response.json(person)
  })
  
  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.filter(persons => persons.id !== id)
//    persons=person
      
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})