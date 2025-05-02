<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>USER | Sign In</title>
  <?php
      require_once("../conn.php");
  ?>
</head>
<body class="pt-12 m-12">
  <?php
  if(isset($_GET["message"])){
    $message = htmlspecialchars($_GET["message"]);
    echo "<p class=\"text-green poppins-font text-xs\"> $message </p>";
  }
  ?>
  <h2 class="montserrat-font text-5xl text-center pb-8 font-bold">Sign In</h2>
  <form action="#" method="post" class="flex flex-col justify-center items-center">
    <p><label for="username" class="poppins-font text-lg">Username</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="text" placeholder="username" name="username" required></p><br>
    <p><label for="password" class="poppins-font text-lg">Password</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="password" placeholder="********" name="password" required></p><br>
    <input type="submit" name="submit" value="Sign In" class="font-bold text-2xl montserrat-font bg-dark-orange px-14 py-1 rounded-2xl"><br>
    <p class="poppins-font text-xs my-2">Don't Have an account yet <a href="sign_up.php" class="text-dark-orange">Sign Up!</a></p>
  </form>
</body>
</html>






<?php
// // Get form data
// $firstName = $_POST['firstName'];
// $username = $_POST['username'];
// $password = $_POST['password'];

// // Hash the password
// $hashed_password = password_hash($password, PASSWORD_DEFAULT);

// // Insert into tbl_users
// $sql = "INSERT INTO tbl_users (firstName, userName, password_hash)
//         VALUES (?, ?, ?)";

// $stmt = $conn->prepare($sql);
// $stmt->bind_param("sss", $firstName, $username, $hashed_password);

// if ($stmt->execute()) {
//   echo "✅ Registration successful! <a href='login.html'>Login here</a>";
// } else {
//   echo "❌ Error: " . $stmt->error;
// }

// $stmt->close();
// $conn->close();
?>






































<!-- <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Register</title>
</head>
<body class="bg-gray-100 flex items-center justify-center h-screen">
  <div class="bg-white p-8 rounded-2xl shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Register</h2>
    <form action="#" method="POST" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Full Name</label>
        <input type="text" id="name" name="name" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="email" name="email" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
        <input type="password" id="password" name="password" required
               class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300">
      </div>
      <button type="submit"
              class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
        Register
      </button>
    </form>
    <p class="text-center text-sm text-gray-600 mt-4">
      Already have an account? <a href="#" class="text-blue-500 hover:underline">Login</a>
    </p>
  </div>
</body>
</html> -->
