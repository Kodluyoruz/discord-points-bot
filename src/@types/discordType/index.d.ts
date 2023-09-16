import { ClientEvents, Message } from 'discord.js';
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

    export type EventKeys = keyof ClientEvents;
    export type ArgsOf<K extends EventKeys> = ClientEvents[K];

    export interface IEvent {
      name: EventKeys;
      execute: (client: Client, ...args: any[]) => Promise<void> | void;
    }
  }
}
