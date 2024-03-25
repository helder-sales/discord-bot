import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { BuildInfo } from "../../build-info/build-info";
import { BuildCommand } from "./build-command";

const chatInputCommandMock = {
  options: {
    get: jest.fn().mockReturnValue({ value: "Sandy Mamma-mia" }),
  },
} as unknown as ChatInputCommandInteraction;

describe("bot-chat-commands test", () => {
  beforeAll(() => {
    jest.spyOn(BuildInfo.prototype, "getBuild").mockImplementation(() => {
      return jest.fn() as unknown as EmbedBuilder;
    });
  });

  it("should follow up with invalid character message when character name is invalid", () => {
    jest
      .spyOn(BuildInfo.prototype, "isValidCharacter")
      .mockImplementation(() => false);

    const botChatCommands = new BuildCommand(chatInputCommandMock);

    chatInputCommandMock.followUp = jest.fn();
    botChatCommands.run();

    expect(chatInputCommandMock.followUp).toHaveBeenCalledWith({
      content: "Por favor insira corretamente o nome do personagem!",
      ephemeral: true,
    });
    expect(chatInputCommandMock.followUp).toHaveBeenCalledTimes(1);
  });

  it("should follow up with EmbedBuild when character is valid", () => {
    const botChatCommands = new BuildCommand(chatInputCommandMock);

    chatInputCommandMock.followUp = jest.fn();
    jest
      .spyOn(botChatCommands as any, "checkIfCharacterIsValid")
      .mockResolvedValue(true);
    botChatCommands.run();

    expect(chatInputCommandMock.followUp).toHaveBeenCalledWith({
      embeds: [expect.anything()],
      files: [expect.anything()],
      ephemeral: true,
    });
    expect(chatInputCommandMock.followUp).toHaveBeenCalledTimes(1);
  });
});
