let infoShown = '';
let infoButtons = document.querySelectorAll('.top__button');
let orderArea = document.querySelector('.order__area');
let filterArea = document.querySelector('.produtos__todos .filters');

infoButtons.forEach((item) => {
  item.addEventListener('click', () => {
    let name = item.getAttribute('data-name');

    if (name === infoShown) {
      infoShown = '';
    } else {
      infoShown = name;
    }

    renderInfo();
  });
});

function renderInfo() {
  // Oculta todas as áreas inicialmente
  orderArea.style.display = 'none';
  filterArea.style.display = 'none';

  // Mostra conforme selecionado
  switch (infoShown) {
    case 'order':
      orderArea.style.display = 'block';
      break;
    case 'filter':
      filterArea.style.display = 'block';
      break;
  }
}

