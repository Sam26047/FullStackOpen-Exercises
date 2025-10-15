import { useState,useEffect } from 'react'
import axios from 'axios'
import phonebookService from './services/persons'

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

const Person =({person,handleDelete})=>{
  return(
    <div key={person.name}>
      <p>
        {person.name} {person.number} &nbsp;
        <button onClick={()=>handleDelete(person.id,person.name)}>delete</button>
      </p>
    </div>  
  )
}

const Persons = ({persons,filter,handleDelete})=>{
  return(
    <div>
      {persons.map((person)=>{
        const regex = new RegExp(`^${filter}`);
        if(regex.test(person.name.toLowerCase())){
          return(
            <Person key={person.id} person={person} handleDelete={handleDelete}/>
          )
        }
      })}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [filter,setFilter]  = useState('')

  const hook = ()=>{
    phonebookService
      .getAll()
      .then(response=>{
        setPersons(response.data)
      })
  }
  useEffect(hook,[])
  
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
      phonebookService
        .createPerson(newPerson)
        .then(response=>{
          console.log(response)
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }
  const handleDelete = (id,name)=>{
    if(window.confirm(`Delete ${name} ?`)){
      phonebookService
        .deletePerson(id)
        .then(response=>{
          console.log(response)
          setPersons(persons.filter(p => p.id !==id))
        })
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
      <Persons persons={persons} filter={filter} handleDelete={handleDelete}/>
    </div>
  )
}

export default App