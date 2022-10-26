import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './directory.scss';

interface DirectoryProps {
  setFetchMore: (setFetchMore: any) => void;
  setPokemonToFetch: (setPokemonToFetch: any) => void;
  pokemonToFetch: number;
}

const Directory = ({
  setFetchMore,
  setPokemonToFetch,
  pokemonToFetch,
}: DirectoryProps) => {
  const pokemonData = useSelector(
    (state: RootState) => state.pokemon.pokemonData
  );

  const onFetchClick = () => {
    setFetchMore(true);
    setPokemonToFetch(pokemonToFetch + 10);
  };

  return (
    <div className='directory'>
      <h2 className='directory-header'>Browse Pokémon</h2>

      <div id='pokegrid'>
        {pokemonData.map((pokemon) => (
          <div key={pokemon.id} className='pokecard'>
            <div className='pokecard-number'>#{pokemon.id}</div>
            <div className='pokecard-image'>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
              />
            </div>
            <div className='pokecard-name'>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </div>
            <div className='pokecard-types'>
              {pokemon.types.map(({ type }) => (
                <div className='pokecard-types-pill'>
                  {type.name.charAt(0).toUpperCase() + type.name.slice(1)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className='directory-load-more'>
        <button
          className='directory-load-more-btn'
          onClick={() => onFetchClick()}
        >
          Click To Load More Pokemon
        </button>
      </div>
    </div>
  );
};

export default Directory;
