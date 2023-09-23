import { Ping } from '@discord-point-bot/commands';
import { InteractionCreate, MessageCreate, Ready } from '@discord-point-bot/events';
import { PointInfo } from '@discord-point-bot/slash-commands';

import { config } from '@config';
import { ActivityType, Collection, Client as Core, GatewayIntentBits } from 'discord.js';
import { map } from 'lodash';
import { connect } from 'mongoose';
import { createLogger, format, transports } from 'winston';

export class Client extends Core {
  commands = new Collection<string, DiscordType.ICommand>();
  slashCommands = new Collection<string, DiscordType.ISlashCommand>();
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

  private async loadCommands() {
    const commands: DiscordType.ICommand[] = [Ping];

    await Promise.all(
      map(commands, async (command) => this.commands.set(command.usages[0], command)),
    );
  }

  private async loadSlashCommands() {
    const slashCommands: DiscordType.ISlashCommand[] = [PointInfo];
    await Promise.all(
      map(slashCommands, async (slashCommand) =>
        this.slashCommands.set(slashCommand.data.name, slashCommand),
      ),
    );
  }

  private async loadEvents() {
    const events: DiscordType.IEvent[] = [Ready, MessageCreate, InteractionCreate];

    await Promise.all(
      map(events, async (event) =>
        this.on(event.name, (...args: unknown[]) => event.execute(this, [...args])),
      ),
    );
  }

  async connect() {
    await Promise.all([
      connect(config.DBACCESS),
      this.loadCommands(),
      this.loadEvents(),
      this.loadSlashCommands(),
    ]);

    await this.login(config.BOT_TOKEN);
  }
}
