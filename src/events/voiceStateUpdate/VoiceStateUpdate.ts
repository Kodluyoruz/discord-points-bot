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

    // TODO: Kanalda başka kullanıcı var yok kontrolü yapılabilir.
    // kanaldan ayrılırken son bir kullanıcı kalmışsa kalan kullanıcıya puanı verilmeli
    // çünkü kullanıcı daha önceden konuştuğu sürenin puanını kanalda kendi kaldığı için
    // alamamış olabilir.
    // kullanıcı sağır yada susturulmuş kontrolü yapılabilir.
    // const memberCount = newState.channel.members.size;

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
    const value = Math.floor((now - voice.date) / 1000);

    if (isMuted || (!newChannelId && oldChannelId)) {
      client.voices.delete(oldState.id);
      await UserPointModel.pointAdd({
        guild: oldState.guild,
        userId,
        type: 'VOICE',
        value,
        channelId: oldChannelId,
        categoryId: oldParentId,
      });
    } else if (newChannelId && oldChannelId && newChannelId !== oldChannelId) {
      client.voices.set(oldState.id, { date: now });
      await UserPointModel.pointAdd({
        guild: oldState.guild,
        userId,
        type: 'VOICE',
        value,
        channelId: newChannelId,
        categoryId: newParentId,
      });
    }
  },
};
