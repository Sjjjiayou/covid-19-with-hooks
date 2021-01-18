import React, { useEffect, useState } from 'react'
import GlobalStats from './components/GlobalStats'
import CountriesChart from "./components/CountriesChart";
import SelectDataKey from "./components/SelectDataKey";
import { useCoronaAPI } from "./hooks/useCoronaAPI";
import './App.css';

function App() {
  const [key, setKey] = useState("case")

  const globalStats = useCoronaAPI('/all', {
    initialData: {},
    refetchInterval: 5000,
  })
  
  const countries = useCoronaAPI(`/countries?sort=${key}`, {
    initialData: [],
    converter: (data) => data.slice(0, 10)
  })

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
