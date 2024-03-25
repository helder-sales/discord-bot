import { CacheType, ChatInputCommandInteraction } from "discord.js";
import { CommandManager } from "./command-manager";
import { BuildCommand } from "./commands/build-command";
import { DeleteCommand } from "./commands/delete-command";

const chatInputCommandMock = {
  options: {
    get: jest.fn().mockReturnValue({ value: "Sandy Mamma-mia" }),
  },
  deferReply: jest.fn(),
} as unknown as ChatInputCommandInteraction<CacheType>;

jest.mock("./commands/build-command");
jest.mock("./commands/delete-command");

describe("command-manager test", () => {
  it("should run build command", async () => {
    chatInputCommandMock.commandName = "build";
    const runMethod = jest
      .spyOn(BuildCommand.prototype, "run")
      .mockImplementation(() => {});

    const commandManager = new CommandManager();

    await commandManager.processChatCommand(chatInputCommandMock);

    expect(BuildCommand).toHaveBeenCalledTimes(1);
    expect(runMethod).toHaveBeenCalledTimes(1);
  });

  it("should run delete command", async () => {
    chatInputCommandMock.commandName = "delcmd";
    const runMethod = jest
      .spyOn(DeleteCommand.prototype, "run")
      .mockImplementation(async () => {});

    const commandManager = new CommandManager();

    await commandManager.processChatCommand(chatInputCommandMock);

    expect(DeleteCommand).toHaveBeenCalledTimes(1);
    expect(runMethod).toHaveBeenCalledTimes(1);
  });
});
