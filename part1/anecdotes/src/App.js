import { useState } from 'react'

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
]
  
const rating = {}

for (const [i, val] of anecdotes.entries()) {
  rating[i] = 0
}

const App = () => {
   
  const [selected, setSelected] = useState(0)

  const randState = () => {
    const rand_num = Math.floor(Math.random() * (anecdotes.length - 0) + 0)
    setSelected(rand_num)
  }

  const upVote = () => {
    rating[selected] = rating[selected] + 1
  }
  return (
    <div>
      <p>{anecdotes[selected]}</p>
      <p>Rating  - {rating[selected]}</p>
      <button onClick={randState}>New joke</button>
      <button onClick={upVote}>Upvote</button>
    </div>
  )
}

export default App