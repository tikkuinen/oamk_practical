import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [juna, setJuna] = useState([]);

  const URL = "https://rata.digitraffic.fi/api/v1/live-trains/station/TPE/JÄS";

  useEffect(() => {
    // tänne että hakee päivän, ja sitten yhdistää linkkiin? että tämän päivän juna
    
    axios.get(URL)
      .then((response) => {
        //console.log(response)
        const train = response.data[0];
        setJuna(train.trainNumber);
      })

  }, [])
  
  return (
    <div>
      <h1>Trains?</h1>
      <p>{juna}</p>
    </div>
  );
}

export default App;
