import { config } from 'dotenv';
import { connect } from 'mongoose';

config();

/**
 * Connect to the database
 */

const server = async () => {
  const { MONGO_URI, MONGO_URI_TEST, NODE_ENV } = process.env;
  const conn = await connect(
    NODE_ENV === 'test' ? MONGO_URI_TEST : MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  );
  console.log(
    `DB Connected: ${conn.connection.host} in ${NODE_ENV} mode`,
  );
};

export default server;
