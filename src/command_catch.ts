import { type State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
  const pokemonName = args[0];
  if (!pokemonName) {
    console.log("Please provide a pokemon name");
    return;
  }

  console.log(`Throwing a Pokeball at ${pokemonName}...`);

  const pokemon = await state.pokeapi.fetchPokemon(pokemonName);


  const catchChance = 1 / (1 + pokemon.base_experience / 100);

  if (Math.random() > catchChance) {
    console.log(`${pokemonName} escaped!`);
    return;
  }

  console.log(`${pokemonName} was caught!`);
console.log("You may now inspect it with the inspect command.");
  state.pokedex[pokemonName] = pokemon;
}