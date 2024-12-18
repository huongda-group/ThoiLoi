import ArangoJS from 'arangojs';
import * as console from 'node:console';

const db = ArangoJS({
  url: process.env.ARANGO_HOST,
  databaseName: process.env.ARANGO_DB,
  auth: {
    username: process.env.ARANGO_USERNAME,
    password: process.env.ARANGO_PASSWORD
  }
});

db.version().then(
  () => {
    console.info(`---------------------------------`);
    console.info(`🚀 Connect to Arango success`);
    console.info(`---------------------------------`);
  },
  error => {
    console.error(error);
    process.exit(1);
  }
);

export default db;
