import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(30000); 

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.#cache.get<ShallowLocations>(url);
    if (cached) {
      console.log("Cache hit:", url);
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch locations");
    }

    const data: ShallowLocations = await res.json();
    this.#cache.add(url, data);
    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.#cache.get<Location>(url);
    if (cached) {
      console.log("Cache hit:", url);
      return cached;
    }

    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch location");
    }

    const data: Location = await res.json();
    this.#cache.add(url, data);
    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
  const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

  const cached = this.#cache.get<Pokemon>(url);
  if (cached) return cached;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch pokemon: ${pokemonName}`);

  const data: Pokemon = await res.json();
  this.#cache.add(url, data);
  return data;
}
}



export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  types: {
    type: { name: string };
  }[];
};