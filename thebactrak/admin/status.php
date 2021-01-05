<?php
include_once('../config.php');
$sta = $_GET['sta'];
$ids = $_GET['id'];
if($sta == 'app')
	$update = "update users Set status = 1 where id=$ids";
else
	$update = "update users Set status = 0 where id=$ids";

$updateResult = mysqli_query($con,$update);


if($updateResult)
{
				$selectData ="select * from users where id=$ids";
				$selectResult = mysqli_query($con,$selectData);
				$data = mysqli_fetch_array($selectResult);
				$usedMail = $data['username'];
				$npwd = md5($data['password']);
				$subject = "thebactrak Notification";
				$from = "admin@gmail.com";
				$to = $usedMail;
			
			   $headers = "From: thebactrak<" . $from . "> \r\n";
			   $headers .= "Return-Path: " . $from . " \r\n";
			   $headers .= "Reply-To: " . $from . " \r\n";
			   $headers .= "MIME-Version: 1.0\r\n";
			   $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
			   $headers .= "X-Priority: 3\r\n";
			   $headers .= "X-Mailer: PHP" . phpversion() . "\r\n";
				$message2 = "<html>"
                   . "<head></head>"
                   . "<body>"
                  	. "Dear Customer,<br>
Congratulations! Your account with thebactrak has been verified and successfully opened. You may proceed to log-in using below link <br>http://ec2-13-229-104-76.ap-southeast-1.compute.amazonaws.com/thebactrak/"
                   //. "<p>Your notified product <b>".$from_mail_res['name']."</b> live deal price is <b>$".$_POST['livedeal_price']."</b>. Your will purchase immediately, low stock available HURRY!!!</p> <br>"
                   . "<p>Regards,</p>"
                   . "<p>thebactrak</p>"
                   . "</body>"
                   . "</html>";
        
           $success = mail($to, $subject, $message2, $headers);

  echo "<script>alert('Update successfully');window.location.href='charts.php';</script>";
}
else {
  echo "<script>alert('no Update pls Try Again');window.location.href='charts.php';</script>";
}
 ?>
