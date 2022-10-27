import { NamedAPIResource } from 'pokenode-ts';
import { useEffect, useState } from 'react';
import './typeahead.scss';

interface TypeaheadProps {
    suggestions: Array<NamedAPIResource>;
    setSelectedPokemon: (pokemonName: string) => void;
}

const Typeahead = ({ suggestions, setSelectedPokemon }: TypeaheadProps) => {
    const [active, setActive] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [input, setInput] = useState('');
    const [pokemonValue, setPokemonValue] = useState('');

    useEffect(() => {
        if (pokemonValue !== undefined && pokemonValue !== '') {
            setSelectedPokemon(pokemonValue);
        }
    }, [pokemonValue]);

    const onChange = (e) => {
        const input = e.currentTarget.value;
        const newFilteredSuggestions = suggestions.filter(
            (suggestion) =>
                suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );
        setActive(0);
        setFiltered(newFilteredSuggestions);
        setIsShow(true);
        setInput(e.currentTarget.value);
    };
    const onClick = (e) => {
        setActive(0);
        setFiltered([]);
        setIsShow(false);
        setInput(e.currentTarget.innerText);
        setPokemonValue(filtered[active]);
    };
    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
            // enter key
            setActive(0);
            setIsShow(false);
            setInput(filtered[active]);
            setPokemonValue(filtered[active]);
        } else if (e.keyCode === 38) {
            // up arrow
            return active === 0 ? null : setActive(active - 1);
        } else if (e.keyCode === 40) {
            // down arrow
            return active - 1 === filtered.length
                ? null
                : setActive(active + 1);
        }
    };
    const renderAutocomplete = () => {
        if (isShow && input) {
            if (filtered.length) {
                return (
                    <ul className='autocomplete'>
                        {filtered.map((suggestion, index) => {
                            let className;
                            if (index === active) {
                                className = 'active';
                            }
                            return (
                                <li
                                    className={className}
                                    key={suggestion + 'li'}
                                    onClick={onClick}
                                >
                                    {suggestion}
                                </li>
                            );
                        })}
                    </ul>
                );
            } else {
                return (
                    <div className='no-autocomplete'>
                        <em>No Pokemon Found</em>
                    </div>
                );
            }
        }
        return <></>;
    };
    return (
        <>
            <div className='search'>
                <input
                    type='text'
                    className='search-input'
                    name='pokemon-search'
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    value={input}
                    autoComplete='off'
                />
                {renderAutocomplete()}
            </div>
        </>
    );
};
export default Typeahead;
