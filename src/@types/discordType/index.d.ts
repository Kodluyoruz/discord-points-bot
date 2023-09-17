import {
  CacheType,
  ChatInputCommandInteraction,
  ClientEvents,
  Interaction,
  Message,
  MessageContextMenuCommandInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { Client } from 'src/structures/Client';

declare global {
  namespace DiscordType {
    export interface ICommand {
      usages: string[];
      execute: (commandArgs: CommandArgs) => Promise<unknown> | unknown;
    }

    export interface CommandArgs {
      client: Client;
      message: Message;
      args: string[];
    }

    export interface SlashCommandArgs {
      client: Client;
      interaction:
        | ChatInputCommandInteraction<CacheType>
        | MessageContextMenuCommandInteraction<CacheType>
        | UserContextMenuCommandInteraction<CacheType>;
    }

    export type EventKeys = keyof ClientEvents;
    export type ArgsOf<K extends EventKeys> = ClientEvents[K];

    export interface ISlashCommand {
      data: SlashCommandBuilder;
      execute: (slashCommandArgs: SlashCommandArgs) => Promise<void> | void;
    }

    export interface IEvent {
      name: EventKeys;
      execute: (client: Client, ...args: any[]) => Promise<void> | void;
    }
  }
}
