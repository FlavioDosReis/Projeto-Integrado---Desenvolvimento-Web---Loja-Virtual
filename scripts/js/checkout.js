document.addEventListener('DOMContentLoaded', () => {
  const areaProdutos = document.querySelector('.produtos_area');
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

  if (carrinho.length === 0) {
    areaProdutos.innerHTML = '<p>Seu carrinho está vazio.</p>';
    return;
  }

  let subtotal = 0;

  carrinho.forEach(produto => {
    const precoUnit = parseFloat(produto.preco);
    const totalItem = precoUnit * produto.qtd;
    subtotal += totalItem;

    const itemHTML = `
      <div class="produto">
        <div class="produto__foto">
          <img src="${produto.imagem}" alt="${produto.nome}" />
        </div>
        <div class="produto__info">
          <div class="produto__nome">${produto.nome}</div>
          <div class="produto__qtd">
            <div class="btn__icon" onclick="atualizarQtd(${produto.id}, -1)">-</div>
            <div class="produto__qtd__text">${produto.qtd}</div>
            <div class="btn__icon" onclick="atualizarQtd(${produto.id}, 1)">+</div>
          </div>
        </div>
        <div class="produto__info2">
          <div class="produto__preco">R$ ${totalItem.toFixed(2)}</div>
          <div class="btn__icon" onclick="removerProduto(${produto.id})">
            <img src="./assets/images/ui/delete-bin-line.png" alt="remover" />
          </div>
        </div>
      </div>
    `;
    areaProdutos.insertAdjacentHTML('beforeend', itemHTML);
  });

  document.querySelector('.checkout__header span').textContent = `(${carrinho.length} itens)`;
  document.querySelector('.subtotal .right').textContent = `R$ ${subtotal.toFixed(2)}`;
  document.querySelector('.total').textContent = `R$ ${(subtotal + 15).toFixed(2)}`; // + frete
});

function atualizarQtd(id, delta) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const produto = carrinho.find(p => p.id === id);

  if (produto) {
    produto.qtd += delta;
    if (produto.qtd < 1) produto.qtd = 1;
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    location.reload();
  }
}

function removerProduto(id) {
  let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho = carrinho.filter(p => p.id !== id);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  location.reload();
}