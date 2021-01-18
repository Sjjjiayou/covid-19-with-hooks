import React, { useEffect, useState } from 'react'
import GlobalStats from './components/GlobalStats'
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import './App.css';

const baseUrl = 'https://corona.lmao.ninja/v2'

function App() {
  const [globalStats, setGlobalStats] = useState({})
  const [countries, setCountries] = useState([])
  const [key, setKey] = useState("case")

  useEffect(() => {
    const asyncGlobal = async() => {
      const response = await fetch(`${baseUrl}/all`)
      response.json().then(data => {
        setGlobalStats(data)
      })
    }
    asyncGlobal()
    const intervalId = setInterval(asyncGlobal, 10000);
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    const fetchCountries = async() => {
      const response = await fetch(`${baseUrl}/countries?sort=${key}`)
      const data = await response.json()
      setCountries(data.slice(0,10))
    };

    fetchCountries()
  }, [key])

  return (
    <div className="App">
      <h1>COVID-19</h1>
      <GlobalStats  stats={globalStats} />
      <SelectDataKey onChange={(e) => setKey(e.target.value)} />
      <CountriesChart data={countries}  dataKey={key} />
    </div>
  );
}

export default App;
