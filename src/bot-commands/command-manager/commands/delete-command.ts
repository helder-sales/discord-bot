import { ChatInputCommandInteraction, Guild } from "discord.js";
import { Command } from "../interfaces/command.interface";

export class DeleteCommand implements Command {
  private readonly guild: Guild;

  constructor(private readonly chatInputCommand: ChatInputCommandInteraction) {
    this.guild = this.chatInputCommand.guild!;
  }

  async run() {
    const cmdName = this.chatInputCommand.options.get("comando")
      ?.value as string;

    if (!(await this.deleteCommand(cmdName))) {
      this.chatInputCommand.followUp({
        content: `Falha ao deletar o comando "${cmdName}"`,
        ephemeral: true,
      });
      return;
    }

    this.chatInputCommand.followUp({
      content: `Comando "${cmdName}" deletado`,
      ephemeral: true,
    });
  }

  private async deleteCommand(commandName: string): Promise<boolean> {
    const command = (await this.guild.commands.fetch()).find(
      (cmd) => cmd.name === commandName
    );

    if (command) {
      this.guild?.commands.delete(`${command.id}`);
      return true;
    } else {
      return false;
    }
  }
}
