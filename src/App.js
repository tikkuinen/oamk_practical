import { useState } from 'react';
import './App.css';
import axios from 'axios';

const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '7utAJrHn6hAJdhyjvpUsWpRWuqmfr8Ej';

function App() {
  const [gif, setGif] = useState('');
  const [text, setText] = useState('');
  const [found, setFound] = useState('');


  function searchGif(e) {
    e.preventDefault();
    const address = API_URL + '?api_key=' + API_KEY + '&q=' + found;
    //console.log(address);

    axios.get(address)
      .then((response) => {
        //console.log(response.data.data);
        setGif(response.data.data[0].images.downsized.url);
        setText(response.data.data[0].title);
        //clear input after fetch
        setFound('');
      }).catch(error => {
        alert(error);
      });
  };
  
  return (
    <div style={{margin: 50}}>
      <form onSubmit={searchGif}>
        <input type="text" value={found} onChange={e => setFound(e.target.value)} />
        <button onClick={searchGif}>Search</button>
        <div>
          <img src={gif} alt=''/>
        </div>
        <p>{text}</p>
      </form>
    </div>
  );
}

export default App;
