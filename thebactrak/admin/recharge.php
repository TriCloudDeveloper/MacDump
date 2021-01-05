<?php
include_once('../config.php');
$ids = $_POST['id'];
$top_up_value  = $_POST['top_up_value']; 
$selectData ="select * from users where id = ".$ids;
$selectResult = mysqli_query($con,$selectData);
$data = mysqli_fetch_array($selectResult);
$usedCount = $data['used_count'];
$alreadyUsed = $data['already_used'];
$tatalCount = $usedCount + $alreadyUsed;
$update = "update users Set  user_limit = '".($top_up_value + $usedCount)."', already_used= '".$tatalCount."' where id = ".$ids;
$updateResult = mysqli_query($con,$update);
if($updateResult)
{
  echo "<script>alert('Recharge Successfully');window.location.href='admin.php';</script>";
}
else {
  echo "<script>alert('no recharge pls Try Again');window.location.href='admin.php';</script>";
}
 ?>
