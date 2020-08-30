const { ipcRenderer } = require('electron');
const { itemsList } = require('../views/elements');
const { clearList, removeItem, renderItem } = require('../views/homeView');
const itemModel = require('../models/itemModel');

// Init
(async () => {
  const items = await itemModel.getItems();
  items.forEach((cur) => {
    renderItem(cur.Name);
  });
})();

// Add item
ipcRenderer.on('item:add', async (e, item) => {
  // 1. Persist item to database
  await itemModel.addItem(item);

  // 2. Render item on UI
  renderItem(item);
});

// Clear items
ipcRenderer.on('items:clear', () => {
  clearList();
});

// Remove item
itemsList.addEventListener('dblclick', (e) => {
  // 2. Remove item from UI
  removeItem(e.target);
});
