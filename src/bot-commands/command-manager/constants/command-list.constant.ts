import {
  ApplicationCommandDataResolvable,
  ApplicationCommandOptionType,
} from "discord.js";

export const commandList: Array<ApplicationCommandDataResolvable> = [
  {
    name: "build",
    nameLocalizations: {
      "en-US": "build",
    },
    description: "Mostra a build do personagem",
    descriptionLocalizations: {
      "en-US": "Show the character's build",
    },
    options: [
      {
        name: "char_name",
        nameLocalizations: {
          "en-US": "char_name",
        },
        description: "Insira o nome do personagem",
        descriptionLocalizations: {
          "en-US": "Insert the character's name",
        },
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
  {
    name: "delcmd",
    nameLocalizations: {
      "en-US": "delcmd",
    },
    description: "Deleta comando",
    descriptionLocalizations: {
      "en-US": "Deletes the command",
    },
    options: [
      {
        name: "comando",
        nameLocalizations: {
          "en-US": "command",
        },
        description: "Insira o nome do comando",
        descriptionLocalizations: {
          "en-US": "Insert the command name",
        },
        required: true,
        type: ApplicationCommandOptionType.String,
      },
    ],
  },
];
