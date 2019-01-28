import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Statistics = ({good, bad, neutral}) => {
    const calculateTotal = (good, bad, neutral) => {
        const total = good + bad + neutral
        return(total)
    }

    const calculateMean = (good, bad, neutral) => {
        const mean = (good + bad*-1)/calculateTotal(good, bad, neutral)
        return(mean)
    }

    const totalPositives = (good, bad, neutral) => {
        const positives = Math.floor((good/(calculateTotal(good, bad, neutral)))*100)
        return(positives)
    }
    if (calculateTotal(good, bad, neutral)!==0) {
        return (
            <div id="statistics">
            <h1>statistiikka</h1>
            <table>
                <tbody>
                    <Statistic text="hyvä" stat={good} />
                    <Statistic text="neutraali" stat={neutral} />
                    <Statistic text="huono" stat={bad} />
                    <Statistic text="yhteensä" stat={calculateTotal(good, bad, neutral)} />
                    <Statistic text="keskiarvo" stat={calculateMean(good, bad, neutral)} />
                    <Statistic text="positiivisia" stat={totalPositives(good, bad, neutral)+"%"} />
                </tbody>
            </table>
            </div>
        )
    }
    return (
        <div id="statistics">
            <h1>statistiikka</h1>
            <p>
                Ei yhtään palautetta annettu.
            </p>
        </div>
    )
}

const Statistic =  ({text, stat}) => {
    return (
        <tr>
            <td id="desc">{text}</td>
            <td id="stat">{stat}</td>
        </tr>
    )
}

const Button = ({handleClick, text}) => {
    return (
        <button onClick={handleClick}>{text}</button>
    )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
        <div id="feedback">
            <h1>anna palautetta</h1>
            <Button text='hyvä' handleClick={() => setGood(good+1)}/>
            <Button text='neutraali' handleClick = {() => setNeutral(neutral + 1)} />
            <Button text='huono' handleClick = {() => setBad(bad + 1)}/>
        </div>
        <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)