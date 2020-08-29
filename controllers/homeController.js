const { ipcRenderer } = require('electron');
const { itemsList } = require('../views/elements');
const { clearList, removeItem, addItem } = require('../views/addView');

// Add item
ipcRenderer.on('item:add', (e, item) => {
  addItem(item);
});

// Clear items
ipcRenderer.on('items:clear', () => {
  clearList();
});

// Remove item
itemsList.addEventListener('dblclick', (e) => {
  removeItem(e.target);
});
