<?php include_once('../include_common.php'); ?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <title>Admin - thebactrak</title>
  <!-- Bootstrap core CSS-->
  <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom fonts for this template-->
  <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
  <!-- Custom styles for this template-->
  <link href="css/sb-admin.css" rel="stylesheet">
</head>

<body class="bg-dark">
  <a class="navbar-brand" href="index.php">
          <img id="thebactrak-logo" style="height: 50%;width:50%;" src="<?php echo $URL_BASE; ?>/img/logo.png" class="">
        </a>
  <div class="container">
    
    <div class="card card-login mx-auto mt-5">
      <div class="card-header">Login</div>
      <div class="card-body">
        <form class="login-form" action="" method="post">

          <div class="form-group">
            <label for="exampleInputEmail1">Username</label>
            <input class="form-control" name="email" id="exampleInputEmail1" type="text" aria-describedby="emailHelp" placeholder="Enter username">
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input class="form-control" name="password" id="exampleInputPassword1" type="password" placeholder="Password">
          </div>
          <div class="form-group">
            <div class="form-check">
              <label class="form-check-label">
                <input class="form-check-input" type="checkbox"> Remember Password</label>
            </div>
          </div>
          <input type="submit" name="submit"  class="btn btn-primary btn-block">
          
        </form>
        <div class="text-center">
          <!-- <a class="d-block small mt-3" href="register.html">Register an Account</a>
          <a class="d-block small" href="forgot-password.html">Forgot Password?</a> -->
        </div>
      </div>
    </div>
  </div>
  <!-- Bootstrap core JavaScript-->
  <script src="vendor/jquery/jquery.min.js"></script>
  <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <!-- Core plugin JavaScript-->
  <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
</body>

</html>

<?php
include_once('../config.php');
session_start();
if(isset($_POST['submit']))
{
  $email = $_POST['email'];
  $password = $_POST['password'];
  $loginSelect ="select * from login where email ='$email' AND password ='".md5($password)."'";

  $loginResult = mysqli_query($con,$loginSelect);
  $count = mysqli_num_rows($loginResult);
  $selectData = mysqli_fetch_array($loginResult);
  if($count  == 1)
  {
    session_start();
    $email = $selectData['email'];
    $_SESSION['email'] = $email;
    //echo $email;exit;
    echo "<script>alert('Successfully Logged In');window.location.href='admin.php';</script>";
  }
  else
  {
    echo "<script>alert('login incorrct Please Try Again');window.location.href='index.php';</script>";
  }
}
?>
