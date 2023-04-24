import { useState } from "react";

const Button = ({ name, onClick }) => {
  return <button onClick={onClick}>{name}</button>;
};

const Stats = ({values}) => {
  if (values.all === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Line name='good' value={values.good} />
      <Line name='bad' value={values.bad} />
      <Line name='neutral' value={values.neutral} />
    </>
  )
};

const Line = ({name, value}) => {
  return <p>{name} {value}</p>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good + neutral + bad;

  return (
    <div>
      <p>Give feedback</p>
      <Button name="good" onClick={() => setGood(good + 1)} />
      <Button name="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setBad(bad + 1)} />

      <p>statistics</p>
      {/* <Stats name='good' value={good}/>
      <Stats name='neutral' value={neutral}/>
      <Stats name='bad' value={bad}/>
      <Stats name='all' value={all}/>
      <Stats name='positive' value={good / all}/> */}
      <Stats values={{ good: good, bad: bad, neutral: neutral, all: all }} />
    </div>
  );
};

export default App;
