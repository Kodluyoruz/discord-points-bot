import { ReadPreference } from 'mongodb';
import { ClientSession, Connection } from 'mongoose';

export async function withTransaction<T>(
  connectionOrExistingSession: Connection | ClientSession,
  closure: (session: ClientSession) => Promise<T>,
) {
  if (connectionOrExistingSession instanceof Connection) {
    let result: T;
    const readPreference = new ReadPreference(ReadPreference.PRIMARY);
    const session = await connectionOrExistingSession.startSession({
      defaultTransactionOptions: { readPreference },
    });

    await session.withTransaction<T>(
      async () => {
        result = await closure(session);
        return result;
      },
      { readPreference },
    );

    return result;
  }

  return await closure(connectionOrExistingSession);
}
