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


//area do filtro

let filterIcon =  document.querySelectorAll ('.filter__icon') ;
filterIcon.forEach (item => {
      item.addEventListener ('click', () => {
            let body = item.closest('.filter').querySelector('.filter__body') ;
            if (body.style.display ==='none') {
                  body.style.display = 'block' ;
            } else {
                  body.style.display = 'none';
            }
      })
});
// Função para aplicar filtros
function aplicarFiltros() {
  const produtos = document.querySelectorAll('.produto__item');
  const filtrosSelecionados = {};

  // Pega filtros selecionados de cada categoria
  document.querySelectorAll('.filter').forEach(filtro => {
    const categoria = filtro.querySelector('.filter__name').innerText.toLowerCase();
    const selecionados = Array.from(filtro.querySelectorAll('input[type="checkbox"]:checked')).map(cb => cb.value.toLowerCase());

    if (selecionados.length > 0) {
      filtrosSelecionados[categoria] = selecionados;
    }
  });

  produtos.forEach(produto => {
    let nomeProduto = produto.querySelector('.produto__nome').innerText.toLowerCase();
    let precoProduto = produto.querySelector('.produto__preco').innerText.replace(/[^\d,]/g, '').replace(',', '.');
    precoProduto = parseFloat(precoProduto);

    let mostrar = true;

    // Verifica cada filtro
    for (let categoria in filtrosSelecionados) {
      let valores = filtrosSelecionados[categoria];

      if (categoria.includes('caixinhas')) {
        mostrar = valores.some(val => nomeProduto.includes(val));
      }

      if (categoria.includes('material')) {
        mostrar = valores.some(val => nomeProduto.includes(val));
      }

      if (categoria.includes('preço')) {
        mostrar = valores.some(val => {
          if (val === 'mdf') {
            return precoProduto >= 30 && precoProduto <= 50;
          }
          if (val === 'papel') {
            return precoProduto >= 50 && precoProduto <= 80;
          }
          return false;
        });
      }

      if (!mostrar) break;  // se falhar um filtro, já esconde
    }

    produto.style.display = mostrar ? 'block' : 'none';
  });
}

// Adiciona o evento aos checkboxes
document.querySelectorAll('.filter__option input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', aplicarFiltros);
});

//ordenar filtros
function ordenarProdutos() {
  const grid = document.querySelector('.produtos__todos .grid');
  const produtos = Array.from(grid.querySelectorAll('.produto__item'));
  const criterio = document.getElementById('order').value;

  produtos.sort((a, b) => {
    if (criterio === 'price') {
      let precoA = parseFloat(a.querySelector('.produto__preco').innerText.replace(/[^\d,]/g, '').replace(',', '.'));
      let precoB = parseFloat(b.querySelector('.produto__preco').innerText.replace(/[^\d,]/g, '').replace(',', '.'));
      return precoA - precoB;
    } else if (criterio === 'bestselling') {
      // Como não temos informação de vendas, simulamos com o nome ou preço
      let vendasA = parseFloat(a.querySelector('.produto__preco').innerText.replace(/[^\d,]/g, '').replace(',', '.'));
      let vendasB = parseFloat(b.querySelector('.produto__preco').innerText.replace(/[^\d,]/g, '').replace(',', '.'));
      return vendasB - vendasA; // do mais caro para o mais barato como exemplo
    } else if (criterio === 'alpha') {
      let nomeA = a.querySelector('.produto__nome').innerText.toLowerCase();
      let nomeB = b.querySelector('.produto__nome').innerText.toLowerCase();
      return nomeA.localeCompare(nomeB);
    }
  });

  // Remove e reinsere na ordem
  produtos.forEach(produto => {
    grid.appendChild(produto);
  });
}

// Adiciona o evento de mudança no select
document.getElementById('order').addEventListener('change', ordenarProdutos);


function aplicarBusca() {
  const termoBusca = document.querySelector('.header__main .search').value.trim().toLowerCase();
  const produtos = document.querySelectorAll('.produto__item');

  produtos.forEach(produto => {
    const nomeProduto = produto.querySelector('.produto__nome').innerText.toLowerCase();

    // Se o termo for encontrado no nome, exibe; senão, esconde
    if (nomeProduto.includes(termoBusca)) {
      produto.style.display = 'block';
    } else {
      produto.style.display = 'none';
    }
  });
}

// Eventos de input nos campos de busca
document.querySelectorAll('.search').forEach(input => {
  input.addEventListener('input', aplicarBusca);
});