import React, { useState, useEffect } from 'react'
import {getEntries, addEntry, updateEntry, rmEntry} from './db_ops'
import './App.css'

const errMsg = (setError, msg) => {
  setError(msg)
  setInterval(() => {setError('')}, 5000)
}

const actionMsg = (setActMsg, msg) => {
  setActMsg(msg)
  setInterval(() => {setActMsg('')}, 5000)
}

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

const Persons = ({persons, setPersons, newSearch, setError, setActMsg}) => {
  let output = persons

  const handleDel = (id) => {
    rmEntry(id).then(_ => getEntries().then(phonebook => {
      setPersons(phonebook)
      actionMsg(setActMsg, 'Contact deleted')
    }))
  }

  if (newSearch !== '') {
    output = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  }
  return (
    <div>
      <h2>Numbers</h2>
      {output.map(person => (
        <div key={person.id}>
          <p>Name - {person.name}</p>
          <p>Phone - {person.number}</p>
          <button onClick={() => handleDel(person.id)}>Delete</button>
          <hr align="left" width="150" size="2" color="#ff0000" />
        </div>
      ))}
    </div>
  )
}

const AddContact = ({persons, setPersons, setError, setActMsg}) => {
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }

  const handlePhoneInput = (event) => {
    setNewNumber(event.target.value)
  }

  const handleAdd = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNumber
    }
    if (persons.some(val => val.name === personObj.name)) {
      if (window.confirm(`${newName} already exists, do you want to update number?`)) {
        const contact = persons.find(contact => contact.name === personObj.name)
        updateEntry(contact.id, personObj).then(_ => getEntries().then(phonebook => setPersons(phonebook)))
        actionMsg(setActMsg, 'Contact updated')
      }
    } else {
      addEntry(personObj).then(_ => {
        getEntries().then(phonebook => setPersons(phonebook))
        setNewName('')
        setNewNumber('')
        actionMsg(setActMsg, 'Contact added')
      })
    }
  }

  return (
    <form onSubmit={handleAdd}>
      <div>
        <h2>Add contacts</h2>
        <p>Name: <input value={newName} onChange={handleNameInput}/></p>
        <p>Phone: <input value={newNumber} onChange={handlePhoneInput}/></p>
        <button type="submit">Add</button>
      </div>
    </form>
  )
}

const ErrorMsg = ({error}) => {
  if (error) {
    return (
      <div className='error'>
        {error}
      </div>
    )
  }
}

const ActMsg = ({error}) => {
  if (error) {
    return (
      <div className='plate'>
        {error}
      </div>
    )
  }
}

const App = () => {
  const [newSearch, setSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [error, setError] = useState('')
  const [actionMsg, setActMsg] = useState('')
  useEffect(() => {
    getEntries()
    .then(phonebook => setPersons(phonebook))
    }, [])
  return (
    <div>
      <ErrorMsg error={error} />
      <ActMsg error={actionMsg} />
      <h1>Phonebook</h1>
      <Search newSearch={newSearch} setSearch={setSearch} />
      <Persons persons={persons} setPersons={setPersons} newSearch={newSearch} setError={setError} setActMsg={setActMsg}/>
      <AddContact persons={persons} setPersons={setPersons} setError={setError} setActMsg={setActMsg}/>
    </div>
  )
}

export default App