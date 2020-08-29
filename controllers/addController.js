const { ipcRenderer } = require('electron');
const { form } = require('../views/elements');

const submitForm = (e) => {
  e.preventDefault();
  // eslint-disable-next-line no-undef
  const item = document.querySelector('#item').value;
  ipcRenderer.send('item:add', item);
};

form.addEventListener('submit', submitForm);
