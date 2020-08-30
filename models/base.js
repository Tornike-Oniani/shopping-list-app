const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

module.exports = async () => {
  return open({
    filename: path.resolve(__dirname, '../database.sqlite3'),
    driver: sqlite3.Database,
  });
};
