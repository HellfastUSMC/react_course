import axios from 'axios'

const baseUrl = 'api/phonebook'

const getEntries = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addEntry = (newContact) => {
  const request = axios.post(baseUrl, newContact)
  return request.then(response => response.data)
}

const updateEntry = (id, newContact) => {
  const request = axios.put(baseUrl+'/'+id, newContact)
  return request.then(response => response.data)
}

const rmEntry = (id) => {
  const request = axios.delete(baseUrl+'/'+id)
  return request.then(response => response.data)
}

export {
    getEntries,
    addEntry,
    updateEntry,
    rmEntry
}