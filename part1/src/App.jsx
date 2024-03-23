import { useState } from 'react'

const Display = ({counte}) => <div>{counte}</div>  


const Button = (prosp) => {
  return (<button onClick={prosp.onClick}>{prosp.text}</button>)
}

const App = () => {

  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter+1)

  const decreaseByOne = () => setCounter(counter-1)

  const setToZero = () => setCounter(0)
  

  return (
    <div>
    <Display counte={counter} />
    <Button onClick={increaseByOne} text="plus"/>
    <Button onClick={decreaseByOne} text="minus"/>
    <Button onClick={setToZero} text="zero"/>

    </div>
  )
}

export default App