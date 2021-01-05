<?php include_once('../include_common.php'); 
include_once('../config.php');
session_start();
if($_POST['submit_btn']){
    
    $password = $_POST['enter_your_password'];
    $new_pwd = $_POST['enter_new_password'];

    $selectData ="select * from login where email ='admin' AND password ='".md5($password)."'";

    $selectResult = mysqli_query($con,$selectData);
    $num_rows = mysqli_num_rows($selectResult);
 
    $err=0;
    if($num_rows > 0)
    {
      $selectData ="UPDATE login SET password ='".md5($new_pwd)."'  where email ='admin'";
      
      $selectResult = mysqli_query($con,$selectData);
      $err=2;
    }
    else
    {
      $err=1;
    }

}
if(isset($_SESSION['email']))
{
    $email = $_SESSION['email'];
    //echo $email;

?>
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
  <!-- Page level plugin CSS-->
  <link href="vendor/datatables/dataTables.bootstrap4.css" rel="stylesheet">
  <!-- Custom styles for this template-->
  <link href="css/sb-admin.css" rel="stylesheet">
  <style type="text/css">
    .val_error_msg{color:red;}
  </style>
</head>

<body class="fixed-nav sticky-footer bg-dark" id="page-top">
  <!-- Navigation-->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
    <a class="navbar-brand" href="admin.php">
      <img id="thebactrak-logo" style="height: 50%;width:50%;" src="<?php echo $URL_BASE; ?>/img/logo.png" class="">
    </a>
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav navbar-sidenav" id="exampleAccordion">
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Dashboard">
          <a class="nav-link" href="admin.php">
            <i class="fa fa-fw fa-dashboard"></i>
            <span class="nav-link-text">Dashboard</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Charts">
          <a class="nav-link" href="charts.php">
            <i class="fa fa-fw fa-area-chart"></i>
            <span class="nav-link-text">Users List</span>
          </a>
        </li>
        <li class="nav-item" data-toggle="tooltip" data-placement="right" title="Tables">
          <a class="nav-link" href="tables.php">
            <i class="fa fa-fw fa-table"></i>
            <span class="nav-link-text">Users Top Up</span>
          </a>
        </li>
 
      </ul>
      <ul class="navbar-nav sidenav-toggler">
        <li class="nav-item">
          <a class="nav-link text-center" id="sidenavToggler">
            <i class="fa fa-fw fa-angle-left"></i>
          </a>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item dropdown">
       <!--    <a class="nav-link dropdown-toggle mr-lg-2" id="messagesDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-envelope"></i>
            <span class="d-lg-none">Messages
              <span class="badge badge-pill badge-primary">12 New</span>
            </span>
            <span class="indicator text-primary d-none d-lg-block">
              <i class="fa fa-fw fa-circle"></i>
            </span>
          </a> -->
          <div class="dropdown-menu" aria-labelledby="messagesDropdown">
            <h6 class="dropdown-header">New Messages:</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>David Miller</strong>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">Hey there! This new version of SB Admin is pretty awesome! These messages clip off when they reach the end of the box so they don't overflow over to the sides!</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>Jane Smith</strong>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">I was wondering if you could meet for an appointment at 3:00 instead of 4:00. Thanks!</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <strong>John Doe</strong>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">I've sent the final files over to you for review. When you're able to sign off of them let me know and we can discuss distribution.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item small" href="#">View all messages</a>
          </div>
        </li>
        <li class="nav-item dropdown">
        <!--   <a class="nav-link dropdown-toggle mr-lg-2" id="alertsDropdown" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-fw fa-bell"></i>
            <span class="d-lg-none">Alerts
              <span class="badge badge-pill badge-warning">6 New</span>
            </span>
            <span class="indicator text-warning d-none d-lg-block">
              <i class="fa fa-fw fa-circle"></i>
            </span>
          </a> -->
          <div class="dropdown-menu" aria-labelledby="alertsDropdown">
            <h6 class="dropdown-header">New Alerts:</h6>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-success">
                <strong>
                  <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-danger">
                <strong>
                  <i class="fa fa-long-arrow-down fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">
              <span class="text-success">
                <strong>
                  <i class="fa fa-long-arrow-up fa-fw"></i>Status Update</strong>
              </span>
              <span class="small float-right text-muted">11:21 AM</span>
              <div class="dropdown-message small">This is an automated server response message. All systems are online.</div>
            </a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item small" href="#">View all alerts</a>
          </div>
        </li>
        <li class="nav-item">
          <form class="form-inline my-2 my-lg-0 mr-lg-2">
            <div class="input-group">
              <input class="form-control" type="text" placeholder="Search for...">
              <span class="input-group-append">
                <button class="btn btn-primary" type="button">
                  <i class="fa fa-search"></i>
                </button>
              </span>
            </div>
          </form>
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="modal" data-target="#exampleModal">
            <i class="fa fa-fw fa-sign-out"></i>Logout</a>
        </li>
      </ul>
    </div>
  </nav>
  <div class="content-wrapper">
    <div class="container-fluid">
      <!-- Breadcrumbs-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li class="breadcrumb-item active">Password Change</li>
      </ol>
      <!-- Example DataTables Card-->
      <?php if($err == 2){ ?>
        <div class="alert alert-success">Password Change Successfully</div>
      <?php }?> 
      <div class="card mb-3">
        <div class="card-header">
          <i class="fa fa-table"></i>Admin Password Change</div>
        <div class="card-body">
          <form class="" action="" autocomplete="off" method="post" name="visitor_frm" id="visitor_frm" onSubmit="return passwordValidation();">
          <?php
            
            $selectData ="select * from login where email ='admin@gmail.com'";
            $selectResult = mysqli_query($con,$selectData);
            $i=1;
            
            while($data = mysqli_fetch_array($selectResult))
            {
              ?>
              <input type="text" name="user_pwd_check" id="user_pwd_check" value="<?php echo $data['password']; ?>">
              <?php
            }
          ?>
                    <div class="col-md-12">
                        <div class="form-group row required">
                            <label class="col-md-4 control-label">Enter Old Password:</label>
                            <div class="col-md-8">
                                <input type="password" class="form-control" id="enter_your_password" name="enter_your_password" value="">
                                <div class="val_error_msg">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group row required">
                            <label class="col-md-4 control-label">Enter New Password:</label>
                            <div class="col-md-8">
                                <input type="password" class="form-control" id="enter_new_password" name="enter_new_password" value="">
                                <div class="val_error_msg">&nbsp;</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12">
                        <div class="form-group row required">
                            <label class="col-md-4 control-label">Enter Confirm Password:</label>
                            <div class="col-md-8">
                                <input type="password" class="form-control" id="enter_confirm_password" name="enter_confirm_password" value="">
                                <div class="val_error_msg">&nbsp;</div>
                            </div>
                        </div>
                    </div>


                    <div class="col-md-12 mrgn_top">
                        <div class="form-group row text-center">
                            <input type="submit" class="btn btn-primary blue_bg" id="submit_btn" name="submit_btn" value="Submit">
                        </div>
                    </div>
                </form>
        </div>
        <div class="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
      </div>
    </div>
    <!-- /.container-fluid-->
    <!-- /.content-wrapper-->
    <footer class="sticky-footer">
      <div class="container">
        <div class="text-center">
          <small>Copyright © Your Website 2018</small>
        </div>
      </div>
    </footer>
    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fa fa-angle-up"></i>
    </a>
    <!-- Logout Modal-->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="logout.php">Logout</a>
          </div>
        </div>
      </div>
    </div>
    <!-- Bootstrap core JavaScript-->
    <script src="vendor/jquery/jquery.min.js"></script>
    <script src="vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
    <!-- Core plugin JavaScript-->
    <script src="vendor/jquery-easing/jquery.easing.min.js"></script>
    <!-- Page level plugin JavaScript-->
    <script src="vendor/datatables/jquery.dataTables.js"></script>
    <script src="vendor/datatables/dataTables.bootstrap4.js"></script>
    <!-- Custom scripts for all pages-->
    <script src="js/sb-admin.min.js"></script>
    <!-- Custom scripts for this page-->
    <script src="js/sb-admin-datatables.min.js"></script>
    <script>
    function passwordValidation() {
        var returnVal = true;
        var valid_fields = '';

        if ($("#enter_your_password").val() == "") {
            $("#enter_your_password").next(".val_error_msg").html("This field is required.");
            returnVal = false;
            valid_fields += 'Enter Your Password\n';
        }

        
        if ($("#enter_new_password").val() == "") {
            $("#enter_new_password").next(".val_error_msg").html("This field is required.");
            return false;
        }
        if ($("#enter_new_password").val() != $("#enter_confirm_password").val()) {
            $("#enter_confirm_password").next(".val_error_msg").html("Password and Confirm password mismatched.");
            return false;
        }
        

        if(returnVal == false){
            alert(valid_fields);
        }

        return returnVal;
    }

   
</script>

  </div>
</body>

</html>
<?php 
  }
  else
  {
      header("location:".$URL_BASE."admin/index.php");
  }
?>