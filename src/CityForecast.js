import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import KelvinToCelcius from "./KelvinToCelcius";
import "./CityForecast.css";

function CityForecast() {
  const { cityId } = useParams();
  const [forecast, setForecast] = useState({});
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchForecast = async (cityId) => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
        );
        const data = await res.json();
        const status = res.status;
        if (status === 200) {
          setForecast(data);
          setForecastData(
            data.list.map((item) => {
              let item_info = {
                temp: KelvinToCelcius(item.main.temp),
                date: item.dt_txt,
              };
              return item_info;
            })
          );
        }
        if (status === 404) {
          setNotFound("Ooops 404! Not Found");
        }
      } catch (err) {
        setErrorMessage(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast(cityId);
  }, [cityId]);

  return (
    <div className="cityForecast">
      {loading && <p>Loading...</p>}

      {notFound !== "" && <h1>{notFound}</h1>}

      <p>
        <Link to="/">&laquo; Back to Home</Link>
      </p>

      {Object.keys(forecast).length !== 0 && (
        <>
          <h1>5-Day Weather Forecast</h1>

          {errorMessage !== "" && <p>{errorMessage}</p>}

          <h2>
            {forecast.city.name}, {forecast.city.country}
          </h2>

          <AreaChart
            width={600}
            height={400}
            data={forecastData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="#8884d8"
              fill="#8884d8"
            />
          </AreaChart>
        </>
      )}
    </div>
  );
}

export default CityForecast;
