# Pokedex

A small TypeScript CLI Pokedex that uses the [PokeAPI](https://pokeapi.co/) to browse location areas, explore encounters, catch Pokemon, and inspect the ones you have collected.

## Features

- Interactive REPL with a `Pokedex >` prompt
- Browse location areas with forward/back pagination
- Explore a location to see which Pokemon appear there
- Catch Pokemon and store them in a local in-memory Pokedex
- Inspect caught Pokemon details such as stats, height, weight, and types
- Simple response cache for API requests

## Tech Stack

- TypeScript
- Node.js
- Vitest
- PokeAPI

## Getting Started

### Prerequisites

- Node.js 18+ (required for built-in `fetch`)
- npm

### Install

```bash
git clone https://github.com/Khaled-Masri0/Pokedex.git
cd Pokedex
npm install
```

### Run

Build the project:

```bash
npm run build
```

Start the CLI:

```bash
npm start
```

Or build and start in one step:

```bash
npm run dev
```

### Test

```bash
npm test
```

## Available Commands

Once the CLI is running, you can use:

- `help` - Show the available commands
- `map` - Show the next 20 location areas
- `mapb` - Show the previous 20 location areas
- `explore <location-area>` - List Pokemon encounters in a location area
- `catch <pokemon>` - Attempt to catch a Pokemon
- `inspect <pokemon>` - Show details for a caught Pokemon
- `pokedex` - List all caught Pokemon
- `exit` - Quit the CLI

## Example

```text
Pokedex > help
Pokedex > map
Pokedex > explore canalave-city-area
Pokedex > catch pikachu
Pokedex > inspect pikachu
Pokedex > pokedex
Pokedex > exit
```

## Project Structure

```text
src/
  main.ts          Entry point
  repl.ts          REPL loop and input parsing
  state.ts         Shared application state and command registry
  pokeapi.ts       PokeAPI client
  pokecache.ts     In-memory cache
  command_*.ts     CLI commands
```
