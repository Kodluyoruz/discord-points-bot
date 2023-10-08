import { Events } from 'discord.js';
import { UserPointModel } from 'src/models/point';

export const VoiceStateUpdate: DiscordType.IEvent = {
  name: Events.VoiceStateUpdate,
  execute: async (client, [oldState, newState]: DiscordType.ArgsOf<'voiceStateUpdate'>) => {
    const isMuted = newState.selfMute || newState.selfDeaf;
    const [
      { id: oldChannelId, parentId: oldParentId },
      { id: newChannelId, parentId: newParentId },
    ] = [oldState.channel || {}, newState.channel || {}];
    const [guildId, userId] = [oldState.guild?.id, oldState.member?.id];

    if (
      !guildId ||
      !userId ||
      oldState.member.user.bot ||
      (!newChannelId && oldChannelId && isMuted)
    ) {
      return;
    }

    const now = Date.now();
    const defaultQuery = { date: now };

    if (!newChannelId && oldChannelId) {
      client.voices.set(oldState.id, defaultQuery);
      return;
    }

    if (!client.voices.has(oldState.id)) {
      client.voices.set(oldState.id, defaultQuery);
    }

    const voice = client.voices.get(oldState.id);
    const value = now - voice.date;

    if (isMuted || (!newChannelId && oldChannelId)) {
      client.voices.delete(oldState.id);
      await UserPointModel.pointAdd({
        guildId,
        userId,
        type: 'VOICE',
        value,
        channelId: oldChannelId,
        categoryId: oldParentId,
      });
    } else if (newChannelId && oldChannelId && newChannelId !== oldChannelId) {
      client.voices.set(oldState.id, { date: now });
      await UserPointModel.pointAdd({
        guildId,
        userId,
        type: 'VOICE',
        value,
        channelId: newChannelId,
        categoryId: newParentId,
      });
    }
  },
};
