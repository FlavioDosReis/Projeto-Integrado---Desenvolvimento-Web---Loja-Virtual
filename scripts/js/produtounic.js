
// Seleciona os botões
const btnComprar = document.querySelector('.buttons button:first-child');
const btnAdicionar = document.querySelector('.buttons button:last-child');

btnComprar.addEventListener('click', function() {
  alert('Redirecionando para o checkout...');
  window.location.href = 'checkout.html';
});

btnAdicionar.addEventListener('click', function() {
  const produto = {
    id: id,
    nome: document.querySelector('.name').textContent,
    preco: document.querySelector('.price__to').textContent.replace('R$ ', ''),
    imagem: document.querySelector('.imagem__principal img').src,
    qtd: 1
  };

  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const existente = carrinho.find(p => p.id === produto.id);

  if (existente) {
    existente.qtd += 1;
  } else {
    carrinho.push(produto);
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  alert('Produto adicionado ao carrinho!');
});

const btnCalcularFrete = document.querySelector('.shipping__input button');
const inputCEP = document.querySelector('.shipping__input input');

btnCalcularFrete.addEventListener('click', function() {
  const cep = inputCEP.value.trim();
  if (cep === '') {
    alert('Por favor, digite um CEP.');
    return;
  }
  alert(`O frete para o CEP ${cep} é R$ 15,00 com prazo de 5 dias úteis.`);
});

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  fetch('./data/produtos.json')
    .then(res => res.json())
    .then(produtos => {
      const produto = produtos.find(p => p.id === id);

      if (produto) {
        document.querySelector('.imagem__principal img').src = produto.imagem;
        document.querySelector('.name').textContent = produto.nome;
        document.querySelector('.price__from span').textContent = `R$ ${produto.precoDe.toFixed(2)}`;
        document.querySelector('.price__to').textContent = `R$ ${produto.precoPor.toFixed(2)}`;
        document.querySelector('.description__text p').textContent = produto.descricao;
      } else {
        document.querySelector('.produto__unic').innerHTML = '<p>Produto não encontrado.</p>';
      }
    })
    .catch(err => console.error('Erro ao carregar produto:', err));
});
