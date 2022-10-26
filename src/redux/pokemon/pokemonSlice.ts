import { createSlice } from '@reduxjs/toolkit';
import { Pokemon } from 'pokenode-ts';
import { RootState } from '../store';
import { fetchPokemon } from './fetchPokemon';
import { fetchPokemonList } from './fetchPokemonList';

type PokemonState = {
  status: 'loading' | 'idle';
  error: String | null;
  list: Array<String>;
  pokemonData: Array<Pokemon>;
};

const initialState: PokemonState = {
  list: [],
  error: null,
  status: 'idle',
  pokemonData: [],
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
      state.pokemonData.push(payload);
      /* This needs to be improved drastically, using a hashmap likely for O(1) lookup on pokemon fetched */
      const stateCopy = state.pokemonData.sort(function (a, b) {
        return a.id - b.id;
      });
      state.pokemonData = [...stateCopy];
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
