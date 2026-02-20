import { initState } from "./state.js";

export function cleanInput(input: string): string[] {
  return input.trim().toLowerCase().split(/\s+/).filter((word) => word !== "");
}

export function startREPL() {
  const state = initState();

  state.rl.prompt();

  state.rl.on("line", async (input: string) => {
    const words = cleanInput(input);

    if (words.length === 0) {
      state.rl.prompt();
      return;
    }

    const commandName = words[0];
    const command = state.commands[commandName];

    if (!command) {
      console.log(`Unknown command: ${commandName}`);
      state.rl.prompt();
      return;
    }

    try {
      await command.callback(state, ...words.slice(1));
    } catch (err) {
      console.log("Error:", err);
    }

    state.rl.prompt();
  });
}