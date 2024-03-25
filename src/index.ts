import DiscordJS, {
  GatewayIntentBits,
  GuildApplicationCommandManager,
  Interaction,
} from "discord.js";
import dotenv from "dotenv";
import { CommandManager } from "./bot-commands/command-manager/command-manager";
import { commandList } from "./bot-commands/command-manager/constants/command-list.constant";

dotenv.config();
process.stdout.write("Loading");

const initInterval: NodeJS.Timer = setInterval(
  () => process.stdout.write("."),
  100
);
const client = new DiscordJS.Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

async function onReady() {
  clearInterval(initInterval);
  console.log("Ready");

  for (const guildId of process.env.GUILD_IDS!.split(",")) {
    const guild = client.guilds.cache.get(guildId);
    const commandManager: GuildApplicationCommandManager = guild!.commands;

    for (const command of commandList) {
      commandManager?.create(command);
    }
  }
}

async function interaction(interaction: Interaction) {
  const commandManager = new CommandManager();

  if (interaction.isChatInputCommand()) {
    commandManager.processChatCommand(interaction);
  }
}

client.on("ready", onReady);
client.on("interactionCreate", interaction);
client.login(process.env.BOT_TOKEN);
