import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import { PokemonList } from "../components/pokemon-list";
import { Pagination } from "../components/pagination";

export type Pokemon = { name: string; url: string };
export type Pokemons = Array<Pokemon>;

function App() {
  const [pokemons, setPokemon] = useState<Pokemons>([]);
  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string>("");
  const [prevPageUrl, setPrevPageUrl] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    axios
      .get(currentPageUrl, {
        signal: controller.signal,
      })
      .then((res: AxiosResponse) => {
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPrevPageUrl(res.data.previous);
        setPokemon(res.data.results);
      });

    return () => controller.abort();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <PokemonList pokemonsList={pokemons} />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
    </div>
  );
}

export default App;
