import * as envalid from 'envalid';

export const config = envalid.cleanEnv(process.env, {
  BOT_TOKEN: envalid.str({ desc: 'Token that the bot will use.' }),
  DBACCESS: envalid.str({ desc: 'Mongo DB connection string' }),
});
