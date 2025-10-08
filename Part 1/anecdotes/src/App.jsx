import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState({
    anecdote:0,
    votes:new Array(anecdotes.length).fill(0),
  })

  function handleClick(){
    const num = Math.floor(Math.random()*8)
    
    setSelected({...selected,
      anecdote:num
    })
  }
  function handleVote(){
    const votes = {...selected}
    votes.votes[selected.anecdote]+=1
    setSelected(votes)
    console.log(selected.votes)
  }
  function maxVote(){
    const votes=selected.votes
    let max=0
    for(let i=0;i<anecdotes.length-1;i++){
      if(votes[i]>votes[max]) max=i
    }
    return anecdotes[max]
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected.anecdote]}</p>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>next anecdote</button>

      <h1>Anecdote with most votes</h1>
      <p>{maxVote()}</p>
    </div>

  )
}

export default App