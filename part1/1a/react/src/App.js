import {useState} from 'react';

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <p>Give feedback</p>

      <p>Statistics</p>
    </div>
  )
}

export default App;
