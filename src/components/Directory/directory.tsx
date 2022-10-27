import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './directory.scss';
import LoadMoreButton from './loadMoreButton';
import Pokecard from './pokecard';

interface DirectoryProps {
    setFetchMore: (setFetchMore: any) => void;
    setPokemonToFetch: (setPokemonToFetch: any) => void;
    pokemonToFetch: number;
    loadedPokemonCount: number;
}

const Directory = ({
    setFetchMore,
    setPokemonToFetch,
    pokemonToFetch,
    loadedPokemonCount,
}: DirectoryProps) => {
    const pokemonData = useSelector(
        (state: RootState) => state.pokemon.pokemonData
    );
    const pokemonList = useSelector((state: RootState) => state.pokemon.list);
    const [pokecards, setPokecards] = useState([]);
    const isLoading =
        useSelector((state: RootState) => state.pokemon.status) === 'loading';

    const onFetchClick = () => {
        setFetchMore(true);
        setPokemonToFetch(pokemonToFetch + 10);
    };

    useEffect(() => {
        if (
            pokemonList.length >= loadedPokemonCount &&
            pokemonList[loadedPokemonCount - 1] !== undefined
        ) {
            if (
                pokemonData.hasOwnProperty(pokemonList[loadedPokemonCount - 1])
            ) {
                const pokecardsClone = [...pokecards];
                for (let i = pokecards.length; i < pokemonToFetch; i++) {
                    const pokemonName = pokemonList[i];

                    pokecardsClone.push(
                        <Pokecard
                            key={i + 1}
                            pokemon={pokemonData[pokemonName]}
                        />
                    );
                }
                setPokecards(pokecardsClone);
                console.log(pokecardsClone, 'pokecardsClone');
            }
        }
    }, [pokemonList, pokemonData, loadedPokemonCount]);

    return (
        pokemonList.length > 0 && (
            <div className='directory'>
                <h2 className='directory-header'>Browse Pokémon</h2>

                <div id='pokegrid'>{pokecards.map((pokecard) => pokecard)}</div>
                <div className='directory-load-more'>
                    <LoadMoreButton
                        onClick={onFetchClick}
                        loading={isLoading}
                    />
                </div>
            </div>
        )
    );
};

export default Directory;
