// import React, { Component } from "react";
import React, { useState } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import Country from "./components/Country";
import Duration from "./components/Duration";
import Utils from "./utils"
import "./style.css";

const App = () => {
  const [error, setError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [countries, setCountries] = useState([])
  const [startDate, setStartDate] = useState(1)
  const [endDate, setEndDate] = useState(10)

  React.useEffect(()=> {
    getCountries()

  },[]);

  const getCountries = () => {
    fetch("http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result")
    .then(res => res.json())
    .then(
      (result) => {
        setCountries(
          result.map((data,index)=> {
            data.isChecked = false;
            if(index == 0){
              data.isChecked = true;
            }
            return data;
          })
        );  
        setIsLoaded(true)
      },
      (error) => {
        setIsLoaded(true);
        setError(error)
      }
    )
  }

  const toggleCheckedCountry = country => {
    setCountries(
      countries.map(data => {
        if(country == data.country){
          data.isChecked = !data.isChecked
        }
        return data
      })
    );
  }

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {

      return (
        <div className="App">
          <h2>Countries</h2>
          
          {countries.map((country) =>
            <Country
              key={country.country}
              country={country.country}
              isChecked={country.isChecked}
              handleCheckedCountry={() => toggleCheckedCountry(country.country)}
            />
          )}

          <h4>Duration</h4>
          <Duration
            startDate={startDate}
            endDate={endDate}
            handleStartDate={date => setStartDate(date)}
            handleEndDate={date => setEndDate(date)}
          />
          {"" != Utils.getMostAffectedCountry(countries, startDate, endDate) ? (
            <div>

              <LineChart
                data={Utils.getLineChartData(countries, startDate, endDate)}
              />

              <h4>Most affected country</h4>
              Country name: {Utils.getMostAffectedCountry(countries, startDate, endDate)}

              <PieChart
                data={Utils.getPieChartData(countries, startDate, endDate)}
              />
            </div>
          ) : (
              <h3>No data to display</h3>
            )
          }
        </div>
      )
    }  
}

export default App;
