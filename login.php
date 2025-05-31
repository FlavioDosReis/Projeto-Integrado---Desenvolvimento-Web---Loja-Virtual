<?php
session_start();
include("conexao.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST["email"];
    $senha = md5($_POST["senha"]);

    $sql = "SELECT * FROM usuarios WHERE email = '$email' AND senha = '$senha'";
    $result = $conn->query($sql);

    if ($result->num_rows === 1) {
        $_SESSION["usuario"] = $result->fetch_assoc();
        header("Location: pagina.php");
        exit();
    } else {
        echo "<script>alert('Email ou senha incorretos!'); window.location.href='login.html';</script>";
    }
}
?>
