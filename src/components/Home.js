import React from 'react'
import './Home.css';
import { useState } from 'react';
import axios from 'axios';

// returns GIFs determined by a keyword
const API_URL = 'https://api.giphy.com/v1/gifs/search';
const API_KEY = '7utAJrHn6hAJdhyjvpUsWpRWuqmfr8Ej';

export default function Home() {
  const [gif, setGif] = useState('');
  const [text, setText] = useState('');
  const [found, setFound] = useState('');

  function searchGif(e) {
    e.preventDefault();
    // forms address with original API url plus my personal API key and keyword entered in the search box.
    const address = API_URL + '?api_key=' + API_KEY + '&q=' + found;

    axios.get(address)
      .then((response) => {
        console.log(response.data.data)
        // one GIF (the first in the array of search results) is set in a state variable
        setGif(response.data.data[0].images.downsized.url);
        setText(response.data.data[0].title);
        //clear input after fetch
        setFound('');
      }).catch(error => {
        alert(error);
      });
    };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <form onSubmit={searchGif}>
            <input type='text' value={found} onChange={e => setFound(e.target.value)} />
            <button onClick={searchGif}>Search</button>
            <div>
              <img src={gif} alt='' className='img-fluid'  />
            </div>
            <p>{text}</p>
          </form>
        </div>
      </div>
    </div>
  )
}