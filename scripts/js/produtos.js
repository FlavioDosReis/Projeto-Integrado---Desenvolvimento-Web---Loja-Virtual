
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
  orderArea.style.display = 'none';
  filterArea.style.display = 'none';

  switch (infoShown) {
    case 'order':
      orderArea.style.display = 'block';
      break;
    case 'filter':
      filterArea.style.display = 'block';
      break;
  }
}

let filterIcon = document.querySelectorAll('.filter__icon');
filterIcon.forEach(item => {
  item.addEventListener('click', () => {
    let body = item.closest('.filter').querySelector('.filter__body');
    if (body.style.display === 'none') {
      body.style.display = 'block';
    } else {
      body.style.display = 'none';
    }
  });
});

// Busca produtos e lida com renderização/filtragem
fetch('./data/produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const grid = document.querySelector('.grid');
    const qtSpan = document.querySelector('.produto__qt span');

    const filtros = {
      preco: [],
      categoria: [],
      material: []
    };

    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const orderSelect = document.getElementById('order'); // Obter o elemento select

    function renderProdutos(lista) {
      grid.innerHTML = '';
      lista.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('produto__item');
        item.innerHTML = `
          <div class="produto__foto">
            <a href="produtounic.html?id=${produto.id}"> <img src="${produto.imagem}" alt="${produto.nome}">
            </a>
          </div>
          <div class="produto__nome">${produto.nome}</div>
          <div class="produto__preco">R$ ${produto.precoPor.toFixed(2)}</div>
          <div class="produto__info">Pagamento via PIX</div>
        `;
        grid.appendChild(item);
      });
      qtSpan.textContent = lista.length;
    }

    function aplicarFiltroEOrdem() {
      let filtrados = [...produtos]; // Cria uma cópia para evitar modificar o array original

      // Aplica Filtros
      if (filtros.preco.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.preco.some(filtro => {
            const [min, max] = filtro.split('-').map(Number);
            return produto.precoPor >= min && produto.precoPor <= max;
          });
        });
      }

      if (filtros.categoria.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.categoria.includes(produto.categoria);
        });
      }

      if (filtros.material.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.material.includes(produto.material);
        });
      }

      // Aplica Ordenação
      const selectedOrder = orderSelect.value;
      if (selectedOrder === 'price') {
        filtrados.sort((a, b) => a.precoPor - b.precoPor);
      } else if (selectedOrder === 'bestselling') {
        // Você precisaria de uma propriedade 'soldCount' ou similar em seu JSON para isso
        // Por enquanto, vamos assumir que ele ordena pelo preço mais alto (como um placeholder para "mais vendido")
        filtrados.sort((a, b) => b.precoPor - a.precoPor);
      } else if (selectedOrder === 'alpha') {
        filtrados.sort((a, b) => a.nome.localeCompare(b.nome));
      }

      renderProdutos(filtrados);
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        const { name, value, checked } = cb;

        if (checked) {
          filtros[name].push(value);
        } else {
          filtros[name] = filtros[name].filter(v => v !== value);
        }

        aplicarFiltroEOrdem();
      });
    });

    orderSelect.addEventListener('change', aplicarFiltroEOrdem); // Ouve por mudanças no select

    // Renderização inicial
    aplicarFiltroEOrdem();
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));