// Seleciona os botões
const btnComprar = document.querySelector('.buttons button:first-child');
const btnAdicionar = document.querySelector('.buttons button:last-child');

// Função para "Comprar"
btnComprar.addEventListener('click', function() {
  alert('Redirecionando para o checkout...');

  window.location.href = 'checkout.php';
});

// Função para "Adicionar ao carrinho"
btnAdicionar.addEventListener('click', function() {
  alert('Produto adicionado ao carrinho!');
  //função que adiciona ao carrinho.
});

// Função de cálculo de frete
const btnCalcularFrete = document.querySelector('.shipping__input button');
const inputCEP = document.querySelector('.shipping__input input');

btnCalcularFrete.addEventListener('click', function() {
  const cep = inputCEP.value.trim();

  if (cep === '') {
    alert('Por favor, digite um CEP.');
    return;
  }

  // Simulação de cálculo de frete
  alert(`O frete para o CEP ${cep} é R$ 15,00 com prazo de 5 dias úteis.`);
});

////teste

const produtos = [
  {
    id: 1,
    nome: "Caixa Convite - Batismo - mdf",
    precoDe: 80.00,
    precoPor: 50.00,
    imagem: "./assets/images/ui/caixa-mdf-batismo.png",
    descricao: "Caixa de Papel para Convite de Padrinhos de Consagração com Terço. Material: Papel 240g (mais rígido e resistente). Medidas: 12 x 12 x 4 cm. Impressão feita com tinta original premium, garantindo maior qualidade e durabilidade."
  },
  {
    id: 2,
    nome: "Caixa Convite - Casamento - papel",
    precoDe: 90.00,
    precoPor: 60.00,
    imagem: "./assets/images/ui/caixa-papel-casamento-removebg-preview.png",
    descricao: "Caixa elegante para convites de casamento. Material: Papel 300g. Medidas: 15 x 15 x 5 cm. Ideal para convidar padrinhos com estilo."
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

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get('id'));

const produto = produtos.find(p => p.id === id);

if (produto) {
  document.querySelector('.imagem__principal img').src = produto.imagem;
  document.querySelector('.name').textContent = produto.nome;
  document.querySelector('.price__from span').textContent = `R$ ${produto.precoDe.toFixed(2)}`;
  document.querySelector('.price__to').textContent = `R$ ${produto.precoPor.toFixed(2)}`;
  document.querySelector('.description__text p').textContent = produto.descricao;
} else {
  document.querySelector('.produto__unic').innerHTML = "<p>Produto não encontrado.</p>";
}