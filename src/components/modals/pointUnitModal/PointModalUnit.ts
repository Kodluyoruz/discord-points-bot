import { PointUnitType, PointUnitsModel } from "@discord-point-bot/models";


export const PointModalUnit: DiscordType.IModalSubmit = {
  customId: "pointUnit",
  execute: async ({ interaction }) => {

    const firstActionRow =  interaction.fields.getTextInputValue("point_unit/add_unit/scoring_name");
    const secondActionRow = interaction.fields.getTextInputValue("point_unit/add_unit/scoring_desc");
    const thirdActionRow = interaction.fields.getTextInputValue("point_unit/add_unit/point_score");

      await PointUnitsModel.findOneAndUpdate({
        guildId: interaction.guild.id,
        type: PointUnitType.VOICE,
        title: firstActionRow,
      },{
        guildId: interaction.guild.id,
        type: PointUnitType.VOICE,
        title: firstActionRow,
        description: secondActionRow,
        point: thirdActionRow,
      },{upsert:true});
  },
};
