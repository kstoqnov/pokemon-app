import { Pokemons } from "../../app";

type Props = {
  pokemonsList: Pokemons;
};

export const PokemonList: React.FC<Props> = ({ pokemonsList }) => {
  return (
    <div>
      {pokemonsList.map((pokemon, index) => (
        <div key={index}>{pokemon.name}</div>
      ))}
    </div>
  );
};

PokemonList.displayName = "PokemonList";
