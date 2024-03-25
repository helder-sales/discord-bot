import { ChatInputCommandInteraction } from "discord.js";
import { BuildInfo } from "../../build-info/build-info";
import { Command } from "../interfaces/command.interface";

export class BuildCommand implements Command {
  constructor(private readonly chatInputCommand: ChatInputCommandInteraction) {}

  run() {
    const charName = this.chatInputCommand.options.get("char_name")
      ?.value as string;
    const build = new BuildInfo(charName);

    if (!this.checkIfCharacterIsValid(build)) {
      return;
    }

    this.chatInputCommand.followUp({
      embeds: [build.getBuild()],
      files: [build.getCharacterBuildImageURL()],
      ephemeral: true,
    });
    return;
  }

  private checkIfCharacterIsValid(build: BuildInfo): boolean {
    if (build.isValidCharacter()) {
      return true;
    } else {
      this.chatInputCommand.followUp({
        content: "Por favor insira corretamente o nome do personagem!",
        ephemeral: true,
      });
      return false;
    }
  }
}
