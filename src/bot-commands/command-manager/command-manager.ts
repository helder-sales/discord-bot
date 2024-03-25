import { ChatInputCommandInteraction } from "discord.js";
import { BuildCommand } from "./commands/build-command";
import { DeleteCommand } from "./commands/delete-command";
import { Command } from "./interfaces/command.interface";

export class CommandManager {
  async processChatCommand(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true });

    switch (interaction.commandName) {
      case "build":
        this.runCommand(new BuildCommand(interaction));
        break;

      case "delcmd":
        this.runCommand(new DeleteCommand(interaction));
        break;

      default:
        break;
    }
  }

  private runCommand(command: Command) {
    command.run();
  }
}
