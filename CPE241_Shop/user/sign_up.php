<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>USER | Sign Up</title>
  <?php
    require_once("../conn.php");
  ?>
</head>
<body class = 'pt-12 m-12'>
  <?php
  if(isset($_GET["message"])){
    $message = htmlspecialchars($_GET["message"]);
    echo "<p class=\"text-red poppins-font text-xs\">$message</p>";
  }
  if(isset($_POST['submit'])) {
    $fullname = $_POST["fullname"];
    $username = $_POST["username"];
    $phonenumber = $_POST["phone"];
    $password = $_POST["password"];
    $passwordHash = password_hash($password , PASSWORD_DEFAULT);
    $error = array();
    if(strlen($password) <= 9 or strlen($password) >= 30){
        array_push($error , "Password must be about 9 - 30 words long.");
    }
    if(strlen($username) >= 31){
        array_push($error , "username must less than 31 words long.");
    }
    if(strlen($phonenumber) != 10){
      array_push($error , "Phone Number must be 10 numbers.");
    }
    if(!ctype_digit($phonenumber)){
      array_push($error , "Contain only numbers.");
    }
    
    $sql = "SELECT COUNT(*) AS countMatch FROM tbl_users WHERE userName = '$username'";
    $result = mysqli_query($conn, $sql);
    // echo "<pre>";
    // print_r($result);
    // echo "</pre>";
    $row = mysqli_fetch_assoc($result);
    // echo $row['countMatch']; 
    $count = $row['countMatch'];
    if($count >= 1){
      array_push($error , "Username already exist!");
    }
    if(count($error) > 0){
      foreach($error as $error){
          echo "<p class=\"text-red poppins-font text-xs\"> $error </p>";
      }
    }else{


      

      $fullname = trim($_POST["fullname"]); // Remove leading/trailing whitespace
      $parts = preg_split('/\s+/', $fullname); // Split by spaces
      
      $firstname = "";
      $middlename = "";
      $lastname = "";
      
      if (count($parts) == 2) {
          // Case: First name + Last name
          $firstname = $parts[0];
          $lastname = $parts[1];
          $middlename = NULL;
      } elseif (count($parts) >= 3) {
          // Case: First name + Middle name(s) + Last name
          $firstname = $parts[0];
          $lastname = $parts[count($parts) - 1]; // Get the last element as lastname
          
          // Combine all middle parts into middlename
          $middlename = "";
          for ($i = 1; $i < count($parts) - 1; $i++) {
              $middlename .= $parts[$i] . " ";
          }
          $middlename = trim($middlename);
      } else {
          // Case: Only one word entered
          $firstname = $fullname;
      }




      if (!empty($middlename)) {
        $stmt = $conn->prepare("INSERT INTO tbl_users (`firstName`, `midName`, `lastName`, `userName`, `password_hash`) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param("sssss", $firstname, $middlename, $lastname, $username, $passwordHash);
    } else { 
        $stmt = $conn->prepare("INSERT INTO tbl_users (`firstName`, `lastName`, `userName`, `password_hash`) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $firstname, $lastname, $username, $passwordHash);
    }
      if($stmt->execute()){
        header("Location: sign_in.php?message=" . urlencode("Registration successful!"));
      }else{
        die("somrthing went wrong.");
        header("Location: sign_up.php?message=" . urlencode("something went wrong!"));
      }
    }
  }

  ?>
  <h2 class="montserrat-font text-5xl text-center pb-8 font-bold">Sign Up</h2>  
  <form action="sign_up.php" method="post" class="flex flex-col justify-center items-center">
    <p><label for="Full Name" class="poppins-font text-lg">Full Name</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="text" placeholder="Ex. Arno P Scazam" name="fullname"></p><br>
    <p><label for="Phone" class="poppins-font text-lg">Phone</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="text" placeholder="Main Phone Number" name="phone"></p><br>
    <p><label for="User Name" class="poppins-font text-lg">User Name</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="text" placeholder="Enter your name" name="username" required></p><br>
    <p><label for="Password" class="poppins-font text-lg">Password</label><br><input class="poppins-font text-base bg-stone-200 px-4 py-2 rounded-lg" type="password" placeholder="Enter your password" name="password" required></p><br>
    <input type="submit" name="submit" value="Sign Up" class="font-bold text-2xl montserrat-font bg-dark-orange px-14 py-1 rounded-2xl"><br>
    <p class="poppins-font text-xs my-2">Already have an account <a href="sign_in.php" class="text-dark-orange">Sign In!</a></p>
  </form>

</body>
</html>

<?php 
// Get form data
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
