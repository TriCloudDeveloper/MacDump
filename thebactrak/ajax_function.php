<?php
    require_once('include_common.php');
    require_once('config.php');
	
	$action = $_POST['action'];
  if($action == 'image_save')
  {
    define('DIRECTORY', 'img1/');
    $files = glob($URL_BASE.'img1/'); // get all file names
    foreach($files as $file){ // iterate files
      
        unlink($file); // delete file
    }

    $url = $_POST['url'];
    $name = $_POST['name'];
    $dir = "img/";
    
    $content = file_get_contents($url);
    file_put_contents(DIRECTORY . '/'.$name.'.jpg', $content);
    echo $name;
  }
	if($action == 'get_count')
	{

		$uname = $_POST['uname'];
		$pwd = $_POST['pwd'];
		$qry = "select * from users where username  = '" . $uname . "' and password = '".md5($pwd)."'";
         
        $rows = mysqli_query($con, $qry);
     
        $num_rows = mysqli_num_rows($rows);

        $result = mysqli_fetch_assoc($rows);
        
        echo $count = $result['used_count'].'-'.$result['user_limit'];

	}
	if($action == 'user_count')
	{
		$uname = $_POST['uname'];
		$pwd = $_POST['pwd'];
		$qry = "select * from users where username  = '" . $uname . "' and password = '".md5($pwd)."'";
        $rows = mysqli_query($con, $qry);
        $result = mysqli_fetch_assoc($rows);
        $count = $result['used_count'];

        $qry = "update users set used_count = ".($count+1)." where username  = '" . $uname . "' and password = '".md5($pwd)."'";
        $rows = mysqli_query($con, $qry);
	}
	if($action == 'user_count_decreese')
	{
		$uname = $_POST['uname'];
		$pwd = $_POST['pwd'];
		$qry = "select * from users where username  = '" . $uname . "' and password = '".md5($pwd)."'";
        $rows = mysqli_query($con, $qry);
        $result = mysqli_fetch_assoc($rows);
        $count = $result['used_count'];

        $qry = "update users set used_count = ".($count-1)." where username  = '" . $uname . "' and password = '".md5($pwd)."'";
        $rows = mysqli_query($con, $qry);
	}
	if($action == 'email_check')
	{
		$qry = "select * from users where username  = '" . $_POST['semail'] . "'";
         
          $rows = mysqli_query($con, $qry);
       
          $num_rows = mysqli_num_rows($rows);

          $result = mysqli_fetch_assoc($rows);

          if($num_rows > 0)
          {
          	echo  'yes';
          }
          else
          {
          	$qry = "insert into users set username='".$_POST['semail']."', password='".md5($_POST['spwd'])."',status = 3, used_count=0,user_limit =5";
         
            $rows = mysqli_query($con, $qry);

            echo 'success';/*
            session_start();
            $_SESSION['uname'] = $_POST['semail'];
            $_SESSION['psw'] = $_POST['spwd'];            
            $_SESSION['count'] = 0;*/
          }
	}
	if($action == 'pdf_generate')
  {
    


$html = file_get_contents('header_pdf.php');
$html .= $_POST['data'];
$html .='</body></html>';

$myfile = fopen("newfile.php", "w") or die("Unable to open file!");

fwrite($myfile, $html);

fclose($myfile);
$html = file_get_contents('newfile.php');

   include("mpdf/mpdf60/mpdf.php");

    
    $mpdf=new mPDF('utf-8', array(230,140));
    $mpdf=new mPDF('c','A3','','',20,15,10,25,10,10,'P'); 
    $mpdf->SetProtection(array('print'));
    $mpdf->SetTitle("Vaiha - Work Completion");
    $mpdf->SetAuthor("Vaiha");
    //$mpdf->SetWatermarkText("VAIHA");
    $mpdf->showWatermarkText = true;
    $mpdf->watermark_font = 'DejaVuSansCondensed';
    $mpdf->watermarkTextAlpha = 0.1;
    $mpdf->SetDisplayMode('default');

    $mpdf->WriteHTML($html);


    //$mpdf->Output('mypdf.pdf','D'); 
    $mpdf->Output('demo.pdf', 'F');
/*$myfile = fopen("newfile.txt", "w") or die("Unable to open file!");

fwrite($myfile, $html);

fclose($myfile);
*/
$html = str_replace("preview_btn","preview_btn1",$html);
$nhtml = str_replace("btn-Convert-Html2Image","btn-Convert-Html2Image1",$html);
  echo $nhtml;
  }
	//echo $qry;
?>