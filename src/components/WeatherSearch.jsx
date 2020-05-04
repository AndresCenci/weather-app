import React, { Component } from 'react';
import './WeatherSearch.css';
import WeatherCard from './WeatherCard';

class Search extends Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            location: {},
            current: {},
            forecast: []
        };
    }

    componentDidMount() {
        fetch('http://localhost:8000/v1/location')
        .then(res => res.json())
        .then((data) => {
            if (data.data.cod && data.data.cod !== '200') {
                this.setState({
                    location: {},
                    current: {},
                    forecast: []
                })
            } else {
                this.setState({ location: data })
                this.getCurrent(data.data.city);
                this.getForecast(data.data.city);
            }
        })
        .catch(console.log)
    }

    getCurrent = (city) => {
        fetch(`http://localhost:8000/v1/current/${city}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({ current: data.data })
        })
        .catch(console.log)
    }

    getForecast = (city) => {
        fetch(`http://localhost:8000/v1/forecast/${city}`)
        .then(res => res.json())
        .then((data) => {
            this.setState({ forecast: data.data.list })
        })
        .catch(console.log)
    }

    searchCity = (inputValue) => {
        if (inputValue.length > 0) {
            const valuesArray = inputValue.split(',');
            const city = valuesArray.length >= 0 ? valuesArray[0] : '';
            const country = valuesArray.length > 0 ? valuesArray[1] : '';
        
            fetch(`http://localhost:8000/v1/find/${city}/${country}`)
            .then(res => res.json())
            .then((data) => {
                if (data.data.cod && data.data.cod !== '200') {
                    this.setState({
                        current: {},
                        forecast: []
                    })
                } else {
                    this.getCurrent(data.data.city.name);
                    this.getForecast(data.data.city.name);
                }
            })
            .catch(console.log)
        } else {
            this.getCurrent(this.state.location.data.city);
            this.getForecast(this.state.location.data.city);
        }
    }

    render() {
        const { location, current, forecast } = this.state;

        return(
            <div className="search">
                <input type="text" className="searchTerm" placeholder="Search..." onChange={ (e) => this.setState({ inputValue: e.target.value }) } />
                <button type="submit" className="searchButton" onClick={ () => this.searchCity(this.state.inputValue) }>
                    <i className="fa fa-search"></i>
                </button>
                <p className="search-instructions">
                    <span>To make it more precise put the city's name, comma, 2-letter country code (ISO3166).</span>
                    <span>You will get all proper cities in chosen country.</span>
                    <span>The order is important - the first is city name then comma then country. Example - London, GB or New York, US.</span>
                    <span>For current weather location do an empty search.</span>
                </p>
                <div className="current-weather">
                    { Object.keys(location).length && Object.keys(current).length > 0
                        ? <WeatherCard
                            name = {current.name}
                            date = 'Now'
                            description = {current.weather[0].description}
                            icon = {`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
                            temp = {current.main.temp}
                            humidity = {current.main.humidity}
                            pressure = {current.main.pressure}
                            speed = {current.wind.speed}
                            />
                        : <p>Not found</p> }
                </div>
                <div className="forecast-weather">
                    {
                        forecast.length > 0 && forecast.map(element => 
                            <WeatherCard
                                key={element.dt}
                                name = {current.name}
                                date = {element.dt_txt.substr(0, 13).concat('hs')}
                                description = {element.weather[0].description}
                                icon = {`http://openweathermap.org/img/wn/${element.weather[0].icon}@2x.png`}
                                temp = {element.main.temp}
                                humidity = {element.main.humidity}
                                pressure = {element.main.pressure}
                                speed = {element.wind.speed}            
                            />
                        )
                    }
                </div>
            </div>
        )
    }
}

export default Search;