<style type="text/css">
div#head_info span {
    margin-right: 0;
    padding-left: 0;
}

span#head_info_logout {
    color: red;
    font-weight: bold;
    display: block;
    position: relative;
    top: 0;
    line-height: 0;
}
div#head_info #head_info_admin {
    color: #ffe257;
    font-weight: bold;
    /* border: 1px solid #000; */
}

div#head_info {
    position: absolute;
    top: 0%;
    z-index: 10;
    right: 0;
    background: rgba(0,0,0, 0.5);
    width:auto;
    text-align: center;
    padding: 10px;
}
</style>
<div class="hidden-xs" id="head_info">
  <span class="hidden" id="ses_count"></span>
  <span class="hidden" id="limit_count"></span>

      <span id="" style="color: #fff;
        font-weight: 400;
    padding: 0;">Welcome <span style="color: #0071b2;"></span></span>
<span style="color: #fff56a;font-size: 15px;"><?php echo $_SESSION['uname'] ?></span>
      <span id="head_info_logout">
      <form class=" animate" method="post" action="<?php echo $URL_BASE; ?>">
        <button class="btn btn-warning" type="submit" name="logoutSubmit" >Logout</button>
      </form>
      </span>
</div>
<div style="width: 35% !important;" class="hidden-sm hidden-md hidden-lg" id="head_info">
<span style="color: #fff56a;font-size: 10px;"><?php echo $_SESSION['uname'] ?></span>
      <span id="head_info_logout">
      <form class=" animate" method="post" action="<?php echo $URL_BASE; ?>">
        <button class="btn btn-warning" type="submit" name="logoutSubmit" >Logout</button>
      </form>
      </span>
</div>