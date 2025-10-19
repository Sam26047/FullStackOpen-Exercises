import { useState,useEffect } from 'react'
import axios from 'axios'

const weather_api_key = import.meta.env.VITE_WEATHER_API_KEY;
console.log(weather_api_key)

const WeatherInfo = ({capital})=>{
  const [weatherInfo,setWInfo] = useState(null)

  const hook = ()=>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weather_api_key}`)
      .then(response=>{
        const data = response.data
        console.log(data)
        setWInfo(data)
      })
      .catch(error=>{
        setWInfo(null)
      })
  }
  useEffect(hook,[capital])

  if(!weatherInfo) return (
    <div>
      Weather info not  available for {capital}
    </div>
  )
  return(
    <div>
      <h2>Weather in {capital}</h2>
      <p> Temperature {weatherInfo.main.temp} Fahrenheit</p>
      <p><img src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}/></p>
      <p>Wind {weatherInfo.wind.speed} m/s</p>
    </div>
  )
}

const CountryInfo=({country})=>{
  const [countryInfo,setInfo] = useState(null)

  const hook = ()=>{
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(response=>{
        const data=response.data
        console.log(data)
        setInfo(data)
      })
  }
  useEffect(hook,[country])

  if(!countryInfo) return (<> </>)
  
  return(
    <div>
      <h1>{countryInfo.name.common}</h1>
      <div>
        {countryInfo.capital.map(x=>(<p key={x}>{x}</p>))}
        <p>{countryInfo.region}</p>
      </div>
      <h2>Languages</h2>
      <ul>
        {Object.values(countryInfo.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img src={countryInfo.flags.png} />
      <WeatherInfo capital={countryInfo.capital[0]}/>
    </div>
  )
}

const Info = ({ countries }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <CountryInfo country={countries[0]} />;
  }

  return (
    <div>
      {countries.map(country => (
        <div key={country}>
          {country} &nbsp;
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </div>
      ))}

      {/* Conditionally render country info */}
      {selectedCountry && <CountryInfo country={selectedCountry} />}
    </div>
  );
};



function App(){
  const [country,setCountry] = useState('')
  const [countries,setCountries]  = useState([])

  const hook = ()=>{
    if(country==='') setCountries([])
    else
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response=>{
        const data =response.data
        console.log(data);

        const matches = data
          .filter(match => match.name.common.toLowerCase().includes(country))
          .map(match=>match.name.common);

        setCountries(matches)
        console.log(matches)
      })
      
  }
  useEffect(hook,[country])

  const handleSearch= (event)=>{
    setCountry(event.target.value)
  }

  return(
    <div>
      <p>find countries <input value={country} onChange={handleSearch} /></p>
      <Info countries={countries} />
    </div>
  )
}

export default App
