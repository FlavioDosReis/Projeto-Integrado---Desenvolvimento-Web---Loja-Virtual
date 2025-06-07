
let id;

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  id = parseInt(params.get('id'));

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

        // ✅ Só aqui os botões devem ser ativados
        document.querySelector('.btn-adicionar').addEventListener('click', () => {
          const item = {
            id: produto.id,
            nome: produto.nome,
            preco: produto.precoPor.toFixed(2),
            imagem: produto.imagem,
            qtd: 1
          };

          let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
          const existente = carrinho.find(p => p.id === item.id);

          if (existente) {
            existente.qtd += 1;
          } else {
            carrinho.push(item);
          }

          localStorage.setItem('carrinho', JSON.stringify(carrinho));
          alert('Produto adicionado ao carrinho!');
        });

        document.querySelector('.btn-comprar').addEventListener('click', () => {
          window.location.href = 'checkout.html';
        });

      } else {
        document.querySelector('.produto__unic').innerHTML = '<p>Produto não encontrado.</p>';
      }
    })
    .catch(err => console.error('Erro ao carregar produto:', err));
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
