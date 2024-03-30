import { useState } from 'react'

const Headers = ({texto}) => (
  <h1>{texto}</h1>
)

const Button = ({handleClick, text}) =>(
  <button onClick={handleClick} >{text}</button>
)

const Anecdote = ({anecdotes}) =>(
  <div>{anecdotes}</div>
)

const Votes = ({value}) =>(
  <div>has {value} votes</div>
)

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [voto, setVoto] = useState(Array(anecdotes.length).fill(0))
  
  const nexAnecdote = () =>{
    const x = Math.floor(Math.random()*anecdotes.length)
    setSelected(x)
  }
 
  const handleVoto = () =>{
    const copy = [ ...voto]
    copy[selected] += 1
    setVoto(copy)
  }

  const maxVoto=voto.indexOf(Math.max(...voto))
  const max=Math.max(...voto)
  const all=voto.reduce((a,b) => a+b)
  
  return (
    <div>
      <Headers texto="Anecdote of the day"></Headers>
      <Anecdote anecdotes={anecdotes[selected]}></Anecdote>
      <Votes value={all}></Votes>
      <Button handleClick={nexAnecdote} text="nex anecdote"></Button>
      <Button handleClick={handleVoto} text="vote"></Button>
      <Headers texto="Anecdote with most votes"></Headers>
      <Anecdote anecdotes={anecdotes[maxVoto]}></Anecdote>
      <Votes value={max}></Votes>
    </div>
  )
}


export default App
