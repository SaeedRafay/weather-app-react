import cities from './city-weather.json';
import CityWeather from './CityWeather';
import './Weather.css';

function Weather() {
  return (
    <div className="Weather">
      {cities.map((city, index) => <CityWeather key={index} city={city} />)}
    </div>
  );
}

export default Weather;
