import { useState } from 'react'

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

  const [votes, setVotes] = useState(new Array(8).fill(0));
  const [selected, setSelected] = useState(0)

  const maxVotes = Math.max(...votes);
  const maxAnecdote = anecdotes[votes.indexOf(maxVotes)];

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const clickHandle = () => {
    return setSelected(getRandomInt(anecdotes.length));
  }

  const voteHandle = () => {
    const newArr = [...votes];
    newArr[selected] += 1;
    setVotes(newArr)
  }

  return (
    <>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteHandle}>vote</button>
      <button onClick={clickHandle}>next anecdote</button>

      <h2>Anecdote with most votes</h2>
      <p>{maxAnecdote}</p>
      <p>{maxVotes}</p>
    </>
  )
}

export default App
