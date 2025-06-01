
<?php
// login.php
session_start();

// Conexão com o banco de dados (ajuste conforme suas credenciais)
$host = 'localhost';
$db = 'realizart';
$user = 'root';
$pass = '';
$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Processa o login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $senha = $_POST['senha'];

    $stmt = $conn->prepare("SELECT * FROM usuarios WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if ($user && password_verify($senha, $user['senha'])) {
        $_SESSION['user_id'] = $user['id'];
        header("Location: dashboard.php");
        exit;
    } else {
        $erro = "E-mail ou senha incorretos.";
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
        <img src="/assets/images/ui/Logo.png.png" alt="Logo Realizart" class="logo__login" >
        <h2>Faça o seu login</h2>
        <p>Insira seus dados e faça login</p>
        <?php if (isset($erro)) echo "<p class='erro'>$erro</p>"; ?>
        <form method="POST" action="">
            <input type="email" name="email" placeholder="Digite seu e-mail" required>
            <div class="senha-wrapper">
                <input type="password" name="senha" placeholder="Digite sua senha" id="senha" required>

                
            </div>
            <button class="button__login" type="submit">Entrar</button>
        </form>
        <p class="footer-text">Não tem cadastro? <a href="cadastro.php">Cadastre-se aqui</a></p>
        <p class="footer-text"><a href="index.php">← Voltar para a Página Inicial</a></p>
    </div>
    </section>

    <script type="text/javascript" src="./scripts/js/header.js"></script>
    <script type="text/javascript" src="./scripts/js/login.js"></script>
</body>
</html>