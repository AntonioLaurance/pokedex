import React, { useState, useEffect } from 'react';
import TextBox from './components/TextBox';
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

  // Call to the API
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => response.json())
      .then(data => setPokemons(data.results));
  }, []);

  return (
    <div className="pokedex">
      <h1>Pokedex</h1>
      <TextBox placeholder="Busca tu pokemon"></TextBox>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <button key={index} onClick={() => setSelectedPokemon(pokemon)}>
            {pokemon.name}
          </button>
        ))}
      </div>
      {selectedPokemon && <Pokemon pokemon={selectedPokemon} />}
    </div>
  );
};

export default Pokedex;
