import { useState } from 'react'
const Date =(props) =>{
    return(
      <div>
        {props.text}{props.value}
      </div>
    )
  }
/* const Button = (props) =>{
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>  
    </div>
  )
  } */
  const App = () => {
    // guarda los clics de cada botón en su propio estado
{/* <Button onClick={addGood} text="good"></Button>
<Button onClick={addNeutral} text="Neutral"></Button>
<Button onClick={addBad} text="bad"></Button> */}
  
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const addGood = () =>{
      setGood(good+1)      
    }
    const addNeutral = () =>{
      setNeutral(neutral+1) 
    }
    const addBad = () =>{
      setBad(bad+1) 
    }
    return (  
    <div>
      <h1>give feeback</h1>
      <button onClick={addGood}>
        goog
      </button>
      <button onClick={addNeutral}>
        neutral
      </button>
      <button onClick={addBad}>
        bad
      </button>

      <h1>statistics</h1>
      <Date text="good " value={good}></Date>
      <Date text="neutral " value={neutral}></Date>
      <Date text="bad " value={bad}></Date>

    
    </div>
  )
}

export default App