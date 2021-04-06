import { Link } from "react-router-dom";
import KelvinToCelcius from "./KelvinToCelcius";

function CityWeather({ city, cities, setCities }) {
  const deleteCity = async (cityToDelete) => {
    const cityDeleted = await cities.filter((city) => city !== cityToDelete);
    setCities((cities) => cityDeleted);
  };

  return (
    
      <div className="cityWeather">
        <h3>
          {city.name}, {city.sys.country}
        </h3>
        <p>
          <strong>{city.weather[0].main}</strong>
          <br />
          {city.weather[0].description}
        </p>
        <p>
          min temp: {KelvinToCelcius(city.main.temp_min)}°C <br />
          max temp: {KelvinToCelcius(city.main.temp_max)}°C <br />
          location: {city.coord.lat}, {city.coord.lon}
        </p>
        <p>
          <Link to={`/${city.id}`}>5-Day Forecast</Link>
        </p>
        <button className="removeCity" onClick={() => deleteCity(city)}>
          &#10006;
        </button>
      </div>
  );
}

export default CityWeather;
