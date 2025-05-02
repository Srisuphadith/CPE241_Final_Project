<?php
session_start();
if ($_SESSION['role'] !== 'user') {
  header("Location: login.html");
  exit();
}
?>
<h1>👤 User Page</h1>
<p>สวัสดีคุณ <?php echo $_SESSION['userName']; ?></p>
