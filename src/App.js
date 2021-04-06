import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Weather from "./Weather";
import CityForecast from "./CityForecast";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <h1>Weather App</h1>
            <Weather />
          </Route>
          <Route path="/:cityId">
            <CityForecast />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
