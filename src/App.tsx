import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import Directory from './components/Directory/directory';
import { lang } from './constants/lang';
import { pokemonToFetchOnLoad } from './constants/settings';
import { useAppDispatch } from './hooks';
import { fetchPokemon } from './redux/pokemon/fetchPokemon';
import { fetchPokemonList } from './redux/pokemon/fetchPokemonList';
import { RootState } from './redux/store';
const App = () => {
  const [loadedPokemon, setLoadedPokemon] = useState(0);
  const [fetchMore, setFetchMore] = useState(true);
  const [pokemonToFetch, setPokemonToFetch] = useState(pokemonToFetchOnLoad);
  const pokemonData = useSelector(
    (state: RootState) => state.pokemon.pokemonData
  );
  const pokemonList = useSelector((state: RootState) => state.pokemon.list);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, []);

  useEffect(() => {
    if (pokemonList.length > 0 && fetchMore) {
      let loadedPokemonCount = loadedPokemon;

      while (loadedPokemonCount < pokemonToFetch) {
        dispatch(fetchPokemon(pokemonList[loadedPokemonCount]));
        loadedPokemonCount += 1;
      }
      setFetchMore(false);
      setLoadedPokemon(loadedPokemonCount);
    }
  }, [pokemonList, fetchMore]);

  return (
    <div className='App'>
      <div id='wrapper'>
        <header>
          <h1 className='text-center'>{lang.en.appHeader}</h1>
          <p className='header-text'>{lang.en.welcomeText}</p>
        </header>
        <main>
          <form id='search'>
            <input
              className='search-input'
              type='text'
              id='search_value'
              name='searchValue'
            ></input>
          </form>
          <Directory
            setFetchMore={setFetchMore}
            setPokemonToFetch={setPokemonToFetch}
            pokemonToFetch={pokemonToFetch}
          />
        </main>
        <footer>{lang.en.footerText}</footer>
      </div>
    </div>
  );
};

export default App;
