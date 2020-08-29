const { itemsList } = require('./elements');

exports.clearList = () => {
  // eslint-disable-next-line no-undef
  itemsList.innerHTML = null;
  itemsList.className = '';
};

exports.removeItem = (item) => {
  item.remove();
  if (itemsList.children.length === 0) {
    itemsList.className = '';
  }
};

exports.addItem = (item) => {
  itemsList.className = 'collection';

  const itemMarkup = `<li class='collection-item'>${item}</li>`;
  itemsList.insertAdjacentHTML('beforeend', itemMarkup);
};
