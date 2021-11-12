import './App.scss';
import Weather from './components/weather/weather';
function App() {
  return (
    <div className="App f-col a-center" >
      <div className="weather-container">
        <Weather />
      </div>
    </div>
  );
}

export default App;
