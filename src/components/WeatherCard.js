import React, { Component } from "react";
import "../css/WeatherCard.css";
import "../css/weather-icons.min.css";


class WeatherCard extends Component {
  
  render() {
    const { city, weather, country, temp,humidity,maxTemp,minTemp,date } = this.props.weatherData;
    const celcius = Math.round(temp - 273.15);
    const maxTempCelcius = Math.round(maxTemp - 273.15);
    const minTempCelcius = Math.round(minTemp-273.15)
    return (
      <div class="topContainer">
        <div className="WeatherCard">
        <h1 className="WeatherCard-degrees">{celcius}°</h1>
        <div className="WeatherCard-icon-container">
          <i className={`wi wi-owm-${weather[0].id} WeatherCard-icon`} />
          <p><font size="5">{weather[0].main}</font></p>
        </div>
        
        <h2 className="WeatherCard-city">
          {city}, {country}
        </h2>
        <h2>{date}</h2>
        <h2 className="WeatherCard-Details">
          <div>
            <label for="Humidity">Humidity {humidity}</label>
          </div>
          <div>
            <label for="Max Temp">Max Temp {maxTempCelcius}°</label>
          </div>
          <div>
            <label for="Min Temp">Min Temp {minTempCelcius}°</label>
          </div> 
        </h2>
      </div>
      </div>
    );
  }
}
export default WeatherCard;
