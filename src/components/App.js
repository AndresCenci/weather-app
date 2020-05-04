import React from 'react';
import './App.css';
import Search from './WeatherSearch';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Weather in your city
        </p>
      </header>
      <section className="App-body">
        <Search />
      </section>
    </div>
  );
}

export default App;
