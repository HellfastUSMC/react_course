import { useState } from 'react'
const Persons = ({persons}) => {
  let pers_id = 0
  const output = persons.map(person => <div key={pers_id += 1}><p>Name - {person.name}</p><p>Phone - {person.phone}</p><hr align="left" width="150" size="2" color="#ff0000" /></div>)
  return (
    <div>
      <h2>Numbers</h2>
      {output}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
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
    console.log(persons.includes(personObj), persons, personObj.name)
    if (persons.some(val => val.name === personObj.name)) {
      window.alert(`${newName} already exists!`)
    } else {
      setPersons(persons.concat(personObj))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <Filter /> */}
      <Persons persons={persons} />
      <h2>Add contacts</h2>
      <form onSubmit={handleAdd}>
        <div>
          <p>name: <input value={newName} onChange={handleNameInput}/></p>
          <p>phone: <input value={newPhone} onChange={handlePhoneInput}/></p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default App