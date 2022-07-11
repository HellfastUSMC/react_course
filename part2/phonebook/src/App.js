import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({newSearch, setSearch}) => {
  const handleSearch = (event) => {
    setSearch(event.target.value)
  }
  return (
    <>
      <h2>Search</h2>
      <input value={newSearch} onChange={handleSearch}/>
    </>
  )
}

const Persons = ({persons, newSearch}) => {
  let pers_id = 0
  let output = persons
  if (newSearch !== '') {
    output = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  }
  return (
    <div>
      <h2>Numbers</h2>
      {output.map(person => <div key={pers_id += 1}><p>Name - {person.name}</p><p>Phone - {person.number}</p><hr align="left" width="150" size="2" color="#ff0000" /></div>)}
    </div>
  )
}

const AddContact = ({persons, setPersons}) => {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) => {
    setNewPhone(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      phone: newPhone
    }
    if (persons.some(val => val.name === personObj.name)) {
      window.alert(`${newName} already exists!`)
    } else {
      setPersons(persons.concat(personObj))
    }
  }
  return (
    <form onSubmit={handleAdd}>
      <div>
        <h2>Add contacts</h2>
        <p>name: <input value={newName} onChange={handleNameInput}/></p>
        <p>phone: <input value={newPhone} onChange={handlePhoneInput}/></p>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {

  const [newSearch, setSearch] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
        })
    }, [])

  return (
    <div>
      <h1>Phonebook</h1>
      <Search newSearch={newSearch} setSearch={setSearch}/>
      <Persons persons={persons} newSearch={newSearch}/>
      <AddContact persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App