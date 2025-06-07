<?php
// dashboard.php
session_start();

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>

<!DOCTYPE html>
<html lang="pt_br">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Icone do site -->
    <link rel="shortcut icon" href="/images/favicon.ico" type="image/x-icon" />
    <!-- CSS -->
    <link rel="stylesheet" href="./css/extends.css" />
    <!-- TITULO -->
    <title>Realizart - Docê jeito de convidar</title>
  </head>

<body>
      
      <section class="login">
    <div class="login-container">
      <img src="./assets/images/ui/Logo.png.png" alt="Logo Realizart" class="logo__login" >
        <h2>Bem-vindo!</h2>
        <p>Você está logado na sua conta Realizart.</p>
        <a href="logout.php"><button class="button__login" >Sair</button></a>
        <p class="footer-text"><a href="index.html">← Voltar para a Página Inicial</a></p>
    </div>
    </section>
</body>
</html>
