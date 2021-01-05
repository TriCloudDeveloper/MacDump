<?php
	include_once('../config.php');	
	$id = $_GET['id'];
	$selectData ="UPDATE users SET status =0  where id =".$id;
    $selectResult = mysqli_query($con,$selectData);
    header("Location: charts.php?block=succ");

?>