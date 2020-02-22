import React from 'react';
import './App.css';
import WebMapView from './components/WebMapView';
import Legend from './components/Legend';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Solar Calculator</h1>
      </header>

      <WebMapView />
      <Legend />
    </div>
  );
}

export default App;
