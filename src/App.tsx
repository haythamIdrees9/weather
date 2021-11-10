import './App.scss';
import Weather from './components/weather/weather';
function App() {
  return (
    <div className="App f-col a-center" >
      <div className="img-br" style={{ background: 'url(/bg.jpg) no-repeat' }}></div>
      <div className="weather-container">
        <Weather />
      </div>
    </div>
  );
}

export default App;
