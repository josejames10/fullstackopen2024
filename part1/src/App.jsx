import { useState } from 'react'

const Display = ({counte}) => <div>{counte}</div>  


const Button = (prosp) => {
  return (<button onClick={prosp.onClick}>{prosp.text}</button>)
}

const App = () => {

  const [ left, setLeft ] = useState(0)
  const [ right, setRight] = useState(0)
  const [ allClicks, setAll] = useState([]) 
  const [ total, setTotal] = useState(0)

  const handleLeftClick = () =>{
      setAll(allClicks.concat('L'))
      setLeft(left + 1)
      console.log(left)
      setTotal(left + right)
      console.log(left)
  }

  const handleRightClick = () => {
      setAll(allClicks.concat('R'))
      setRight(right + 1)
      setTotal(right + left)
  }
    return (

    <div>
    {left}
    <Button onClick={handleLeftClick} text="Left"/>
    <Button onClick={handleRightClick} text="Right"/>
    {right}
    <p>{allClicks.join(' ')}</p>
    <p>total {total}</p>

    </div>
  )
}

export default App