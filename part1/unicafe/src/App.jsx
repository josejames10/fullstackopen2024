import { useState } from 'react'

const StatisticsLine =(props) =>{
  return(
    <tr>
      <th>{props.text}</th> 
      <th>{props.value}</th>
    </tr>

  )
}
const Statistics =({good,neutral,bad}) =>{

  const all = good+neutral+bad  

  const average = ()=> {
    if(all==0){return 0}
    return (good-bad)/all}
  
  const positive = ()=> {
    if(all==0){return 0}
    return (good*100)/all}      

  if (all==0){
      return(<div>no feedback given</div>)
    }

    return(
      <div>
        <table>
            <tbody>
             <StatisticsLine text="good" value={good}></StatisticsLine>
             <StatisticsLine text="neutral" value={neutral}></StatisticsLine>
             <StatisticsLine text="bad" value={bad}></StatisticsLine>
             <StatisticsLine text="all" value={all}></StatisticsLine>
             <StatisticsLine text="average" value={average()} ></StatisticsLine>
             <StatisticsLine text="positive" value={`${parseFloat(positive())} %`}></StatisticsLine>
          </tbody>
        </table>
      </div>
    )
  }

  const Button = (props) =>{
   return (
      <button onClick={props.onClick}>{props.text}</button>  
  )
  }
  const App = () => {
  
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

      <Button onClick={addGood} text="good"></Button>
      <Button onClick={addNeutral} text="Neutral"></Button>
      <Button onClick={addBad} text="bad"></Button>
      
      <h1>statistics</h1>

      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>

    </div>
  )
}

export default App