import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [types, setTypes] = useState([]);
  const [time, setTime] = useState([]);
  const [station, setStation] = useState('JÄS');
  

  const API_URL = 'https://rata.digitraffic.fi/api/v1/live-trains/station/';
  const address = API_URL + station;
   
  const HandleData = (e) => {
    axios.get(address)
      .then((response) => {
        console.log(response.data[0].departureDate.toLocaleDateString())
        setTypes(response.data);
        //setTime(response.data[0].timeTableRows);
        //console.log(response.data[0].timeTableRows[0].scheduledTime);
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  }
  return (
    <div style={{margin: 50}}>
      <h1>Päivän junat aseman perusteella</h1>
      <h2>Minkä aseman junat haluat?</h2>
      <select name='station' value={station} onChange={e => setStation(e.target.value)}>
        <option value='JÄS'>Jämsä</option>
        <option value='TPE'>Tampere</option>
        <option value='HKI'>Helsinki</option>
        <option value='JY'>Jyväskylä</option>
      </select>
      <button onClick={(e) => HandleData(e)}>Hae</button>
          <table>
            <tbody>
            <tr>
              <th>Juna</th>
              <th>Päivä</th>
            </tr>
          {types.map(item => (
            <tr key={item.trainNumber}>
              <td>{item.trainType} {item.trainNumber}</td>
              <td>{item.departureDate}</td>
            </tr>
            ))}
            </tbody>
          </table>
    </div>
  );
}

export default App;
