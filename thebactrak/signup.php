<?php 
include_once('header.php');
include_once('include_common.php');
?>
<?php

require_once('config.php');
    if(isset($_POST['signupsubmit']))
    {                

        $umail = $_POST['email'];
        $pwd = $_POST['psw'];
        $rpwd = $_POST['psw-repeat'];
        
        if($pwd != $rpwd)
        {
?>
            <script type="text/javascript">
                alert('password Confirm password not Match');
            </script>
<?php            
        }
        else
        {
          $qry = "select * from users where username  = '" . $umail . "'";
         
          $rows = mysqli_query($con, $qry);
       
          $num_rows = mysqli_num_rows($rows);

          $result = mysqli_fetch_assoc($rows);

          if($num_rows > 0)
          {
?>
            <script type="text/javascript">
                alert('Email Already Found');
            </script>
<?php     
          }
          else
          {
            $qry = "insert into users set username='".$umail."', password='".md5($pwd)."', used_count=0";
         
            $rows = mysqli_query($con, $qry);

?>
            <script type="text/javascript">
                window.location ='http://ec2-13-229-104-76.ap-southeast-1.compute.amazonaws.com/thebactrak';
            </script>
<?php
            
          }
        }
    }

?>
<style>
body {font-family: Arial, Helvetica, sans-serif;}
* {box-sizing: border-box}
/* Full-width input fields */
input[type=text], input[type=password], input[type=email] {
    width: 100%;
    padding: 15px;
    margin: 5px 0 22px 0;
    display: inline-block;
    border: none;
    background: #f1f1f1;
}

/* Add a background color when the inputs get focus */
input[type=text]:focus, input[type=password]:focus {
    background-color: #ddd;
    outline: none;
}

/* Set a style for all buttons */
button {
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    opacity: 0.9;
}

button:hover {
    opacity:1;
}

/* Extra styles for the cancel button */
.cancelbtn {
    padding: 14px 20px;
    background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn, .signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
    padding: 16px;
}

/* The Modal (background) */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: #474e5d;
    padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* Style the horizontal ruler */
hr {
    border: 1px solid #f1f1f1;
    margin-bottom: 25px;
}
 
/* The Close Button (x) */
.close {
    position: absolute;
    right: 35px;
    top: 15px;
    font-size: 40px;
    font-weight: bold;
    color: #f1f1f1;
}

.close:hover,
.close:focus {
    color: #f44336;
    cursor: pointer;
}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {
    .cancelbtn, .signupbtn {
       width: 100%;
    }
}
</style>
<body>

<div id="id01" style="background: url(img/dsbg.png);background-size: cover;padding-top:0px !important;display: block;" class="modal">
  <form method="post" style="margin:3% auto 15% auto;width: 35%!important;" class="modal-content" action="">
    <div class="container">
      <a href="<?php echo $URL_BASE; ?>">
        <img src="img/logo.png">
      </a>
      <p>Please fill in this form to create an account.</p>
      <hr>
      <label for="email"><b>Email</b></label>
      <input type="email" required="required" placeholder="Enter Email" name="email" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" required="required" placeholder="Enter Password" name="psw" required>

      <label for="psw-repeat"><b>Confirm Password</b></label>
      <input type="password" required="required" placeholder="Confirm Password" name="psw-repeat" required>
      
      <!-- <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
      </label>

      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p> -->

      <div class="clearfix">
        <button type="submit" name="signupsubmit" class="signupbtn">Sign Up</button>
      </div>
    </div>
  </form>
</div>

<script>
// Get the modal



var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

</script>

</body>
</html>
