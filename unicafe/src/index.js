import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, LabelSeries, VerticalBarSeries, RadialChart} from 'react-vis'

const BarChart = ({good, bad, neutral}) => {
    const data = [
        {"y":good, "x":"hyvä"},
        {"y":neutral, "x":"neutraali"},
        {"y":bad, "x":"huono"}
    ]


    if (good+bad+neutral === 0) {
        return(
            <div id="visualisation">
                
            </div>
        )
    }
    return (

        <XYPlot 
            xType="ordinal"
            width={300}
            height={300}
            yDomain={[0, Math.max.apply(Math, data.map(function(o) {return o.y+10}))]}
        >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={data} />
            <LabelSeries data={data.map(o => {return {...o, label: o.y.toString()}})} 
                labelAnchorX="middle"
                labelAnchorY="text-after-edge"/>
        </XYPlot>
    )
}

const DonutChart = ({good, bad, neutral}) => {
    const data = [
        {"angle":good, "label":"hyvä"},
        {"angle":neutral, "label":"neutraali"},
        {"angle":bad, "label":"huono"}
    ]

    if (good+bad+neutral === 0) {
        return (
            <div id="visualisation"></div>
        )
    }

    return (
        <RadialChart data={data}
            width={300}
            height={300}
            showLabels={true}
        />
    )
}

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
        <div id="visualisation">
            <BarChart good={good} bad={bad} neutral={neutral} />
            <DonutChart good={good} bad={bad} neutral={neutral} />
        </div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)