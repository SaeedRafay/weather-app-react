import React, { useState, useEffect } from "react";
// import cities from "./city-weather.json";
import CityWeather from "./CityWeather";
import SearchWeather from "./SearchWeather";
import "./Weather.css";

function Weather() {
  const [cities, setCities] = useState([]);
  const [searchBtn, setSearchBtn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (searchBtn) {
      setLoading(true);
      setErrMsg("");
      let searchVal = document.getElementById("searchField").value;
      async function weatherData() {
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${searchVal}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
          );
          const data = await res.json();
          const status = res.status;
          if (status === 200) {
            setCities((cities) => {
              if (cities.some((o) => o.name === data.name)) {
                setErrMsg("City Already Exists");
                return [...cities];
              } else {
                return [data, ...cities];
              }
            });
            document.getElementById("searchField").value = "";
            console.log(status);
          }
          if (status === 404) {
            setErrMsg(`City "${searchVal}" Not Found`);
          }
        } catch (err) {
          setErrMsg(err.message);
        }

        setLoading(false);
        setSearchBtn(false);
      }

      weatherData();
    }
  }, [searchBtn]);

  return (
    <div className="Weather">
      <SearchWeather setSearchBtn={setSearchBtn} />

      {isLoading && <p>Loading...</p>}

      {errMsg !== "" && <p>Error: {errMsg}</p>}

      {cities.length === 0 && (
        <p>Begin weather search by name of a city or place</p>
      )}

      {cities.length > 0 &&
        cities.map((city, index) => (
          <CityWeather
            key={index}
            city={city}
            cities={cities}
            setCities={setCities}
          />
        ))}
    </div>
  );
}

export default Weather;
