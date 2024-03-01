import React, {useState, useEffect} from 'react';
import TextBox from './components/TextBox';
import logo from './logo.svg';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <TextBox placeholder="Busca tu pokemon"></TextBox>
      </header>
    </div>
  );
}

export default App;
