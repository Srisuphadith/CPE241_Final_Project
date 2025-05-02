<?php
    require("./navbar/admin.php"); 
session_start();
if ($_SESSION['role'] !== 'admin') {
  header("Location: login.html");
  exit();
}
?>

<h1>👑 Admin Dashboard</h1>
<p>ยินดีต้อนรับคุณ <?php echo $_SESSION['userName']; ?></p>