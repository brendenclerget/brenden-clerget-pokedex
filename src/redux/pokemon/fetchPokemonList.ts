import { createAsyncThunk } from '@reduxjs/toolkit';

import { NamedAPIResourceList } from 'pokenode-ts';

export const fetchPokemonList = createAsyncThunk<NamedAPIResourceList>(
    'pokemonList/fetch',
    async () => {
        const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/?limit=1154`
        );
        const data = await response.json();
        return data;
    }
);
