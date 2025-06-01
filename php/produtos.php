<?php
session_start();
$produtos = [
  1 => ['nome' => 'Caixinha de Batismo', 'preco' => 39.90],
  2 => ['nome' => 'Caixinha de Casamento', 'preco' => 49.90],
];
?>
<!DOCTYPE html>
<html lang="pt_br">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
  <link rel="stylesheet" href="./css/extends.css" />
  <title>Produtos - Realizart</title>
  <style>
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin-top: 2rem;
    }
    .product-card {
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      text-align: center;
    }
    .product-card h3 { margin: 1rem 0 0.5rem; }
    .product-card .price {
      color: #bb6b4a;
      font-weight: bold;
      font-size: 1.2rem;
    }
    .btn-add {
      background: #bb6b4a;
      color: white;
      border: none;
      padding: 0.6rem 1rem;
      border-radius: 6px;
      text-decoration: none;
      display: inline-block;
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
    <h1>Produtos</h1>
    <div class="products-grid">
      <?php foreach ($produtos as $id => $p): ?>
        <div class="product-card">
          <h3><?= $p['nome'] ?></h3>
          <div class="price">R$ <?= number_format($p['preco'], 2, ',', '.') ?></div>
          <a class="btn-add" href="adicionar_carrinho.php?id=<?= $id ?>">Adicionar ao Carrinho</a>
        </div>
      <?php endforeach; ?>
    </div>
  </main>

  <?php include 'footer.php'; ?>
</body>
</html>
