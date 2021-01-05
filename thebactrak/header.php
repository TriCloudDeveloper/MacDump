<!DOCTYPE html>
<html>
<head>
    <script type="text/javascript" src="//m.addthis.com/live/red_lojson/300lo.json?si=5b04f78be04c3f2f&amp;bkl=0&amp;bl=1&amp;sid=5b04f78be04c3f2f&amp;pub=&amp;rev=v8.3.13-wp&amp;ln=en&amp;pc=men&amp;cb=0&amp;ab=-&amp;dp=localhost&amp;fp=frrole%2F&amp;fr=&amp;of=0&amp;pd=0&amp;irt=1&amp;vcl=1&amp;md=0&amp;ct=1&amp;tct=0&amp;abt=0&amp;cdn=0&amp;pi=1&amp;rb=0&amp;gen=100&amp;chr=UTF-8&amp;mk=consumer%20intelligence%2Cconsumer%20insights%2Cconsumer%20analytics%2Caudience%20intelligence%2Csocial%20listening%2Csocial%20analytics%2Csocial%20media%20analytics%2Cmarket%20research%2Cmarketing%20research%2Con-demand%20research&amp;colc=1527052171858&amp;jsl=1&amp;uvs=5b04f41cb1fce576001&amp;skipb=1&amp;callback=addthis.cbs.oln9_44653651479039480">
        </script>
        <title>thebactrak</title>
        
        <!--[if IE]><meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'><![endif]-->
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <base href=".">                
        <!--Meta tags-->
        
        <meta name="google-site-verification" content="Q7K8EWiIhGAaB-AodgK2TzxXClxW9_fsEpWEovpDJQ8">
        <meta name="description" content="Recruiter Profile Searching- AI built profile for every individual. Make your product more consumer-aware, increase your product’s value and utility for customers resulting in better than expected ROI.">
        <meta name="keywords" content="consumer intelligence, consumer insights, consumer analytics, audience intelligence, social listening, social analytics, social media analytics, market research, marketing research, on-demand research, influencer analysis, owned media insights, campaign insights">
        <meta name="author" content="thebactrak">

        <meta property="og:url" content="<?php echo $URL_BASE; ?>thebactrak-app/">
        <meta property="og:type" content="website">
        <meta property="og:title" content="Recruiter Profile Searching - AI built profile for every individual">
        <meta property="og:description" content="Recruiter Profile Searching - AI built profile for every individual. Make your product more consumer-aware, increase your product’s value and utility for customers resulting in better than expected ROI.">
        <meta property="og:image" content="img/logo.png">

        <meta name="twitter:card" content="summary">
        <meta name="twitter:url" content="<?php echo $URL_BASE; ?>thebactrak-app/">
        <meta name="twitter:title" content="Recruiter Profile Searching - AI built profile for every individual"> 
        <meta name="twitter:description" content="Recruiter Profile Searching - AI built profile for every individual. Make your product more consumer-aware, increase your product’s value and utility for customers resulting in better than expected ROI.">
        <meta name="twitter:image" content="img/logo.png">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        
        <!--Meta tags-->
        <!-- Google Tag Manager -->
        <script async="" src="<?php echo $URL_BASE; ?>/thebactrak App_files/analytics.js.download"></script><script src="<?php echo $URL_BASE; ?>/thebactrak App_files/1945684079093458" async=""></script><script async="" src="<?php echo $URL_BASE; ?>/thebactrak App_files/fbevents.js.download"></script><script async="" src="<?php echo $URL_BASE; ?>/thebactrak App_files/gtm.js.download"></script><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5M33FT6');</script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function(){
                setInterval(function(){
                    var uname = $('#uname_session').val();
                    var pwd = $('#pwd_session').val();
                $.ajax({
                        url: "ajax_function.php",
                        type: "post",
                        data: {"action":"get_count","uname":uname,"pwd":pwd},
                        success: function (response) {
                            var sp = response.split('-');
                            $('#ses_count').html(sp[0]);
                            $('#limit_count').html(sp[1]);
                            if(sp[0] == sp[1])
                            {
                                $('.limit-msg').removeClass('hidden');
                                $('#top-textbox-holder').addClass('hidden');
                            }
                            else
                            {
                                $('.limit-msg').addClass('hidden');
                                $('#top-textbox-holder').removeClass('hidden');   
                            }
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                           console.log(textStatus, errorThrown);
                        }
                    });
                  }, 1000);


                function validateEmail(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                }
                $("#signupClick").click(function(){
                    $("#id011").css("display", "block");
                    $("#id01").css("display", "none");
                });
                
                $("#signupformid").submit(function(){

                   var semail = $('#semail').val();
                   var spwd = $('#spwd').val();
                   var srpwd = $('#srpwd').val();
                    if(validateEmail(semail) == false)
                    {
                        $('#err_the').html('Email Invalid');
                    }    
                    else
                    {
                        if(spwd != srpwd)
                        {
                            $('#err_the').html('password / confirm password not match');
                        }
                        else
                        {   
                            var URL_BASE_NEW = $('#URL_BASE_NEW').val();
                            $.ajax({
                                url: "http://ec2-13-229-104-76.ap-southeast-1.compute.amazonaws.com/thebactrak/ajax_function.php",
                                type: "post",
                                data: {"action":"email_check","semail":semail,"spwd":spwd},
                                success: function (response)
                                {
                                    $('#email_result').val(response);
                                   if(response == 'yes')
                                    {
                                        $('#err_the').html('Email ID Alerady Exists');
                                        return false;
                                    }
                                    else
                                    {
                                        alert('Register Successfully');
                                        window.location.href = URL_BASE_NEW;
                                    }
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                   console.log(textStatus, errorThrown);
                                }
                            });
                        }
                    }
                    return false;
                });
            });
        </script>
        <!-- End Google Tag Manager -->
        <!-- Favicons -->
        <link rel="shortcut icon" href="img/favicon.png">
        <link rel="apple-touch-icon" href="img/favicon.png">
        <link rel="apple-touch-icon" sizes="72x72" href="img/favicon.png">
        <link rel="apple-touch-icon" sizes="114x114" href="img/favicon.png">
        
        <!-- CSS -->
        <link rel="chrome-webstore-item" href="https://chrome.google.com/webstore/detail/iklikkgplppchknjhfkmkjnnopomaifc">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/bootstrap.min.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/font-awesome.min.css">
        <!--<link href="css/clean-blog.css?v=0a4fdff" rel="stylesheet">-->
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/style.min.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/style-responsive.min.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/animate.min.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/vertical-rhythm.min.css">
        
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/magnific-popup.min.css">
        
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/style-manual.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/new-style.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $URL_BASE; ?>/thebactrak App_files/owl.carousel.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $URL_BASE; ?>/thebactrak App_files/owl.theme.default.css">
        <link rel="stylesheet" type="text/css" href="<?php echo $URL_BASE; ?>/thebactrak App_files/persona.css">
        <!-- Facebook Pixel Code -->
        <script>
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1945684079093458');
            fbq('track', 'PageView');
            
        </script>
        
        <noscript>
            <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1945684079093458&ev=PageView&noscript=1"/>
        </noscript>
        <!-- End Facebook Pixel Code -->
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/css/custom.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/css/custom1.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/sweetalert.css">
        <link rel="stylesheet" type="" href="<?php echo $URL_BASE; ?>/thebactrak App_files/iziToast.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/ds-landing.css">
        <link rel="stylesheet" href="<?php echo $URL_BASE; ?>/thebactrak App_files/override.css"> 
    </head>
        <body class="appear-animate" cz-shortcut-listen="true">
        <input type="hidden" name="URL_BASE_NEW" id="URL_BASE_NEW" value="<?php echo $URL_BASE; ?>">
        <input type="hidden" name="URL_BASE_NEW" id="uname_session" value="<?php echo $_SESSION['uname']; ?>">
        <input type="hidden" name="URL_BASE_NEW" id="pwd_session" value="<?php echo $_SESSION['psw']; ?>">