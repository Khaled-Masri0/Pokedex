import { createInterface, type Interface } from "node:readline";
import { commandExit } from "./command_exit.js";
import { commandHelp } from "./command_help.js";
import { commandMap } from "./command_map.js";
import { commandMapBack } from "./command_mapb.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";
import { PokeAPI } from "./pokeapi.js";
import { type Pokemon } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};
export type State = {
  rl: Interface;
  commands: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string | null;
  prevLocationsURL: string | null;
  pokedex: Record<string, Pokemon>;
};

export function initState(): State {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  const pokeapi = new PokeAPI();

  const state: State = {
    rl,
    commands: {} as Record<string, CLICommand>,
    pokeapi,
    nextLocationsURL: null,
    prevLocationsURL: null,
    pokedex: {},
  };

  state.commands = {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exits the pokedex",
      callback: commandExit,
    },
    map: {
      name: "map",
      description: "Displays the next 20 locations",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Displays the previous 20 locations",
      callback: commandMapBack,
    },
    explore: {
  name: "explore",
  description: "Explore a location area for Pokemon",
  callback: commandExplore,
},
catch: {
  name: "catch",
  description: "Attempt to catch a Pokemon",
  callback: commandCatch,
},
inspect: {
  name: "inspect",
  description: "Inspect a caught Pokemon",
  callback: commandInspect,
},
pokedex: {
  name: "pokedex",
  description: "Lists all caught Pokemon",
  callback: commandPokedex,
},
  };

  return state;
}