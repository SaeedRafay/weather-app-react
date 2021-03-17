function CityWeather(props) {
  const city = props.city;

  const kelvinToCelcius = (temp) => {
    const kTemp = parseFloat(temp);
    return Math.round(kTemp - 273.15);
  };

  return (
    <div className="CityWeather">
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
    </div>
  );
}

export default CityWeather;
