<?php
// cadastro.php
$host = 'localhost';
$db = 'realizart';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = password_hash($_POST['senha'], PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (email, senha) VALUES (?, ?)");
    $stmt->bind_param("ss", $email, $senha);

    if ($stmt->execute()) {
        header("Location: login.php");
        exit;
    } else {
        $erro = "Erro ao cadastrar. Tente outro e-mail.";
    }
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
        <h2>Cadastre-se</h2>
        <p>Crie sua conta</p>
        <?php if (isset($erro)) echo "<p class='erro'>$erro</p>"; ?>
        <form method="POST" action="">
            <input type="email" name="email" placeholder="Digite seu e-mail" required>
            <input type="password" name="senha" placeholder="Crie uma senha" required>
            <button class="button__login" type="submit">Cadastrar</button>
        </form>
        <p class="footer-text">Já tem conta? <a href="login.php">Entrar</a></p>
        <p class="footer-text"><a href="index.php">← Voltar para a Página Inicial</a></p>
    </div>
    </section>
</body>
</html>
