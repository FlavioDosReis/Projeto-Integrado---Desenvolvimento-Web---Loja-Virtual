
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

    function renderProdutos(lista) {
      grid.innerHTML = '';
      lista.forEach(produto => {
        const item = document.createElement('div');
        item.classList.add('produto__item');
        item.innerHTML = `
          <div class="produto__foto">
            <a href="produtounic.html?id=${produto.id}">
              <img src="${produto.imagem}" alt="${produto.nome}">
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

    function aplicarFiltro() {
      let filtrados = produtos;

      if (filtros.preco.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.preco.some(filtro => {
            const [min, max] = filtro.split('-').map(Number);
            return produto.precoPor >= min && produto.precoPor <= max;
          });
        });
      }

      if (filtros.categoria.length > 0) {
        filtrados = filtrados.filter(produto => filtros.categoria.includes(produto.categoria));
      }

      if (filtros.material.length > 0) {
        filtrados = filtrados.filter(produto => filtros.material.includes(produto.material));
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

        aplicarFiltro();
      });
    });

    renderProdutos(produtos);
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));
