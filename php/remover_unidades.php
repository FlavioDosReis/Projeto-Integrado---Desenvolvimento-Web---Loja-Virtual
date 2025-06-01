<?php
session_start();
$id = $_GET['id'] ?? null;

if ($id && isset($_SESSION['carrinho'][$id])) {
  $_SESSION['carrinho'][$id]--;
  if ($_SESSION['carrinho'][$id] <= 0) {
    unset($_SESSION['carrinho'][$id]);
  }
}

header('Location: carrinho.php');
exit;
