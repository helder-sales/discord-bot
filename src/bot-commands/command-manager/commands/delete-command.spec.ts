import { ChatInputCommandInteraction } from "discord.js";
import { DeleteCommand } from "./delete-command";

const chatInputCommandMock = {
  options: {
    get: jest.fn().mockReturnValue({ value: "Sandy Mamma-mia" }),
  },
} as unknown as ChatInputCommandInteraction;

describe("bot-chat-commands test", () => {
  it("should follow up with fail message when failing to delete a command", async () => {
    chatInputCommandMock.options.get = jest
      .fn()
      .mockReturnValue({ value: "wrong_cmd" });

    const botChatCommands = new DeleteCommand(chatInputCommandMock);

    chatInputCommandMock.followUp = jest.fn();
    jest
      .spyOn(botChatCommands as any, "deleteCommand")
      .mockResolvedValue(false);
    await botChatCommands.run();

    expect(chatInputCommandMock.followUp).toHaveBeenCalledWith({
      content: `Falha ao deletar o comando "wrong_cmd"`,
      ephemeral: true,
    });
    expect(chatInputCommandMock.followUp).toHaveBeenCalledTimes(1);
  });

  it("should delete a command successfully", async () => {
    chatInputCommandMock.options.get = jest
      .fn()
      .mockReturnValue({ value: "order_66" });

    const botChatCommands = new DeleteCommand(chatInputCommandMock);

    chatInputCommandMock.followUp = jest.fn();
    jest.spyOn(botChatCommands as any, "deleteCommand").mockResolvedValue(true);
    await botChatCommands.run();

    expect(chatInputCommandMock.followUp).toHaveBeenCalledWith({
      content: `Comando "order_66" deletado`,
      ephemeral: true,
    });
    expect(chatInputCommandMock.followUp).toHaveBeenCalledTimes(1);
  });
});
