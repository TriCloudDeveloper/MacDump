<?php 
require_once('include_common.php');
?>

<style>
body {font-family: Arial, Helvetica, sans-serif;}

/* Full-width input fields */
input[type=text], input[type=password], input[type=email] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
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
}

button:hover {
    opacity: 0.8;
}

/* Extra styles for the cancel button */
.cancelbtn {
    width: auto;
    padding: 10px 18px;
    background-color: #f44336;
}

/* Center the image and position the close button */
.imgcontainer {
    text-align: center;
    margin: 24px 0 12px 0;
    position: relative;
}

img.avatar {
    width: 33%;
    border-radius: 50%;
}

.container {
    padding: 16px;
}

span.psw {
    float: right;
    padding-top: 16px;
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
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
    padding-top: 60px;
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button (x) */
.close {
    position: absolute;
    right: 25px;
    top: 0;
    color: #000;
    font-size: 35px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: red;
    cursor: pointer;
}

/* Add Zoom Animation */
.animate {
    -webkit-animation: animatezoom 0.6s;
    animation: animatezoom 0.6s
}

@-webkit-keyframes animatezoom {
    from {-webkit-transform: scale(0)} 
    to {-webkit-transform: scale(1)}
}
    
@keyframes animatezoom {
    from {transform: scale(0)} 
    to {transform: scale(1)}
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
    span.psw {
       display: block;
       float: none;
    }
    .cancelbtn {
       width: 100%;
    }
}
</style>
<section class="home-section bg-dark bg-dark-alfa-30" id="home" style="background: url(img/dsbg.png) no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;">
               <div id="logo-div">
                <a href="<?php echo $URL_BASE; ?>">
                   <img id="thebactrak-logo" src="<?php echo $URL_BASE; ?>/img/logo.png" class="hidden-sm hidden-xs">
                </a>
                <a href="<?php echo $URL_BASE; ?>">
                   <img id="thebactrak-logo1" src="<?php echo $URL_BASE; ?>/img/logo.png" class="hidden-md hidden-lg">
               </a>
               </div>
                <div class="reopen_container displaynone"><i class="fa fa-times"></i></div>
                <div class="download"><i class="fa fa-download" aria-hidden="true"></i></div>
                <div class="" style="height:770px;">                    
                <div id="id01" class="col-sm-4 col-sm-offset-4">

                <form class=" animate" method="post" action="<?php echo $URL_BASE; ?>">
                <div style="background: #fff;color: #000;padding: 20px;border: 2px solid #9b9286;">
                    <div class="imgcontainer">
                        <img src="<?php echo $URL_BASE; ?>images/img_avatar2.png" alt="Avatar" class="avatar">
                    </div>

                    <div class="">
                        <label for="uname"><b>Email</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required>

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required>

                        <button type="submit" name="loginSubmit" >Login</button>
                    </div>
                    <div style="color: #4CAF50;">
            <a style="color:#092cd6;" href="javascript:;" id="signupClick">Register</a> <!-- or <a style="color:#092cd6;" href="#">Forgot password</a> -->
          </div>

                </div>
                </form>
                </div>
                       <div id="id011" style="display: none;" class="col-sm-4 col-sm-offset-4">
               <!-- <form method="post" style="margin:3% auto 15% auto;width: 35%!important;" class="modal-content" action=""> -->
                <form class=" animate" method="post" id="signupformid" action="<?php echo $URL_BASE; ?>">
                    <div style="background: #fff;color: #000;padding: 20px;border: 2px solid #9b9286;">
    <div class="">
      <div style="text-align: center;"><img src="<?php echo $URL_BASE; ?>images/img_avatar2.png" alt="Avatar" class="avatar">
      </div>
      <p>Please fill in this form to create an account.</p>
      <hr>
      <label for="email"><b>Email</b></label>
      <input type="email" required="required" placeholder="Enter Email" id="semail" name="email" required>

      <label for="psw"><b>Password</b></label>
      <input type="password" required="required" placeholder="Enter Password" id="spwd" name="psw" required>

      <label for="psw-repeat"><b>Confirm Password</b></label>
      <input type="password" required="required" placeholder="Confirm Password" id="srpwd" name="psw-repeat" required>
      <span id="err_the" style="color:red;"></span>
      <!-- <input type="text" name="email_result" id="email_result" value="1"> -->
      <!-- <label>
        <input type="checkbox" checked="checked" name="remember" style="margin-bottom:15px"> Remember me
      </label>

      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p> -->

      <div class="clearfix">
        <button type="submit" name="signupsubmit" id="signupsubmit" class="signupbtn">Sign Up</button>
      </div>
    </div>
</div>
  </form>
                </div>
                    <!-- End Hero Content -->
                </div>
            </section>
