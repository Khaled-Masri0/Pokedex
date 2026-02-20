import { State } from "./state.js";
export async function commandHelp(state: State): Promise<void> {
  console.log("\nWelcome to the Pokedex!");
  console.log("Usage:\n");

 Object.values(state.commands).forEach((cmd) => {
    console.log(`${cmd.name}: ${cmd.description}`);
  });

  console.log(""); 
}