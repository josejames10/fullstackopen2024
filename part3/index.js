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
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
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
    console.log(body);
    if (!body.content) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    }
  
    const person = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: generateId(),
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})