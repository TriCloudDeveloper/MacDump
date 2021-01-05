<?php

    require_once('include_common.php');

    require_once('ses.php');
    
    require_once('config.php');


    if(isset($_POST['loginSubmit']))
    {                

        $qry = "select * from users where status = 1 and username  = '" . $_POST['uname'] . "' and password = '".md5($_POST['psw'])."'";
         
        $rows = mysqli_query($con, $qry);
     
        $num_rows = mysqli_num_rows($rows);

        $result = mysqli_fetch_assoc($rows);
        $count = $result['used_count'];

        if($num_rows > 0)
        {
            $_SESSION['uname'] = $_POST['uname'];
            $_SESSION['psw'] = $_POST['psw'];            
            $_SESSION['count'] = $count;
        }
        else
        {

        $qry = "select * from users where status = 3 and username  = '" . $_POST['uname'] . "' and password = '".md5($_POST['psw'])."'";
         
        $rows = mysqli_query($con, $qry);
     
        $num_rows = mysqli_num_rows($rows);
            if($num_rows > 0)
            {
            /*unset($_SESSION['uname']);
            unset($_SESSION['psw']);
            unset($_SESSION['count']);*/
            session_destroy();
            $_SESSION = "";
?>
            <script type="text/javascript">
                alert('Please wait! You will receive approved mail from admin');
            </script>
<?php       
            }
            else
            {
                $qry1 = "select * from users where status = 0 and username  = '" . $_POST['uname'] . "' and password = '".md5($_POST['psw'])."'";
         
                $rows1 = mysqli_query($con, $qry1);
             
                $num_rows1 = mysqli_num_rows($rows1);
                
                if($num_rows1 > 0)
                {
?> 
                <script type="text/javascript">
                    alert('your Account Suspend');
                </script>

<?php
                }
                else
                {
                    /*unset($_SESSION['uname']);
                    unset($_SESSION['psw']);
                    unset($_SESSION['count']);*/
                    session_destroy();
                    $_SESSION = "";
?>
                    <script type="text/javascript">
                        alert('Login Invalid');
                    </script>
<?php       
                }
            }     
        }

        $_POST['loginSubmit'] = "";
    }
    if(isset($_POST['logoutSubmit']))
    {
        //session_destroy();
        //unset($_SESSION);
        /*unset($_SESSION['uname']);
        unset($_SESSION['psw']);
        unset($_SESSION['count']);
        $_SESSION =  '';*/
        session_destroy();
        $_SESSION = "";
        //header('Location: '.$URL_BASE);
    }

    include_once('header.php');
    
    if(($root == $URL_BASE) && $_SESSION['uname'] == '')
    {        
        include_once('login.php');
    }
    else if(($root == $URL_BASE) && $_SESSION['uname'] !='')
    {
        $qry = "select * from users where username  = '" . $_SESSION['uname'] . "' and password = '".md5($_SESSION['psw'])."'";
         
        $rows = mysqli_query($con, $qry);
     
        $num_rows = mysqli_num_rows($rows);

        $result = mysqli_fetch_assoc($rows);
        $count = $result['used_count'];

        if($num_rows > 0)
        {
            $_SESSION['count'] = $count;
        }
        include_once('main.php');
    }
    else if(($root == $URL_BASE."thebactrak-app/") && $_SESSION['uname'] !='')
    {
        $qry = "select * from users where username  = '" . $_SESSION['uname'] . "' and password = '".md5($_SESSION['psw'])."'";
         
        $rows = mysqli_query($con, $qry);
     
        $num_rows = mysqli_num_rows($rows);

        $result = mysqli_fetch_assoc($rows);
        $count = $result['used_count'];

        if($num_rows > 0)
        {
            $_SESSION['count'] = $count;
        }
        echo "<meta http-equiv='refresh' content='0;URL=".$URL_BASE."' />";
    }
    else if(($root == $URL_BASE."thebactrak-app/") && $_SESSION['uname'] =='')
    {
        include_once('login.php');
    }
    else
    {
        echo "<meta http-equiv='refresh' content='0;URL=".$URL_BASE."' />";
    }

?>
</body>
</html>