<?php require_once("../conn.php"); ?>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet">
<?php session_start();
    if(!(isset($_SESSION["userID"]))){
        header("Location: ../user/sign_in.php");
        exit();
    }
?>
  <!-- Navbar (Top dark bar) -->
  <div class="w-full bg-[#2E282A] py-4 shadow-md">
    <div class="max-w-7xl mx-auto flex items-center justify-between px-6">
      <!-- Logo -->
        <a href="../user/market.php" class="flex items-center space-x-2">
          <img src="../img/logo2.png" alt="Logo" class="w-10 h-10" />
          <span class="text-2xl font-bold text-orange-500">MONGKOL</span>
        </a>

    <div>
        <?php
        $currentPage = basename($_SERVER['PHP_SELF']);
        if (in_array($currentPage, ["market.php", "cart.php", "product.php", "product_detail.php"])) { 
        ?>
        <form id="search-form" class="relative flex items-center w-full max-w-xs">
            <input type="text" id="search-input" name="query" placeholder="Search" class="px-4 py-2 rounded-sm" required>
            <i class="fas fa-search absolute right-3 text-gray-400"></i>
        </form>
        <?php } ?>
        <script>
    $(document).ready(function() {
        $('#search-input').on('keypress', function(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                var query = $(this).val();

                $.ajax({
                    url: 'search.php',
                    method: 'GET',
                    data: { query: query },
                    success: function(response) {
                        $('#search-results').html(response);
                    },
                    error: function() {
                        $('#search-results').html('<p>An error occurred. Please try again.</p>');
                    }
                });
            }
        });
    });
</script>

    </div>
      <!-- Admin name & Logout -->
      <div class="flex items-center space-x-4">
        <p class="text-white flex items-center font-medium">Hello, <?php echo $_SESSION["firstName"]; ?></p>
        <a href="../user/cart.php" class="relative inline-block text-white px-4"><i class="fas fa-shopping-cart"></i></a>
        <a href="../sign_out.php" class="text-orange-400 hover:text-red-500 font-semibold pl-4">Logout</a>
      </div>
    </div>
  </div>

  <!-- Menu Bar (Bottom orange bar) -->
  <div class="w-full bg-orange-500 py-3 mb-8">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex justify-around space-x-20 mx-8">
        <a href="#" class="text-white font-medium hover:text-gray-300 transition">Category A</a>
        <a href="#" class="text-white font-medium hover:text-gray-300 transition">Category B</a>
        <a href="#" class="text-white font-medium hover:text-gray-300 transition">Category C</a>
        <a href="#" class="text-white font-medium hover:text-gray-300 transition">Category D</a>
        <!-- <a href="#" class="text-white font-medium hover:text-gray-300 transition"></a>
        <a href="#" class="text-white font-medium hover:text-gray-300 transition">Reports</a> -->
      </div>
    </div>
  </div>

