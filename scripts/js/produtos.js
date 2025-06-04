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

      // Filtro de preço
      if (filtros.preco.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.preco.some(filtro => {
            const [min, max] = filtro.split('-').map(Number);
            return produto.precoPor >= min && produto.precoPor <= max;
          });
        });
      }

      // Filtro de categoria
      if (filtros.categoria.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.categoria.includes(produto.categoria);
        });
      }

      // Filtro de material
      if (filtros.material.length > 0) {
        filtrados = filtrados.filter(produto => {
          return filtros.material.includes(produto.material);
        });
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

    // Renderização inicial
    renderProdutos(produtos);
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));

/////////////teste

const produtos = [
  {
    id: 1,
    nome: "Caixa Convite - Batismo - mdf",
    precoDe: 80.00,
    precoPor: 50.00,
    imagem: "./assets/images/ui/caixa-mdf-batismo.png"
  },
  {
    id: 2,
    nome: "Caixa Convite - Casamento - papel",
    precoDe: 90.00,
    precoPor: 60.00,
    imagem: "./assets/images/ui/caixa-papel-casamento-removebg-preview.png"
  },
  {
    id: 3,
    nome: "Caixa Convite - Batismo - papel",
    precoDe: 90.00,
    precoPor: 60.00,
    imagem: "./assets/images/ui/foto-caixa-bombom-batismo-removebg-preview.png",
    descricao: "Caixa elegante para convites de Batismo. Material: mdf  300g. Medidas: 15 x 15 x 5 cm. Ideal para convidar padrinhos com estilo."
  },
{
   id: 4,
   nome: "Caixa Convite - Casamento - papel",
    precoDe: 90.00,
   precoPor: 60.00,
   imagem : "./assets/images/ui/foto-caixa-papel-casamento-2.png.png",
 descricao:"Caixa elegante para convites de casamento. Material: papel  300g. Medidas: 15 x 15 x 5 cm. Ideal para convidar padrinhos com estilo."
  } ,

  {
   id: 5,
   nome: "Caixa Convite - Crisma - mdf",
    precoDe: 90.00,
   precoPor: 60.00,
   imagem : "./assets/images/ui/foto-caixa-crisma.png",
 descricao:"Caixa elegante para convites de crisma. Material: mdf  300g. Medidas: 15 x 15 x 5 cm. Ideal para convidar padrinhos com estilo."
  } ,

   {
   id: 6,
   nome: "Caixa Convite - Batismo - mdf",
    precoDe: 90.00,
   precoPor: 60.00,
   imagem : "./assets/images/ui/foto-caixa-batismo-mdf-removebg-preview.png",
 descricao:"Caixa elegante para convites de crisma. Material: mdf  300g. Medidas: 15 x 15 x 5 cm. Ideal para convidar padrinhos com estilo."
  } ,


];

fetch('./data/produtos.json')
  .then(response => response.json())
  .then(produtos => {
    const grid = document.querySelector('.grid');

    produtos.forEach(produto => {
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
  })
  .catch(err => console.error('Erro ao carregar produtos:', err));
