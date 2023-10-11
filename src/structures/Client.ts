import { ButtonList, SelectMenuList } from '@discord-point-bot/components';
import * as EventList from '@discord-point-bot/events';
import * as SlashCommandList from '@discord-point-bot/slash-commands';

import { config } from '@config';
import { ActivityType, Collection, Client as Core, GatewayIntentBits } from 'discord.js';
import { map } from 'lodash';
import { connect } from 'mongoose';
import { createLogger, format, transports } from 'winston';

export class Client extends Core {
  slashCommands = new Collection<string, DiscordType.ISlashCommand>();
  buttons = new Collection<string, DiscordType.IButton>();
  selectMenus = new Collection<string, DiscordType.ISelectMenu>();
  voices = new Collection<string, DiscordType.IVoice>();

  logger = createLogger({
    format: format.combine(
      format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
      format.colorize({
        all: true,
        colors: { info: 'green', error: 'red', warn: 'yellow', debug: 'blue' },
      }),
      format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
    ),
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/error.log', level: 'error' }),
      new transports.File({ filename: 'logs/combined.log' }),
    ],
  });

  constructor() {
    super({
      intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
      presence: { activities: [{ name: '', type: ActivityType.Watching }] },
    });
  }

  private errorHandleInit() {}

  private async loadSelectMenu() {
    const selectMenus: DiscordType.ISelectMenu[] = [...Object.values(SelectMenuList)];

    await Promise.all(
      map(selectMenus, async (selectMenu) => this.selectMenus.set(selectMenu.customId, selectMenu)),
    );
  }

  private async loadSlashCommands() {
    const slashCommands: DiscordType.ISlashCommand[] = [...Object.values(SlashCommandList)];

    await Promise.all(
      map(slashCommands, async (slashCommand) =>
        this.slashCommands.set(slashCommand.data.name, slashCommand),
      ),
    );
  }

  private async loadButtons() {
    const buttons: DiscordType.IButton[] = [...Object.values(ButtonList)];

    await Promise.all(map(buttons, async (button) => this.buttons.set(button.customId, button)));
  }

  private async loadEvents() {
    this.errorHandleInit();

    const events: DiscordType.IEvent[] = [...Object.values(EventList)];

    await Promise.all(
      map(events, async (event) =>
        this.on(event.name, (...args: unknown[]) => event.execute(this, [...args])),
      ),
    );
  }

  async connect() {
    await Promise.all([
      connect(config.DBACCESS),
      this.loadSlashCommands(),
      this.loadButtons(),
      this.loadSelectMenu(),
      this.loadEvents(),
    ]);

    await this.login(config.BOT_TOKEN);
  }
}
