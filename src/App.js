import React, { Component } from 'react';
import './css/App.css';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
const API_KEY = "8535cbfc5a81e7688483254350a88cfb";
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherData: [],
            searchDone: false,
            errorMessage: '',
        };

        this.callWeatherData = this.callWeatherData.bind(this);
    }

    callWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=15&APPID=${API_KEY}`;
        fetch(url)
            .then(handleErrors)
            .then(resp => resp.json())

            .then(data => {
                let weatherObjArr = [];
                data.list.forEach(element => {
                    weatherObjArr.push({
                        weather: element.weather,
                        city: data.city.name,
                        country: data.city.country,
                        minTemp: element.main.temp_min,
                        maxTemp: element.main.temp_max,
                        humidity: element.main.humidity,
                        temp: element.main.temp,
                        date: element.dt_txt,
                    });
                });
                this.setState({
                    weatherData: weatherObjArr,
                    searchDone: true,
                    errorMessage: '',
                });
            })
            .catch(error => {
                // If an error is catch, it's sent to SearchBar as props
                this.setState({ errorMessage: error.message });
                this.setState({
                    weatherData: null,
                    searchDone: false,
                    
                });
            });

        function handleErrors(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        }
    }
    render() {
        const { searchDone, weatherData, errorMessage } = this.state;

        return (
            <div className="DashBoard">
                <div className="App">
                <SearchBar callBackFromParent={this.callWeatherData} error={errorMessage} />
               </div>
                <div className="topContainer">
                   
                    {searchDone &&
                        weatherData.map((value, index) => {
                        return <WeatherCard weatherData={value} />
                        
                         ;
                    })}
                </div>
            </div>
        );
    }
}

export default App;
