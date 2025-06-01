<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.html");
    exit();
}
$usuario = $_SESSION['usuario'];
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <title>Bem-vindo</title>
</head>
<body>
    <h1>Olá, <?php echo htmlspecialchars($usuario['nome']); ?>!</h1>
    <p>Email: <?php echo htmlspecialchars($usuario['email']); ?></p>
    <a href="logout.php">Sair</a>
</body>
</html>
