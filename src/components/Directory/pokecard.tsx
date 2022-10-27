interface PokeCardProps {
    pokemon: any;
    onClick?: () => void;
}

const Pokecard = ({ pokemon, onClick = () => {} }: PokeCardProps) => {
    return (
        pokemon && (
            <div key={pokemon.id} className='pokecard' onClick={onClick}>
                <div className='pokecard-number'>#{pokemon.id}</div>
                <div className='pokecard-image'>
                    <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
                    />
                </div>
                <div className='pokecard-name'>
                    {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                </div>

                <div className='pokecard-types'>
                    {pokemon.types.map((pokemonType) => (
                        <div className='pokecard-types-pill'>
                            {pokemonType.type.name.charAt(0).toUpperCase() +
                                pokemonType.type.name.slice(1)}
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default Pokecard;
