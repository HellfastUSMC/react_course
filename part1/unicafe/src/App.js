import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral}) => {
  const total = good + bad + neutral
  const positive = good/(total/100) + ' %'
  const average = (good-bad)/(good+bad)
  if (total===0) {
    return (
      <p>
        There's no feedbacks at this time...
      </p>
    )
  }
  return (
    <table>
      <thead>
        <tr>
          <th colSpan="2">
            <h2>statistics</h2>
          </th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="Good" value ={good} />
        <StatisticLine text="Neutral" value ={neutral} />
        <StatisticLine text="Bad" value ={bad} />
        <StatisticLine text="All" value ={total} />
        <StatisticLine text="Average" value ={average} />
        <StatisticLine text="Positive" value ={positive} />
      </tbody>
    </table>
  )
}

const FeedbackButton = ({text, func}) => <button onClick={func}>{text}</button>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good+1)
  }

  const addNeutral = () => {
    setNeutral(neutral+1)
  }

  const addBad = () => {
    setBad(bad+1)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <FeedbackButton text='Good' func={addGood} />
      <FeedbackButton text='Neutral' func={addNeutral} />
      <FeedbackButton text='Bad' func={addBad} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App