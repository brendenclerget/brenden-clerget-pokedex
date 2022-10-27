import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { fetchPokemon } from './fetchPokemon';
import { fetchPokemonList } from './fetchPokemonList';

type PokemonState = {
    status: 'loading' | 'idle';
    error: String | null;
    list: Array<String>;
    pokemonData: any;
    activePokemon: String | null;
};

const initialState: PokemonState = {
    list: [],
    error: null,
    status: 'idle',
    pokemonData: {},
    activePokemon: null,
};

export const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPokemonList.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });

        builder.addCase(fetchPokemonList.fulfilled, (state, { payload }) => {
            payload.results.map((thisPokemon) => {
                state.list.push(thisPokemon.name);
            });
            state.status = 'idle';
        });

        builder.addCase(fetchPokemonList.rejected, (state, { payload }) => {
            if (payload) state.error = 'Error fetching pokemon';
            state.status = 'idle';
        });

        builder.addCase(fetchPokemon.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        });

        builder.addCase(fetchPokemon.fulfilled, (state, { payload }) => {
            state.pokemonData[payload.name] = payload;
            state.status = 'idle';
        });

        builder.addCase(fetchPokemon.rejected, (state, { payload }) => {
            if (payload) state.error = 'Error fetching pokemon';
            state.status = 'idle';
        });
    },
});

export default pokemonSlice.reducer;

export const selectPokemonList = (state: RootState) => state.pokemon;
export const selectPokemonStatus = (state: RootState) => state.pokemon.status;
