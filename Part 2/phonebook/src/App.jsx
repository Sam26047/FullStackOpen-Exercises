import { useState } from 'react'

const Filter = (props)=>{
  return(
    <p>
      filter shown with <input value={props.filter} onChange={props.onFilterChange}/>
    </p>
  )
}
const PersonForm = (props)=>{
  return(
      <form onSubmit={props.addPerson}>
        <div>
          name: <input value={props.name} onChange={props.onNameChange}/>
        </div>
        <div>
          number: <input value={props.number} onChange={props.onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}
const Person =({person})=>{
  return(
    <div key={person.name}>
      <p>
        {person.name}<br/>
        {person.number}
      </p>
    </div>  
  )
}
const Persons = ({persons,filter})=>{
  return(
    <div>
      {persons.map((person)=>{
        const regex = new RegExp(`^${filter}`);
        if(regex.test(person.name.toLowerCase())){
          return(
            <Person key={person.name} person={person}/>
          )
        }
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: "39-44-532532"
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]  = useState('')

  
  const addPerson = (event)=>{
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
      <Filter filter={filter} onFilterChange={handleFilterChange}/>
      <h2>Add new</h2>
      <PersonForm 
        name={newName}
        onNameChange={handleNameChange}
        number={newNumber}
        onNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App