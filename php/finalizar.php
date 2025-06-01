<?php
session_start();
$total = 0;

// Simular o mesmo array de produtos
$produtos = [
  1 => ['nome' => 'Caixinha de Batismo', 'preco' => 39.90],
  2 => ['nome' => 'Caixinha de Casamento', 'preco' => 49.90],
];

$carrinho = $_SESSION['carrinho'] ?? [];

foreach ($carrinho as $id => $qtd) {
  $subtotal = $produtos[$id]['preco'] * $qtd;
  $total += $subtotal;
}

unset($_SESSION['carrinho']); // Limpa o carrinho ao finalizar
?>
<!DOCTYPE html>
<html lang="pt_br">
<head>
  <meta charset="UTF-8">
  <title>Compra Finalizada</title>
  <link rel="stylesheet" href="./css/extends.css" />
  <style>
    main { max-width: 600px; margin: 0 auto; padding: 2rem; text-align: center; }
    h1 { color: #bb6b4a; }
    .btn { margin-top: 2rem; background: #bb6b4a; color: white; padding: 0.7rem 1.5rem; border-radius: 6px; text-decoration: none; display: inline-block; }
  </style>
</head>
<body>
  <?php include 'header.php'; ?>
  <main>
    <h1>🎉 Compra finalizada com sucesso!</h1>
    <p>Valor total da compra: <strong>R$ <?= number_format($total, 2, ',', '.') ?></strong></p>
    <p>Obrigado por comprar com a Realizart.</p>
    <a class="btn" href="produtos.php">Voltar para loja</a>
  </main>
  <?php include 'footer.php'; ?>
</body>
</html>
