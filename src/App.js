import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [trains, setTrains] = useState([]);
  const [time, setTime] = useState([]);
  const [station, setStation] = useState('');
  

  const API_URL = 'https://rata.digitraffic.fi/api/v1/live-trains/station/';
  const address = API_URL + station;
   
  const handleData = () => {
    axios.get(address)
      .then((response) => {
        //data junia, koodeja ja lähtöpäivää varten, jako käyttöliittymässä
        //console.log(response.data)
        setTrains(response.data);

        //data aikataulua varten
        const temp = Array();
        const timeTables = response.data

        response.data.forEach(element => {
          //element.timeTableRows[0];
          //pitäis pyörittää tää koko responsedata ympäri, ja kattoo jokainen juna
          //jokaisen junan kohdalta se asema
          
          if (element.stationShortCode === 'TPE')
            temp.push(element.stationShortCode);
            console.log(temp);
            //ei toimi
          
        });
        //console.log(response.data[0].timeTableRows[0].scheduledTime);

        //foreacheja ja temp taulukko, johon säilöö niitä rivejä
    }).catch(error => {
      console.log(error);
      alert(error);
    })
  }

  return (
    <div style={{margin: 50}}>
      <h1>Päivän junat aseman perusteella</h1>
      <h2>Minkä aseman junat haluat?</h2>
      {/* haetaan kaksi asiaa kerralla anonyymillä funktiolla */}
      <select name='station' value={station} onChange={e => {setStation(e.target.value); handleData() }}>
        <option value=''>Valitse asema</option>
        <option value='JÄS'>Jämsä</option>
        <option value='TPE'>Tampere</option>
        <option value='HKI'>Helsinki</option>
        <option value='JY'>Jyväskylä</option>
      </select>
      <button>Hae</button>
          <table>
            <tbody>
            <tr>
              <th>Juna</th>
              <th>Päivä</th>
            </tr>
          {trains.map(item => (
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
