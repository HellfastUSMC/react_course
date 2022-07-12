import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({setSearch, newSearch}) => {

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

const Weather = ({countries, weather, weather_image}) => {
  console.log(weather.length, countries.length)
  if (countries.length > 0 && weather !== [] && weather_image !== ''){
    console.log(countries, weather)
    return(
      <>
        <h3>
          Weather in {countries[0].capital[0]}
        </h3>
        <p>
          Temp - {weather.current_condition[0].temp_C} °C
        </p>
        <p>
          Condition - {weather.current_condition[0].weatherDesc[0].value}
        </p>
        <p>
          Wind - {weather.current_condition[0].windspeedKmph} km\h
        </p>
        <p>
          <img src={'http://wttr.in/'+countries[0].capital[0]+'_M0pnQ_lang=en.png'}  alt={countries[0].capital[0]}/>
        </p>
      </>
    )
  }
}

const CountriesInfo = ({countries, setSearch, weather, weather_image}) => {

  const handleMore = (country) => {
    setSearch(country)
  }

  if (countries === '404'){
    return (
      <p>There's no country with this name</p>
    )
  }
  
  if (countries.length === 1) {
    let langs = []
    for (const val of Object.values(countries[0].languages)) {
      langs.push(val)
    }
      return (
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital - {countries[0].capital[0]}</p>
          <p>Area - {countries[0].area} km²</p>
          <h3>
            Languages
          </h3>
          {langs.map(lang => <p key={lang}>{lang}</p>)}
          <h3>
            Flag
          </h3>
          <img src={countries[0].flags.png} alt={countries[0].name.common}/>
          <Weather countries={countries} weather={weather} weather_image={weather_image}/>
        </div>
      )
    }
  
  if (11 > countries.length && countries.length > 1) {
      return (
      <div>
        <h2>Countries</h2>
          {countries.map(country => <p key={country.cca2}>{country.name.common} <button onClick={() => handleMore(country.name.common)}>Show more</button></p>)}
      </div>
      )
  }
  return (
    <p>There are too many countries</p>
  )
}

const App = () => {
  const [newSearch, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState([])
  const [weather_image, setWeather_image] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/name/' + newSearch)
      .then(response => {
        setCountries(response.data)
        })
      .catch(err => {setCountries('404')})
    }, [newSearch]
  )
  
  useEffect(() => {
    if (countries.length !== 1) {
      return
    }
    axios
      .get('http://wttr.in/' + countries[0].capital[0] + '?M&format=j2')
      .then(response => {setWeather(response.data)})
  },[countries]
  )
  
  useEffect(() => {
    if (countries.length !== 1) {
      return
    }
    axios
      .get('http://wttr.in/' + countries[0].capital[0] + '.png')
      .then(response => {setWeather_image(response.data)})
  },[countries]
  )

  return (
    <div>
      <h1>Countries</h1>
      <Search setSearch={setSearch} newSearch={newSearch} />
      <CountriesInfo countries={countries} setSearch={setSearch} weather={weather} weather_image={weather_image}/>
    </div>
  )
}

export default App