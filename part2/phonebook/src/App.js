import React, { useState, useEffect } from 'react'
import {getEntries, addEntry, updateEntry, rmEntry} from './db_ops'
import './css/App.css'

const errMsg = (setError, msg) => {
  setError(msg)
  setInterval(() => {setError('')}, 5000)
}

const actionMsg = (setActMsg, msg) => {
  setActMsg(msg)
  setInterval(() => {setActMsg('')}, 5000)
}

const contactsRefresh = (setPersons) => {
  getEntries().then(phonebook => {setPersons(phonebook)})
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

  const handleDel = (person) => {
    rmEntry(person.id)
      .then(_ => {
        contactsRefresh(setPersons)
        actionMsg(setActMsg, `Contact ${person.name} deleted`)
        }
      )
      .catch(_ => {
        contactsRefresh(setPersons)
        errMsg(setError, `Contact ${person.name} already removed`)
        }
      )
  }

  if (newSearch !== '') {
    output = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()))
  }
  if (persons){
    return (
      <>
        <h2>Numbers</h2>
        <div className='phonebook'>
          {output.map(person => (
            <div className='contact' key={person.id}>
              <p>Name - {person.name}</p>
              <p>Phone - {person.number}</p>
              <button onClick={() => handleDel(person)}>Delete</button>
              <hr/>
            </div>
          ))}
        </div>
      </>
  )} else {
    return (
      <p>
        <img width={150} src={require('./loading.gif')} alt='loading' />
      </p>
    )
  }
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
        updateEntry(contact.id, personObj)
          .then(_ => {
            contactsRefresh(setPersons)
            actionMsg(setActMsg, `Contact ${personObj.name} updated`)
            setNewName('')
            setNewNumber('')
            }
          )
          .catch(error => {
            contactsRefresh(setPersons)
            errMsg(setError, `Cannot update a contact ${personObj.name} - ${error.response.data.error}`)
            }
          )
      }
    } else {
      addEntry(personObj)
        .then(_ => {
        contactsRefresh(setPersons)
        actionMsg(setActMsg, `Contact ${personObj.name} added`)
        setNewName('')
        setNewNumber('')
        }
      )
        .catch(error => {
          console.log(error, error.message)
          errMsg(setError, `Cannot add a contact - ${error.response.data.error}`)
        })
    }
  }

  return (
    <>
      <h2>Add contacts</h2>
      <form onSubmit={handleAdd}>
        <div className='add-contact'>
          <p>Name: <input value={newName} onChange={handleNameInput}/></p>
          <p>Phone: <input value={newNumber} onChange={handlePhoneInput}/></p>
          <button type="submit">Add</button>
        </div>
      </form> 
    </>
  )
}

const ErrorMsg = ({msg}) => {
  if (msg) {
    return (
      <div className='error'>
        {msg}
      </div>
    )
  }
}

const ActMsg = ({msg}) => {
  if (msg) {
    return (
      <div className='plate'>
        {msg}
      </div>
    )
  }
}

const App = () => {
  const [newSearch, setSearch] = useState('')
  const [persons, setPersons] = useState()
  const [error, setError] = useState('')
  const [actionMsg, setActMsg] = useState('')
  useEffect(() => {
      contactsRefresh(setPersons)
    }, [])
  return (
    <div>
      <ErrorMsg msg={error} />
      <ActMsg msg={actionMsg} />
      <h1>Phonebook</h1>
      <Search newSearch={newSearch} setSearch={setSearch} />
      <Persons persons={persons} setPersons={setPersons} newSearch={newSearch} setError={setError} setActMsg={setActMsg}/>
      <AddContact persons={persons} setPersons={setPersons} setError={setError} setActMsg={setActMsg}/>
    </div>
  )
}

export default App