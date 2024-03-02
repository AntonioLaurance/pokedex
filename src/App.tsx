import React, { useState, useEffect, useRef } from "react";
import TextBox from "./components/TextBox";
import Button from "./components/Button";
import "./Pokedex.css";

interface PokemonProps {
  pokemon: any;
  setDetails: React.Dispatch<React.SetStateAction<any>>;
  isSearch: boolean;
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon, setDetails, isSearch }) => {
  const [details, setDetailsLocal] = useState<any>(null);

  useEffect(() => {
    fetch(pokemon.url)
      .then((response) => response.json())
      .then((data) => {
        setDetailsLocal(data);
      });
    setDetails(details);
  }, [pokemon, setDetails]);

  return details ? (
    <div className="pokemon">
      <h2>{pokemon.name}</h2>
      {isSearch && (
        <div>
          {pokemon && pokemon.stats && <img src={pokemon.sprites.front_default} alt={pokemon.name} />}
          {pokemon &&
            pokemon.stats &&
            pokemon.stats.map((stat: any, index: number) => (
              <p key={index}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
        </div>
      )}
      {!isSearch && (
        <div>
          {details && details.stats && <img src={details.sprites.front_default} alt={pokemon.name} />}
          {details &&
            details.stats.map((stat: any, index: number) => (
              <p key={index}>
                {stat.stat.name}: {stat.base_stat}
              </p>
            ))}
        </div>
      )}
    </div>
  ) : (
    <p>Cargando...</p>
  );
};

const Pokedex: React.FC = () => {
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<any>(null);
  const [details, setDetails] = useState<any>(null);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const inputText = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=2000")
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  function searchPokemonByName(name: string) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch Pokemon data");
        }
        return response.json();
      })
      .then((data) => {
        setDetails(data);
        setSelectedPokemon(data);
        return data;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="pokedex">
      <div className="flex">
        <div className="flex-none">
          <button className="button-blue"></button>
        </div>
        <div className="flex-none">
          <button className="button-red"></button>
        </div>
        <div className="flex-none">
          <button className="button-yellow"></button>
        </div>
        <div className="flex-none">
          <button className="button-green"></button>
        </div>
      </div>
      <br />
      <div className="screen">
        {selectedPokemon && <Pokemon pokemon={selectedPokemon} setDetails={setDetails} isSearch={isSearch} />}
      </div>
      <div className="flex">
        <div className="flex-none">
          <button className="decoration-button-blue"></button>
        </div>
        <div className="flex-none">
          <button className="decoration-button-green"></button>
        </div>
        <div className="flex-none">
          <button className="decoration-button-yellow"></button>
        </div>
      </div>
      <div className="flex">
        <div className="flex-1">
          <TextBox ref={inputText} placeholder="Busca tu pokemon" />
        </div>
        <div className="flex-none w-30">
          <Button onClick={() => {
              searchPokemonByName(inputText.current?.value || "");
              setIsSearch(true);
            }} 
            color = "red"
          />
        </div>
      </div>
      <div className="pokemon-list">
        {pokemons.map((pokemon, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedPokemon(pokemon);
              setIsSearch(false);
            }}
          >
            {pokemon.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Pokedex;
