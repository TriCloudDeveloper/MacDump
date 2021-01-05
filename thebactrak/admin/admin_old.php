<?php
include_once('../include_common.php'); 
session_start();

if(isset($_SESSION['email']))
{
    $email = $_SESSION['email'];
    //echo $email;
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <body>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css">
    

    <nav class="navbar navbar-default">
    <div class="container-fluid">
    <div class="navbar-header">
    <a class="navbar-brand" href="<?php echo $URL_BASE; ?>admin/admin.php">
        <img style="height: 100%;width:50%;" id="thebactrak-logo" src="<?php echo $URL_BASE; ?>/img/logo.png" class="">
    </a>
    </div>
    <ul class="nav navbar-nav navbar-right">
    <li style="margin-top:15px;"><?php echo $email;?></li>
    <li><a href="logout.php"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
    </ul>
    </div>
    </nav>

    <div class="container">
    <table id="example" class="table table-striped table-bordered" style="width:100%">
    <thead>
    <tr style="background:yellow;">
    <th>Sno</th>
    <th>Username</th>
    <th>Used Search Limit</th>
    <th>Remaining Search Limit</th>
    <th>Action</th>
    </tr>
    </thead>
    <?php
    include_once('../config.php');
    $selectData ="select * from users";
    $selectResult = mysqli_query($con,$selectData);
    while($data = mysqli_fetch_array($selectResult))
    { ?>
    <tr>
    <td><?php echo $data['id'];?></td>
    <td><?php echo $data['username'];?></td>
    <td><?php echo $data['used_count'];?></td>
    <td><?php echo (5-$data['used_count']);?></td>
    <td><?php if($data['used_count']==5) {echo '<a href="recharge.php?id='.$data['id'].'"">Top Up</a>';}else {echo '-';}?></td>
    </tr>
    <?php } ?>
    </table>
    </div>
    </body>
    </html>
<?php
} else{
    header("location:/admin/index.php");
}
