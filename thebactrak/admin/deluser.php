<?php
	include_once('../config.php');	
	$id = $_GET['id'];
	$selectData ="DELETE FROM users  where id =".$id;
    $selectResult = mysqli_query($con,$selectData);
    header("Location: charts.php?del=succ");

?>