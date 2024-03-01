import React, { useState, useEffect } from 'react';
import TextBox from './components/TextBox';
import Button from './components/Button';
import './Pokedex.css'; // Importa tus estilos CSS

const Pokemon = ({ pokemon }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then(response => response.json())
      .then(data => setDetails(data));
  }, [pokemon]);

  return details ? (
    <div className="pokemon">
      <img src={details.sprites.front_default} alt={pokemon.name} />
      <h2>{pokemon.name}</h2>
      {details.stats.map((stat, index) => (
        <p key={index}>
          {stat.stat.name}: {stat.base_stat}
        </p>
      ))}
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=2000')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  // Function for the text box
  function searchPokemonByName(name){
    
  }

  return (
    <div className="pokedex">
      <div class='flex'>
        <div class='flex-none'>
          <button className='button-blue'></button>
        </div>
        <div class='flex-none'>
          <button className='button-red'></button>
        </div>
        <div class='flex-none'>
          <button className='button-yellow'></button>
        </div>
        <div class='flex-none'>
          <button className='button-green'></button>
        </div>
      </div>
      <br></br>
      <div className='screen'>{selectedPokemon && <Pokemon pokemon={selectedPokemon} />}</div>
      <div class='flex'>
        <div class='flex-none'>
          <button className='decoration-button-blue'></button>
        </div>
      </div>
      <div class='flex'>
        <div class='flex-none'>
          <TextBox placeholder="Busca tu pokemon"></TextBox>
        </div>
        <div class='flex-none'>
          <Button></Button>
        </div>
      </div>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <button key={index} onClick={() => setSelectedPokemon(pokemon)}>
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
