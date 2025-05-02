<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>USER</title>
    <?php
    require_once("../conn.php");
    ?>
</head>
<body class="bg-soft-black min-h-screen flex justify-around items-center">
    <div>
        <img src="../img/mongkol_logo.jpg" alt="Mongkol Img" class="rounded-4xl">
        <p class="poppins-font text-5xl pb-8 font-bold text-dark-orange">MONGKOL</p>
    </div>
    <div class="bg-soft-white p-4">
        <h2 class="poppins-font text-2xl font-bold mb-4 text-center">Welcome to Mongkol!</h2>
        <p class="poppins-font text-center"><a href="sign_up.php" class="text-lg font-bold bg-dark-orange py-1 px-20 rounded-2xl">Sign Up</a></p>
        <p class="poppins-font text-xs my-2">-------------------or-------------------</p>
        <p class="poppins-font text-center "><a href="sign_in.php" class="text-lg font-bold bg-white py-1 px-20 rounded-2xl">Sign In</a></p>
        <p class="poppins-font text-xs my-2">By creating an account, I accept Mongkol's <br><a href="#" class="text-dark-orange">Terms of Service</a> and <a href="#" class="text-dark-orange">Privacy Policy</a>.</p>
    </div>
</body>
</html>