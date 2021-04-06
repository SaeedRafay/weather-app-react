import React, { useState, useEffect } from "react";
import CityWeather from "./CityWeather";
import SearchWeather from "./SearchWeather";
import "./Weather.css";

function Weather() {
  const storedCities = localStorage.getItem("cities")
    ? JSON.parse(localStorage.getItem("cities"))
    : [];
  const [cities, setCities] = useState(storedCities);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    localStorage.setItem("cities", JSON.stringify(cities));
  }, [cities]);

  const fetchWeather = async () => {
    if (searchValue !== "") {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
        );
        const data = await res.json();
        const status = res.status;
        if (status === 200) {
          setCities((cities) => {
            if (cities.some((o) => o.name === data.name)) {
              setErrorMessage("City Already Exists");
              return [...cities];
            } else {
              return [data, ...cities];
            }
          });
          setSearchValue("");
        }
        if (status === 404) {
          setErrorMessage(`City "${searchValue}" Not Found`);
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setErrorMessage("Search value cannot be empty");
    }
  };

  return (
    <div className="Weather">
      <SearchWeather
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        fetchWeather={fetchWeather}
      />

      {isLoading && <p>Loading...</p>}

      {errorMessage !== "" && <p>Error: {errorMessage}</p>}

      {cities.length === 0 && (
        <p>Begin weather search by name of a city or place</p>
      )}

      {cities.length > 0 &&
        cities.map((city) => (
          <CityWeather
            key={city.id}
            city={city}
            cities={cities}
            setCities={setCities}
          />
        ))}
    </div>
  );
}

export default Weather;
