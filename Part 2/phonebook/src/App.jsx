import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "39-44-532532"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]  = useState('')

  
  const addName = (event)=>{
    event.preventDefault()
    const newPerson  ={
      name:newName,
      number:newNumber
    }
    if(persons.some((person)=>((person.name===newPerson.name)&&(person.number===newPerson.number)))){
      window.alert(`${newPerson.name} ${newPerson.number} is already added to phonebook`)
    }
    else{
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }

  }

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }
  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }
  const handleFilterChange= (event)=>{
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} onChange={handleFilterChange}/>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person)=>{
        const regex = new RegExp(`^${filter}`);
        if(regex.test(person.name.toLowerCase())){
          return(
          <div key={person.name}>
            <p>
              {person.name}<br />
              {person.number}
            </p>
          </div>          
        )
        }
      })}
    </div>
  )
}

export default App