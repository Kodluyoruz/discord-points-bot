import { ButtonCustomId, SelectMenuCustomId } from '@discord-point-bot/constants';

import {
  AnySelectMenuInteraction,
  ApplicationCommand,
  ButtonInteraction,
  ChatInputCommandInteraction,
  ClientEvents,
  Locale,
  MessageContextMenuCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import { Client } from 'src/structures/Client';

declare global {
  namespace DiscordType {
    export interface IVoice {
      date: number;
    }

    export interface SlashCommandArgs {
      client: Client;
      interaction:
        | ChatInputCommandInteraction
        | MessageContextMenuCommandInteraction
        | UserContextMenuCommandInteraction;
      lng: Locale;
    }

    export type EventKeys = keyof ClientEvents;
    export type ArgsOf<K extends EventKeys> = ClientEvents[K];

    export interface ISlashCommand {
      data: Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
      applicationCommand?: ApplicationCommand;
      execute: (slashCommandArgs: SlashCommandArgs) => Promise<void> | void;
    }

    export interface ButtonArgs {
      client: Client;
      interaction: ButtonInteraction;
      lng: Locale;
    }

    export interface SelectMenuArgs<T extends AnySelectMenuInteraction = AnySelectMenuInteraction> {
      client: Client;
      interaction: T;
      lng: Locale;
    }

    export interface IModalSubmit {
      customId: string;
      execute: (modalArgs: ModalArgs) => Promise<void> | void;
    }

    export interface ModalArgs {
      client: Client;
      interaction: ModalSubmitInteraction;
      lng: Locale;
    }

    export interface IButton {
      customId: keyof typeof ButtonCustomId;
      execute: (buttonArgs: ButtonArgs) => Promise<unknown> | unknown;
    }

    export interface ISelectMenu<T extends AnySelectMenuInteraction = AnySelectMenuInteraction> {
      customId: keyof typeof SelectMenuCustomId;
      execute: (selectArgs: SelectMenuArgs<T>) => Promise<unknown> | unknown;
    }

    export interface IEvent {
      name: EventKeys;
      execute: (client: Client, ...args: unknown[]) => Promise<void> | void;
    }

    export type EditReplySupportedInteraction =
      | CommandInteraction
      | ModalSubmitInteraction
      | MessageComponentInteraction;
  }
}
