<?php
session_start();

$produtos = [
  1 => ['nome' => 'Caixinha de Batismo', 'preco' => 39.90],
  2 => ['nome' => 'Caixinha de Casamento', 'preco' => 49.90],
];

$carrinho = $_SESSION['carrinho'] ?? [];
$total = 0;
?>
<!DOCTYPE html>
<html lang="pt_br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carrinho - Realizart</title>
  <link rel="stylesheet" href="./css/extends.css" />
  <style>
    .carrinho-item {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
    }
    .total {
      font-size: 1.2rem;
      font-weight: bold;
      margin-top: 1rem;
    }
    .btn {
      background: #bb6b4a;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 5px;
      text-decoration: none;
      display: inline-block;
      margin-right: 0.5rem;
      margin-top: 1rem;
    }
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem 1rem;
    }
  </style>
</head>
<body>
<?php include 'header.php'; ?>

<main>
  <h1>Seu Carrinho 🛒</h1>

  <?php if (empty($carrinho)): ?>
    <p>Seu carrinho está vazio.</p>
  <?php else: ?>
    <?php foreach ($carrinho as $id => $qtd): ?>
      <?php
        $produto = $produtos[$id];
        $subtotal = $produto['preco'] * $qtd;
        $total += $subtotal;
      ?>
      <div class="carrinho-item">
        <strong><?= $produto['nome'] ?></strong><br>
        Quantidade: <?= $qtd ?><br>
        Subtotal: R$ <?= number_format($subtotal, 2, ',', '.') ?><br>
        <a class="btn" href="remover_unidade.php?id=<?= $id ?>">Remover 1</a>
        <a class="btn" href="remover_item.php?id=<?= $id ?>">Remover tudo</a>
      </div>
    <?php endforeach; ?>
    <div class="total">Total: R$ <?= number_format($total, 2, ',', '.') ?></div>

    <a class="btn" href="limpar_carrinho.php">🧹 Limpar carrinho</a>
    <a class="btn" href="finalizar.php">✅ Finalizar compra</a>
  <?php endif; ?>

  <a class="btn" href="produtos.php">← Continuar comprando</a>
</main>

<?php include 'footer.php'; ?>
</body>
</html>
