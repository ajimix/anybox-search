const path = require('path');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const { homedir } = require('os');
const { existsSync } = require('fs');
const debug = false;

let client;

/**
 * The database loads on file load, so we just wait for client to have some value.
 * @returns {Promise<dbClient>}
 */
async function loadDb() {
  while (client === undefined) {
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
  return Promise.resolve(client);
}

if (debug) {
  sqlite3.verbose();
}

const filename = debug
  ? path.resolve(homedir(), 'Desktop/Anybox.sqlite')
  : path.resolve(homedir(), 'Library/Group Containers/group.cc.anybox.Anybox/Anybox.sqlite');

if (!existsSync(filename)) {
  console.error(`${filename} database does not exist`);
  process.exit(1);
}

open({
  filename,
  mode: sqlite3.OPEN_READONLY,
  driver: sqlite3.cached.Database,
})
  .then((db) => {
    client = db;
    if (debug) {
      db.on('trace', console.log);
    }
  })
  .catch(console.error);

module.exports = {
  /**
   * Returns the global client
   * @returns {object} The db client
   */
  get client() {
    return client;
  },
  loadDb,
};
