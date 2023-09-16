import { Ping } from '@discord-point-bot/commands';
import { MessageCreate, Ready } from '@discord-point-bot/events';

import { config } from '@config';
import { ActivityType, Collection, Client as Core, GatewayIntentBits } from 'discord.js';
import { map } from 'lodash';
import { connect } from 'mongoose';

export class Client extends Core {
  commands = new Collection<string, DiscordType.ICommand>();

  constructor() {
    super({
      intents: Object.keys(GatewayIntentBits).map((intent) => GatewayIntentBits[intent]),
      presence: { activities: [{ name: '', type: ActivityType.Watching }] },
    });
  }

  private async loadCommands() {
    const commands = [Ping];
    await Promise.all(
      map(commands, async (command) => this.commands.set(command.usages[0], command)),
    );
  }

  private async loadEvents() {
    const events = [Ready, MessageCreate];
    await Promise.all(
      map(events, async (event) =>
        this.on(event.name, (...args: unknown[]) => event.execute(this, [...args])),
      ),
    );
  }

  async connect() {
    await Promise.all([connect(config.DBACCESS), this.loadCommands(), this.loadEvents()]);

    await this.login(config.BOT_TOKEN);
  }
}
