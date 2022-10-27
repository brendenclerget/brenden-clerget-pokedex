import { PokemonClient } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import Pokecard from '../Directory/pokecard';
import PokeballLoader from '../PokeballLoader/pokeballLoader';
import './pokemonDetails.scss';

interface DirectoryProps {
    setSelectedPokemon: (selectedPokemon: string) => void;
    pokemonName: string;
}

const PokemonDetails = ({
    pokemonName,
    setSelectedPokemon,
}: DirectoryProps) => {
    // import the PokemonClient (EggGroups enum is fully optional)
    const [pokemonClient, setPokemonClient] = useState(new PokemonClient());
    const [pokemonDetails, setPokemonDetails] = useState(false);
    const [pokemonSpecies, setPokemonSpecies] = useState(false);
    const [pokemonEvolution, setPokemonEvolution] = useState(false);
    const [pokemonEvolveChain, setPokemonEvolveChain] = useState([]);
    const [evolveChainData, setEvolveChainData] = useState([]);

    const delay = (delay: number) => {
        return new Promise((res) => setTimeout(res, delay));
    };

    useEffect(() => {
        setPokemonDetails(false);
        setPokemonSpecies(false);
        setPokemonEvolution(false);
        setPokemonEvolveChain([]);
        (async () => {
            await pokemonClient
                .getPokemonByName(pokemonName)
                .then((data) => {
                    setPokemonDetails(data);
                })
                .catch((error) => console.error(error));
        })();
    }, [pokemonName]);

    useEffect(() => {
        if (pokemonDetails) {
            (async () => {
                const speciesDetails = await fetch(pokemonDetails.species.url);
                const speciesResult = await speciesDetails.json();
                setPokemonSpecies(speciesResult);
            })();
        }
    }, [pokemonDetails]);

    useEffect(() => {
        if (pokemonDetails) {
            (async () => {
                const evoulution = await fetch(
                    pokemonSpecies.evolution_chain.url
                );
                const evolutionResult = await evoulution.json();
                setPokemonEvolution(evolutionResult);
            })();
        }
    }, [pokemonSpecies]);

    useEffect(() => {
        if (pokemonEvolution) {
            let pokemonEvolvesMore = true;
            let pokemonEvolveArray = [];
            let level = pokemonEvolution.chain;
            while (pokemonEvolvesMore) {
                pokemonEvolveArray.push(level?.species?.name);
                if (level.evolves_to[0]) {
                    level = level.evolves_to[0];
                } else {
                    pokemonEvolvesMore = false;
                }
            }
            setPokemonEvolveChain(pokemonEvolveArray);
        }
    }, [pokemonEvolution]);

    useEffect(() => {
        if (pokemonEvolveChain.length > 0) {
            console.log(pokemonEvolveChain);

            const evolveChainDataTemp = [];
            async () => {
                await Promise.all(
                    pokemonEvolveChain.map(async (pokemonName) => {
                        await pokemonClient
                            .getPokemonByName(pokemonName)
                            .then((data) => {
                                evolveChainDataTemp.push(data);
                            })
                            .catch((error) => console.error(error));
                    })
                );
            };
            setEvolveChainData(evolveChainDataTemp);
        }
    }, [pokemonEvolveChain]);

    useEffect(() => {}, [evolveChainData]);

    return pokemonDetails && pokemonSpecies && pokemonEvolution ? (
        <div className='details-grid'>
            <Pokecard pokemon={pokemonDetails} />
            <div className='pokemon-details'>
                <h1>
                    {pokemonDetails.name.charAt(0).toUpperCase() +
                        pokemonDetails.name.slice(1) +
                        ' '}
                    Details
                </h1>
                <div className='pokemon-abilities'>
                    <h2>Abilities</h2>
                    <ul>
                        {pokemonDetails.abilities.map((ability) => (
                            <li key={ability.ability.name}>
                                {ability.ability.name}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='pokemon-species'>
                    <h2>Species</h2>
                    <ul>
                        <li>Base Happiness: {pokemonSpecies.base_happiness}</li>
                        <li>Capture Rate: {pokemonSpecies.capture_rate}</li>
                    </ul>
                </div>

                <div className='pokemon-species'>
                    <h2>Evolution Chain</h2>
                    {pokemonEvolveChain.map((pokemonName, i) => (
                        <>
                            <h3
                                class='evolution-step clickable-pokemon'
                                key={pokemonName}
                                onClick={() => setSelectedPokemon(pokemonName)}
                            >
                                {`${
                                    pokemonName.charAt(0).toUpperCase() +
                                    pokemonName.slice(1)
                                } `}
                            </h3>
                            <span>
                                {pokemonEvolveChain[i + 1] ? ' > ' : ''}
                            </span>
                        </>
                    ))}
                </div>

                <button
                    className='home-btn'
                    onClick={() => setSelectedPokemon(false)}
                >
                    Back to Home
                </button>
            </div>
        </div>
    ) : (
        <div className='loader-wrapper'>
            <PokeballLoader />
        </div>
    );
};

export default PokemonDetails;
