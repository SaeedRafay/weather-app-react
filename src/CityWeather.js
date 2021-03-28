function CityWeather(props) {
  const { city, cities, setCities } = props;

  const kelvinToCelcius = (temp) => {
    const kTemp = parseFloat(temp);
    return Math.round(kTemp - 273.15);
  };

  const deleteCity = async (cityToDelete) => {
    const cityDeleted = await cities.filter(city => city !== cityToDelete);
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
        min temp: {kelvinToCelcius(city.main.temp_min)}°C <br />
        max temp: {kelvinToCelcius(city.main.temp_max)}°C <br />
        location: {city.coord.lat}, {city.coord.lon}
      </p>
      <button className="removeCity" onClick={() => deleteCity(city)}>&#10006;</button>
    </div>
  );
}

export default CityWeather;
