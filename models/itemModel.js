const openCon = require('./base');

exports.getItems = async () => {
  const db = await openCon();

  const items = await db.all('SELECT Name FROM Items', []);

  db.close();

  return items;
};

exports.getItem = async (id) => {
  const db = await openCon();

  const item = await db.get(`SELECT Name FROM Items WHERE Id = :id`, {
    ':id': id,
  });

  db.close();

  return item;
};

exports.addItem = async (name) => {
  const db = await openCon();

  await db.run('INSERT INTO Items (Name) VALUES (:name)', { ':name': name });

  db.close();
};

exports.removeItem = async (id) => {
  const db = await openCon();

  await db.run('DELETE FROM Items WHERE Id = :id', { ':id': id });

  db.close();
};
