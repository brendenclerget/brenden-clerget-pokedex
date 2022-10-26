import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchPokemon = createAsyncThunk(
  'pokemon/fetch',
  async (pokemonName: String) => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName}/`
    );
    const data = await response.json();
    return data;
  }
);
