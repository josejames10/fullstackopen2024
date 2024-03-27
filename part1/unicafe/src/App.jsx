import { useState } from 'react'

const Statistics =(props) =>{
    return(
      <div>
        {props.text}{props.value}{props.porcentaje}
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

    const all = good+neutral+bad

    const average = ()=> {
      if(all==0){return 0}
      return (good-bad)/all}

    const positive = ()=> {
      if(all==0){return 0}
      return (good*100)/all}      

    return (  
    <div>
      <h1>give feeback</h1>
      <button onClick={addGood}>
        good
      </button>
      <button onClick={addNeutral}>
        neutral
      </button>
      <button onClick={addBad}>
        bad
      </button>

      <h1>statistics</h1>

      <Statistics text="good " value={good}></Statistics>
      <Statistics text="neutral " value={neutral}></Statistics>
      <Statistics text="bad " value={bad}></Statistics>
      <Statistics text="all " value={all}></Statistics>
      <Statistics text="average " value={average()}></Statistics>
      <Statistics text="positive " value={positive()} porcentaje="%"></Statistics>
    
    </div>
  )
}

export default App