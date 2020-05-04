import React, { Component } from 'react';
import './WeatherCard.css';

class WeatherCard extends Component {
    render() {
        return(
            <div key={this.props.key} className="card">
                <ul>
                    <li>{`${this.props.name}`}</li>
                    <li>{`${this.props.date}`}</li>
                    <li>{`${this.props.description}`}</li>
                    <li>{`Temperature: ${this.props.temp}°С`}</li>
                    <li>{`Humidity: ${this.props.humidity}%`}</li>
                    <li>{`Pressure: ${this.props.pressure} hpa`}</li>
                    <li>{`Wind: ${this.props.speed} m/s`}</li>
                    <li><img className="weather-img" src={this.props.icon} alt={this.props.description} /></li>
                </ul>
            </div>
        )
    }
}

export default WeatherCard;
