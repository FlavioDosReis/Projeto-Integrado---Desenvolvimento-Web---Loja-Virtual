<?php
session_start();

// Simulação do "banco de dados"
$produtos = [
  1 => ['nome' => 'Caixinha de Batismo', 'preco' => 39.90],
  2 => ['nome' => 'Caixinha de Casamento', 'preco' => 49.90],
];

// Verifica se o ID foi passado corretamente
$id = isset($_GET['id']) ? (int) $_GET['id'] : 0;

// Verifica se o produto existe
if (!array_key_exists($id, $produtos)) {
  // Produto não existe — redireciona para página de produtos
  header('Location: produtos.php');
  exit;
}

// Inicia o carrinho se ainda não estiver definido
if (!isset($_SESSION['carrinho'])) {
  $_SESSION['carrinho'] = [];
}

// Adiciona ou incrementa o produto no carrinho
if (isset($_SESSION['carrinho'][$id])) {
  $_SESSION['carrinho'][$id]++;
} else {
  $_SESSION['carrinho'][$id] = 1;
}

// Redireciona de volta ao carrinho
header('Location: carrinho.php');
exit;
