<?php
include_once('../include_common.php');
session_start();
if(isset($_SESSION['email']))
{
  
  //unset($_SESSION['username']);
  
  /*unset($_SESSION['email']);*/
  session_destroy();
   $_SESSION = "";
  //session_destroy();
  header("location:".$URL_BASE."admin/index.php");
  //exit();
}
else {
    header("location:".$URL_BASE."admin/index.php");
}
 //to redirect back to "index.php" after logging out
?>
