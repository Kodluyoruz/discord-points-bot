import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';

import {
  AnySelectMenuInteraction,
  ButtonInteraction,
  CacheType,
  ChatInputCommandInteraction,
  ClientEvents,
  Locale,
  Message,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { Client } from 'src/structures/Client';

declare global {
  namespace DiscordType {
    export interface SlashCommandArgs {
      client: Client;
      interaction:
        | ChatInputCommandInteraction<CacheType>
        | MessageContextMenuCommandInteraction<CacheType>
        | UserContextMenuCommandInteraction<CacheType>;
      lang: Locale;
    }

    export type EventKeys = keyof ClientEvents;
    export type ArgsOf<K extends EventKeys> = ClientEvents[K];

    export interface ISlashCommand {
      data: SlashCommandBuilder;
      execute: (slashCommandArgs: SlashCommandArgs) => Promise<void> | void;
    }

    export interface ICommand {
      usages: string[];
      execute: (commandArgs: {
        client: Client;
        message: Message;
        args: string[];
      }) => Promise<unknown> | unknown;
    }

    export interface ButtonArgs {
      client: Client;
      interaction: ButtonInteraction;
      lang: Locale;
    }

    export interface IButton {
      customId: keyof typeof ButtonCustomId;
      execute: (buttondArgs: ButtonArgs) => Promise<unknown> | unknown;
    }

    export interface ISelectMenu {
      customId: keyof typeof SelectMenuCustomId;
      execute: (buttondArgs: {
        client: Client;
        interaction: AnySelectMenuInteraction;
        lang: Locale;
      }) => Promise<unknown> | unknown;
    }

    export interface IEvent {
      name: EventKeys;
      execute: (client: Client, ...args: any[]) => Promise<void> | void;
    }
  }
}
