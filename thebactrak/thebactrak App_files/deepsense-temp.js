var affinityGlobal = [];
var verifiedGlobal = [];
var twitterId = '';
var dayactivityGlobal = [];
var failedUsers = [];
var deeplinkUrl = '';
var event;
$('.placeholder').click(function() {
    $(this).hide();
    $('#tuid').focus();
})
$('#tuid').blur(function() {
    if ($('#tuid').val() == '')
        $('.placeholder').show();
})

function createAccount() {
    var current_apikey = '';
    if(localStorage.getItem('webapp-apikey') != null && localStorage.getItem('webapp-apikey') != undefined && localStorage.getItem('webapp-apikey') != '') {
        current_apikey = localStorage.getItem('webapp-apikey');
    }
    localStorage.getItem('webapp-apikey');
    // console.log("current_apikey"+current_apikey);
    if(current_apikey != '' && current_apikey.indexOf('chrexec') != -1){
        $('#account-div').show();
        $.ajax({
            url: '//api.frrole.com/v4/user-profile?apikey='+current_apikey+'&persona=employee,customercare&userid=',
            type: "GET",
            success: function(data) {
                // console.log("Quota :" + JSON.stringify(data));
                if(data.hasOwnProperty('usage_stats') 
                && data.usage_stats.hasOwnProperty('user_profile') 
                && data.usage_stats.user_profile.hasOwnProperty('limit')
                && data.usage_stats.user_profile.hasOwnProperty('consumed')) {
                    var _text = data.usage_stats.user_profile.consumed+" of "+data.usage_stats.user_profile.limit+" free profiles this month"
                    $('#account_remaining').html(_text);
                } 
            }
        })
    } else {
        $('#account-div').hide();
    }
}

function precisionRound(number, precision) {
    var factor = Math.pow(10, precision);
    return Math.round(number * factor) / factor;
}

var _messages = [
    "Searching through 3+ billion profiles",
    "Trying to find the right match",
    "Please wait, it's still faster than you could draw it",
    "Please wait, while the satellite moves into position",
    "Please wait, while the little elves draw your map",
    "Please wait, the server is powered by a lemon and two electrodes"
];

function getCurrentApikey() {
    var curApikey = '';
    
    if(localStorage.getItem('webapp-apikey') != null && localStorage.getItem('webapp-apikey') != undefined && localStorage.getItem('webapp-apikey') != '') {
        curApikey = localStorage.getItem('webapp-apikey');
    }
    if(curApikey != '' && curApikey.indexOf('chrexec') != -1){
        return curApikey;
    }  else {    
        /*localStorage.setItem('webapp-apikey','DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443');
        return 'DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443';*/
        localStorage.setItem('webapp-apikey','chrexec_a3646bd3c788b13b2aebc8e874dd6067');
        return 'chrexec_a3646bd3c788b13b2aebc8e874dd6067';

    }
}

function setCorrectApikey() {
    if((localStorage.getItem('webapp-email') != null || 
        localStorage.getItem('webapp-email') != undefined || 
        localStorage.getItem('webapp-email') != '') && 
        (parseInt(localStorage.getItem('analysis_number')) == -1 ||
        parseInt(localStorage.getItem('analysis_number')) > 3 )) {
            $.ajax({
                url: '//api.frrole.com/views/apiv2/webapp_passcode_generate.php?emailid=' + localStorage.getItem('webapp-email') +'&appname=Web-App',
                type: "GET",
                success: function(data) {
                    if(data.hasOwnProperty('status') && data.status 
                    && data.hasOwnProperty('apikey') && data.apikey != '') {
                        localStorage.setItem('webapp-apikey',data.apikey);
                        return data.apikey;
                    } else {
                        localStorage.setItem('webapp-apikey','DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443');
                        return 'DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443';
                    }
                },
                error: function () {
                    localStorage.setItem('analysis_number', 2);
                    localStorage.setItem('webapp-apikey','DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443');
                    return 'DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443';
                }
            });
    }
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function returnErrorMessage(username) {
    
    var URL_BASE = $('#URL_BASE').val();
    var tuid = $('#tuid').val();
    var uname = $('#SESSION_UNAME').val();
    var pwd = $('#SESSION_PWD').val();
    
    $.ajax({
        url: URL_BASE + "ajax_function.php",
        type: "post",
        data: {"action":"user_count_decreese","uname":uname,"pwd":pwd},
        success: function (response) {
           //alert(response);
        },
        error: function(jqXHR, textStatus, errorThrown) {
           console.log(textStatus, errorThrown);
        }
    });
    
    if(validateEmail(username)) {
        return "Could not find a matching user. Why don't you try with this person's Linkedin URL or Twitter handle instead?";
    } else if(username.indexOf('https://www.linkedin.com') !== -1 || username.indexOf('http://www.linkedin.com') !== -1) {
        return "Could not find a match on Linkedin. Why don't you try with this person's Email ID or Phone No. instead?";
    } else {
        return "Could not find a matching user. Why don't you try with this person's Email ID or Linkedin URL instead?";
    }   

}

// $(window).load(function(){
//     $('.page-loader').hide();
// })

// $(document).ready(function(){
//     var htmlsArr = ["dsapp_recruitment","dsapp_features","dsapp_news"];
//     htmlsArr.foreach(function(){
//             console.log('partial_htmls/deepsense_app/' + val + '.html');
//             $('#' + val).load('partial_htmls/deepsense_app/' + val + '.html');
//         }
//     )
// })
function update_lead(leadid, attr, val) {
    var accessKey = "u$r556d9817cb115fe65c1d6557f385c435";
    var secretKey = "8ade979728e840ea39bcf55f932858811aab4351";
    updateleadData = [
        {
            "Attribute": attr,
            "Value": val
        }
    ]
    $.ajax({
        url: "https://api.leadsquared.com/v2/LeadManagement.svc/Lead.Update?accessKey="+accessKey+"&secretKey="+secretKey+"&leadId="+leadid,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(updateleadData),
        success: function(response) {
            // console.log("activity response: " + JSON.stringify(response));
        }
    })
} 


function update_ls(name, email, company, activity) {
    // var accessKey = "";
    // var secretKey = "";
    var accessKey = "u$r556d9817cb115fe65c1d6557f385c435";
    var secretKey = "8ade979728e840ea39bcf55f932858811aab4351";
    var checkleadUrl = "https://api.leadsquared.com/v2/LeadManagement.svc/Leads.GetByEmailaddress?accessKey="+accessKey+"&secretKey="+secretKey+"&emailaddress="+email;
    var addaleadUrl = "https://api.leadsquared.com/v2/LeadManagement.svc/Lead.Create?accessKey="+accessKey+"&secretKey="+secretKey;
    var addactivityUrl = "https://api.leadsquared.com/v2/ProspectActivity.svc/Create?accessKey="+accessKey+"&secretKey="+secretKey;
    var addlead_data = [
        {
            "Attribute": "EmailAddress",
            "Value": email
        },
        {
            "Attribute": "FirstName",
            "Value": name
        },
        {
            "Attribute": "company",
            "Value": company
        }
    ];

    var activityEvents = {
        demo: 155,//
        Deepsense_demo: 153, //
        scout_demo: 154, //
        API_demo: 156, //
        deepsense_registration: 157, //
        deepsense_extn_registration: 158, 
        deepsense_whitepaper: 159, //
        scout_registration: 160, 
        scout_whitepaper: 161, //
        api_request_apikey: 162, //
        api_request_apikey_ds: 163,
        download_case_study_maxus: 164, //
        download_case_study_samsung: 165, //
        download_case_study_flipkat: 166, //
        download_case_study_kaleidoscope: 167, //
        download_case_study_freshdesk: 168, //
        download_case_study_timesnow: 169 //
    };

    var casestudyRefs = {
        164: "Maxus",
        165: "Samsung",
        166: "Flipkart",
        167: "Kaleidoscope",
        168: "Freshdesk",
        169: "Times Now"
    };

    var whitepaperRef = {
        159: "DeepSense White Paper",
        161: "Scout White Paper"
    };

    var registrationref = {
        157: "DeepSense",
        158: "DeepSense Extension",
        160: "Scout"
    }

    var relatedProspectId = '';

    $.ajax({
        url: checkleadUrl,
        dataType: "json",
        success: function(response) {

            if(response.length > 0 && response[0].hasOwnProperty('ProspectID')) {
                relatedProspectId = response[0]["ProspectID"];
                var addaction_data = {};
                if(activityEvents[activity] == 164 ||
                    activityEvents[activity] == 165 ||
                    activityEvents[activity] == 166 || 
                    activityEvents[activity] == 167 || 
                    activityEvents[activity] == 168 || 
                    activityEvents[activity] == 169) {
                        addlead_data = [
                            {
                                "Attribute": "Case Study",
                                "Value": casestudyRefs[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : [],
                            "Case Study": casestudyRefs[activityEvents[activity]]
                            
                        };
                        update_lead(relatedProspectId, "mx_Actions", casestudyRefs[activityEvents[activity]]);
                } else if(activityEvents[activity] == 159 ||
                    activityEvents[activity] == 161 ) {
                        addlead_data = [
                            {
                                "Attribute": "Case Study",
                                "Value": whitepaperRef[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : [],
                            "White Paper": whitepaperRef[activityEvents[activity]]
                            
                        };
                        update_lead(relatedProspectId, "mx_White_Paper", whitepaperRef[activityEvents[activity]]);
                } else if(activityEvents[activity] == 157 ||
                    activityEvents[activity] == 158 ||
                    activityEvents[activity] == 160 ) {
                        addlead_data = [
                            {
                                "Attribute": "White Paper",
                                "Value": registrationref[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : [],
                            "Registration": registrationref[activityEvents[activity]]
                        };
                        update_lead(relatedProspectId, "mx_Registration", registrationref[activityEvents[activity]]);
                } else {
                    addaction_data = {
                        "RelatedProspectId": ""+relatedProspectId,
                        "ActivityEvent": activityEvents[activity],
                        "Fields" : []
                    };
                }
                
                // console.log("Action Data: " + JSON.stringify(addaction_data));
                $.ajax({
                    url: addactivityUrl,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(addaction_data),
                    success: function(response1) {
                        // console.log("activity response: " + JSON.stringify(response1));
                    }
                })
            }
            else {
                
                if(activityEvents[activity] == 164 ||
                    activityEvents[activity] == 165 ||
                    activityEvents[activity] == 166 || 
                    activityEvents[activity] == 167 || 
                    activityEvents[activity] == 168 || 
                    activityEvents[activity] == 169) {
                        addlead_data = [
                            {
                                "Attribute": "EmailAddress",
                                "Value": email
                            },
                            {
                                "Attribute": "FirstName",
                                "Value": name
                            },
                            {
                                "Attribute": "company",
                                "Value": company
                            },
                            {
                                "Attribute": "mx_Actions",
                                "Value": casestudyRefs[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : []
                            
                        };
                } else if(activityEvents[activity] == 159 ||
                    activityEvents[activity] == 161 ) {
                        addlead_data = [
                            {
                                "Attribute": "EmailAddress",
                                "Value": email
                            },
                            {
                                "Attribute": "FirstName",
                                "Value": name
                            },
                            {
                                "Attribute": "company",
                                "Value": company
                            },
                            {
                                "Attribute": "mx_White_Paper",
                                "Value": whitepaperRef[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : [],
                            "White Paper": whitepaperRef[activityEvents[activity]]
                            
                        };
                } else if(activityEvents[activity] == 157 ||
                    activityEvents[activity] == 158 ||
                    activityEvents[activity] == 160 ) {
                        addlead_data = [
                            {
                                "Attribute": "EmailAddress",
                                "Value": email
                            },
                            {
                                "Attribute": "FirstName",
                                "Value": name
                            },
                            {
                                "Attribute": "company",
                                "Value": company
                            },
                            {
                                "Attribute": "mx_Registration",
                                "Value": registrationref[activityEvents[activity]]
                            }
                        ];
                        addaction_data = {
                            "RelatedProspectId": ""+relatedProspectId,
                            "ActivityEvent": activityEvents[activity],
                            "Fields" : [],
                            "Registration": registrationref[activityEvents[activity]]
                        };
                } else {
                    addlead_data = [
                        {
                            "Attribute": "EmailAddress",
                            "Value": email
                        },
                        {
                            "Attribute": "FirstName",
                            "Value": name
                        },
                        {
                            "Attribute": "company",
                            "Value": company
                        }
                    ];
                    addaction_data = {
                        "RelatedProspectId": ""+relatedProspectId,
                        "ActivityEvent": activityEvents[activity],
                        "Fields" : []
                    };
                }
                $.ajax({
                    url: addaleadUrl,
                    type: "POST",
                    contentType: "application/json",
                    data: JSON.stringify(addlead_data),
                    success: function(response1) {
                        // console.log("response1: " + response1);
                        if(response1.hasOwnProperty('Message') && response1.Message.hasOwnProperty('Id')){
                            relatedProspectId = response1.Message.Id;
                        }
                        if(activityEvents[activity] == 164 ||
                            activityEvents[activity] == 165 ||
                            activityEvents[activity] == 166 || 
                            activityEvents[activity] == 167 || 
                            activityEvents[activity] == 168 || 
                            activityEvents[activity] == 169) {
                                addaction_data = {
                                    "RelatedProspectId": ""+relatedProspectId,
                                    "ActivityEvent": activityEvents[activity],
                                    "Fields" : [
                                        {
                                            "SchemaName": "mx_Custom_1",
                                            "Value": "abcd"
                                        }
                                    ],
                                    "Case Study": casestudyRefs[activityEvents[activity]]
                                    
                                };
                        } else if(activityEvents[activity] == 159 ||
                            activityEvents[activity] == 161 ) {
                                addaction_data = {
                                    "RelatedProspectId": ""+relatedProspectId,
                                    "ActivityEvent": activityEvents[activity],
                                    "Fields" : [],
                                    "White Paper": whitepaperRef[activityEvents[activity]]
                                    
                                };
                        } else if(activityEvents[activity] == 157 ||
                            activityEvents[activity] == 158 ||
                            activityEvents[activity] == 160 ) {
                                addaction_data = {
                                    "RelatedProspectId": ""+relatedProspectId,
                                    "ActivityEvent": activityEvents[activity],
                                    "Fields" : [],
                                    "Registration": registrationref[activityEvents[activity]]
                                };
                        } else {
                            addaction_data = {
                                "RelatedProspectId": ""+relatedProspectId,
                                "ActivityEvent": activityEvents[activity],
                                "Fields" : []
                            };
                        }
                        // console.log("Action Data: " + JSON.stringify(addaction_data));
                        $.ajax({
                            url: addactivityUrl,
                            type: "POST",
                            contentType: "application/json",
                            data: JSON.stringify(addaction_data),
                            dataType: "json",
                            success: function(response1) {
                                // console.log("activity response: " + response);
                            }
                        })
                    }
                })
            }
        }
    });
}


$('#tuid').bind("input propertychange", function(e) {
    $('.placeholder').hide();
})

//function to save dom as image..
$('.download_section').click(function() {

    var share = $(this).attr('id').replace('_download', '_share');
    var download = $(this).attr('id');
    
    var close = $(this).attr('id').replace('_download', '_close');
    var style = {
        backgroundColor: 'white'
    }

    function filter(node) {
        return (node.id !== share && node.id !== download && node.id !== close);
        // return (node.id !== 'personality_section_close')
    }
    if ($(this).attr('id') == 'social_activity_section_download') {
        domtoimage.toJpeg(document.getElementById($(this).attr('id').replace('_download', '')), { filter: filter, style: style })
            .then(function(dataUrl) {
                var link = document.createElement('a');
                link.download = twitterId + '\'s ' + download.replace(/_/g, ' ').replace('section', '').replace('download', '') + '.jpeg';
                link.href = dataUrl;
                link.click();
            });
    } else {
        domtoimage.toJpeg(document.getElementById($(this).attr('id').replace('_download', '')), { filter: filter })
            .then(function(dataUrl) {
                var link = document.createElement('a');
                link.download = twitterId + '\'s ' + download.replace(/_/g, '-').replace('section', '').replace('download', '') + '.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }
})/**/
$(function() {
    $(".meta_info_button").click(function() {
        $(".meta_info_container").slideToggle();
    });

    $(".update_button_analysis").click(function() {
        $(".status_of_update").html("Analysis is queued for update...");
        var _url = $(this).attr("data-url");
        $.ajax({
            url: _url,
            type: "GET",
            success: function(response) {
                //$("")
            }
        })
    })
});

function showInputError(message, type, modal) {
    var _div;
    if(modal == 'skip') {
        _div = '#modal_message_skip';
    } else {
        _div = '#modal_message';
    }

    $(_div).html(message).removeClass('modal_error').removeClass('modal_success').addClass('modal_'+type).slideDown();
    return true;
}



$("#tuid").keyup(function(event) {
    if (event.keyCode == 13) {
        if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() == 1) {
            $('#alert_modal_skip').modal('show');
        } else if (getNumberAnalysis() == 2) {
            $('#alert_modal').modal('show');
        } else if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() == -1) {
            load_ana(event);
        } else if (existingAnalysis($('#tuid').val()) == 'new') {
            load_ana(event);
            setNumberAnalysis();
        } else {
            load_ana(event);
        }
        if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() != 3) {
            load_ana(event);
            setNumberAnalysis();
        }
    }
});





$('#btn-cc, #btn-emp').click(function() {
    $(this).addClass('active');
    $(this).siblings().removeClass('active');
    $('#' + $(this).attr('data-show')).show();
    $('#' + $(this).attr('data-hide')).hide();

    $(".fullwidth-slider-work.itIsSliding").owlCarousel({
        items: 2,
        nav: false,
        margin: 20,
        dots: true
    });

    $(".fullwidth-slider-work-cc.itIsSliding").owlCarousel({
        items: 2,
        nav: false,
        margin: 20,
        dots: true
    });

    $(".fullwidth-slider-edu.itIsSliding").owlCarousel({
        items: 2,
        nav: false,
        margin: 20,
        dots: true
    });

    $(".fullwidth-slider-edu-cc.itIsSliding").owlCarousel({
        items: 2,
        nav: false,
        margin: 20,
        dots: true
    });



    /*$(".bu-slider").owlCarousel({
        items:3,
        nav:false,
        margin:20,
        dots:true
    });*/
})

function imgError(image) {
    image.onerror = "";
    image.src = "https://frrole.ai/images/team/male.gif";
    return true;
}



$('#start-analysis').click(function(event){

    if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() == 1) {
        $('#alert_modal_skip').modal('show');
    } else if (getNumberAnalysis() == 2) {
        $('#alert_modal').modal('show');
    } else if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() == -1) {
        load_ana(event);
    } else if (existingAnalysis($('#tuid').val()) == 'new') {
        load_ana(event);
        setNumberAnalysis();
    } else {
        load_ana(event);
    }
    if (existingAnalysis($('#tuid').val()) == 'new' && getNumberAnalysis() != 3) {
        load_ana(event);
        setNumberAnalysis();
    }
});

$('.sa-button-container button.cancel').click(function() {
        load_ana(event);
        setNumberAnalysis();
    })
    // var eligibles = {};
var eligibleArr = [1, 2, 3, 4, 6, 8, 10, 14, 18, 28];

function watchAnalysis() {
    $('#comp-usage .bu-slider').css('display', 'block !important');
    $('#comp-usage .bu-slider').show();
    window.setInterval(function() {
        var ckNames = [],
            ckStatus = [],
            ckNumber = [];
        ckNames = getAnalysisNames();
        ckStatus = getAnalysisStatus();
        ckNumber = getAnalysisEligible();
        // console.log(ckNames);
        // console.log(ckStatus);
        // console.log(ckNumber);
        var _requestedUserCookie = $.cookie('analysis_list');
        if (_requestedUserCookie) {
            _requestedUserCookie = getUniqueArray(_requestedUserCookie.split(","));
            // console.log("_requestedUserCookie: " + _requestedUserCookie);
            ckNames.forEach(function(el, i) {
                if (ckStatus[el] == 'pending') {
                    var _cookie = $.cookie('analysis_list');
                    _cookie = getUniqueArray(_cookie.split(',')).join(',');
                    var intV = parseInt(ckNumber[el]) + 1;
                    _cookie = _cookie.replace(',' + el + '#' + ckStatus[el] + '#' + ckNumber[el], '');
                    // console.log("_cookie: " + _cookie);
                    var new_cookie = _cookie + ',' + el + '#' + ckStatus[el] + '#' + intV;
                    // console.log("new_cookie: " + new_cookie);
                    $.cookie('analysis_list', '' + new_cookie + '', { expires: 999, path: '/' });
                }

                if (i > (_requestedUserCookie.length - 6)) {
                    var elNum = parseInt(ckNumber[el]);
                    if (ckStatus[el] == 'pending' && eligibleArr.indexOf(elNum) != -1) {

                        $.ajax({
                            url: "//api.frrole.com/user-profile.php?apikey=DeepSense-Web-App-33eh0ocfm6o1sshcc39o5a1971b05a443&userid=" + encodeURIComponent(el),
                            dataType: "json",
                            success: function(data) {
                                createAccount();
                                if (data.hasOwnProperty('metadata') && data.metadata != null && data.metadata.hasOwnProperty('status_code') && 
                                data.metadata.status_code >40) {
                                    $('#error').slideUp();
                                    var _cookie = $.cookie('analysis_list');
                                    // console.log('' + el + '#pending#', '' + el + '#resolved#')
                                    _cookie = _cookie.replace('' + el + '#pending#', '' + el + '#failed#')
                                    $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                                    // console.log($.cookie('analysis_list'));
                                    loadUsersFromCookie();
                                    if(localStorage.getItem('current_userid') != el) {
                                        iziToast.show({
                                            theme: 'dark',
                                            progressBar: false,
                                            icon: 'icon-person',
                                            title: '',
                                            message: 'No data found for <span style="color:white">' + el + '</span>.',
                                            position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                                            progressBarColor: 'rgb(0, 255, 184)',
                                            timeout: 0,
    
                                        });
                                    }
                                }
                                else if (data.hasOwnProperty('metadata') && data.metadata != null && data.metadata.hasOwnProperty('status_code') && data.metadata.status_code <= 40) {
                                    var _cookie = $.cookie('analysis_list');
                                    // console.log('' + el + '_pending_', '' + el + '_resolved_')
                                    _cookie = _cookie.replace('' + el + '#pending#', '' + el + '#resolved#')
                                    $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                                    // console.log($.cookie('analysis_list'));
                                    loadUsersFromCookie();
                                    if(localStorage.getItem('current_userid') != el) {
                                        iziToast.show({
                                            theme: 'dark',
                                            progressBar: false,
                                            // close: false,
                                            icon: 'icon-person',
                                            title: '',
                                            message: 'Analysis of <span style="color:white">' + el + '</span> is ready!',
                                            position: 'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter
                                            progressBarColor: 'rgb(0, 255, 184)',
                                            timeout: 0,
                                            buttons: [
                                                ['<button>Load</button>', function(instance, toast) {
                                                    $('#tuid').val(el);
                                                    iziToast.hide({
                                                        transitionOut: 'fadeOutUp'
                                                    }, toast);
                                                    load_ana(event);
                                                }]
                                            ],
                                        });
                                    }
                                }
                            }
                        })
                    } else if (ckStatus[el] == 'pending' && parseInt(elNum) > 28) {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(el + '#' + ckStatus[el] + '#' + ckNumber[el], el + '#failed#' + ckNumber[el]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                        loadUsersFromCookie();
                    }
                }

            });

        }
    }, 30000);

}

function existingAnalysis(id) {
    var ckNames = [],
        ckStatus = [],
        ckNumber = [];
    ckNames = getAnalysisNames();
    ckStatus = getAnalysisStatus();
    ckNumber = getAnalysisEligible();
    var _requestedUserCookie = $.cookie('analysis_list');
    if (ckNames.indexOf(id) != -1 && ckStatus[id] != 'example') {
        return 'existing';
    } else if (ckNames.indexOf(id) == -1 && ckStatus[id] != 'example') {
        return 'new';
    } else {
        return 'example';
    }
}

function getNumberAnalysis() {
    // return parseInt($.cookie('analysis_number'));
    return localStorage.getItem('analysis_number');
    // console.log(typeof(parseInt($.cookie('analysis_number'))));
}

function setNumberAnalysis() {
    // if (parseInt(parseInt($.cookie('analysis_number'))) != -1) {
    //     var num = parseInt($.cookie('analysis_number'));
    //     num = num + 1;
    //     $.cookie('analysis_number', num, { expires: 999, path: '/' });
    // }
    if (localStorage.getItem('analysis_number') != -1) {
        if (localStorage.getItem('analysis_number') == null) {
            localStorage.setItem('analysis_number', 1);
        }
        if (parseInt($.cookie('analysis_number')) == NaN || parseInt($.cookie('analysis_number')) == -1) {
            localStorage.setItem('analysis_number', -1);
        } else {
            var num = parseInt(localStorage.getItem('analysis_number'));
            num = num + 1;
            localStorage.setItem('analysis_number', num);
        }
    }

}

function getAnalysisNames() {
    var ck = $.cookie('analysis_list');
    var an = [];
    var valid = [];
    getUniqueArray(ck.split(',')).forEach(function(el, i) {
        if(valid.indexOf(el.split('#')[0]) == -1) {
            an.push(el.split('#')[0]);
            valid.push(el.split('#')[0]);
        }
    })
    return an;
}

function getUniqueArray(names) {
    
    var uniqueNames = [];
    $.each(names, function(i, el){
        if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });

    return uniqueNames;
}

function getAnalysisStatus() {
    var ck = $.cookie('analysis_list');
    var an = {};
    getUniqueArray(ck.split(',')).forEach(function(el, i) {
        an[el.split('#')[0]] = el.split('#')[1];
    })
    return an;
}

function getAnalysisEligible() {
    var ck = $.cookie('analysis_list');
    var an = {};
    getUniqueArray(ck.split(',')).forEach(function(el, i) {
        an[el.split('#')[0]] = parseInt(el.split('#')[2]);
    })
    return an;
}

function showSuccesModal(message, type) {
    $('#content_form'+type).slideUp();
    $('#loader_message'+type).html(message);
    setTimeout(function(){
        $('#loader_gif'+type).slideDown();
    },500);
}
var alert_form_skip_times_clicked = 0;
$('#alert_form_skip').submit(function(e) {
    e.preventDefault();
    var inputValue = $('#modal_input_skip').val();

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(alert_form_skip_times_clicked == 0) {
        if (!re.test(inputValue)) {
            showInputError("Please provide valid email!","error","skip");
        } else if (inputValue === "") {
            showInputError("You need to write something!","error","skip");
        } else {
            alert_form_skip_times_clicked++;
            $('#modal_submit_skip').attr('disabled','disabled');
            $('#modal_skip').attr('disabled','disabled');
            localStorage.setItem('analysis_number', -1);
            localStorage.setItem('webapp-email', inputValue);
            showInputError("Please wait...","loader","skip");
            $.ajax({
                url: 'https://api.frrole.com/views/apiv2/webapp_passcode_generate.php?emailid='+inputValue+'&appname=Web-App',
                type: "GET",
                success: function(results) {
                    if(results.hasOwnProperty('status') && results.status 
                    && results.hasOwnProperty('apikey') && results.apikey != '') {
                        localStorage.setItem('webapp-apikey',results.apikey);
                        if(results.hasOwnProperty('code') && results.code == 2) {
                            showMessage = "Awesome, you are already registered.";
                            showSuccesModal(showMessage, "_skip");
                        } else if(results.hasOwnProperty('code') && results.code == 1) {
                            showMessage = "Congratulations! You are all set. Your passcode is generated and mailed to you at "+inputValue;
                            showSuccesModal(showMessage, "_skip");
                        }
                    } else {
                        showInputError("Something went wrong.", "error","skip"); 
                    }
                    
                    $.ajax({
                        url: '//frrole.ai/php/deepsenselead.php?email=' + localStorage.getItem('webapp-email'),
                        type: "GET",
                        success: function(response) {
                            localStorage.setItem('webapp-email',localStorage.getItem('webapp-email'));
                        }
                    })
                    // swal("Nice!", showMessage, "success");
                    update_ls("", localStorage.getItem('webapp-email'), "", "deepsense_registration");
                    $('#start-analysis').click();
                    setTimeout(function() {
                        $('#alert_modal_skip').modal('hide');
                    }, 3000);
                }
            });
        }
    }
    
    
})
var alert_form_times_clicked = 0;
$('#alert_form').submit(function(e) {
    e.preventDefault();
    var inputValue = $('#modal_input').val();
    
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(alert_form_times_clicked == 0){
        if (!re.test(inputValue)) {
            showInputError("Please provide valid email!","error","normal");
        } else if (inputValue === "") {
            showInputError("You need to write something!","error","normal");
        } else {
            $('#modal_submit').attr('disabled','disabled');
            alert_form_times_clicked++;
            localStorage.setItem('analysis_number', -1);
            localStorage.setItem('webapp-email', inputValue);
            // console.log("hi");
            
            showInputError("Please wait...","loader","normal");
            $.ajax({
                url: 'https://api.frrole.com/views/apiv2/webapp_passcode_generate.php?emailid='+inputValue+'&appname=Web-App',
                type: "GET",
                
                success: function(results) {
                    if(results.hasOwnProperty('status') && results.status 
                    && results.hasOwnProperty('apikey') && results.apikey != '') {
                        localStorage.setItem('webapp-apikey',results.apikey);
                        if(results.hasOwnProperty('code') && results.code == 2) {
                            showMessage = "Awesome, you are already registered.";
                            showSuccesModal(showMessage, "");
                        } else if(results.hasOwnProperty('code') && results.code == 1) {
                            showMessage = "Congratulations! You are all set. Your passcode is generated and mailed to you at "+inputValue;
                            showSuccesModal(showMessage, "");
                        }
                    } else {
                        showInputError("Something went wrong.", "error","normal"); 
                    }
                    
                    $.ajax({
                        url: '//frrole.ai/php/deepsenselead.php?email=' + localStorage.getItem('webapp-email'),
                        type: "GET",
                        success: function(response) {
                            localStorage.setItem('webapp-email',localStorage.getItem('webapp-email'));
                        }
                    })
                    // swal("Nice!", showMessage, "success");
                    update_ls("", localStorage.getItem('webapp-email'), "", "deepsense_registration");
                    $('#start-analysis').click();
                    setTimeout(function() {
                        $('#alert_modal').modal('hide');
                    }, 3000);
                }
            });
        }
    }
    
    
})

function load_ana(event) {
    
    changeLoaderMsg('success');
    if(localStorage.getItem('analysis_number') == -1 && (localStorage.getItem('webapp-email') == null || localStorage.getItem('webapp-email') == undefined)) {
        localStorage.setItem('analysis_number',2);
    }

    $('#error').hide();
    // $('#request-a-demo').hide();
    $('#footer').hide();
    $('#example_analysis').hide();
    $(".status_of_update").empty();
    $('#affinity-table').html('');
    $('#bp-table').html('');
    $('#p-descr').html()
    $('#personality_description').html('');
    $('#klout-measure').html('Low');
    $('#klout-flag img').attr('src', '');
    $(".social_profiles_container").empty();
    $(".social_profiles_container1").empty();
    // $('.item-carousel1.owl-carousel').empty();
    $('.bu-slider.owl-carousel').empty();
    $('#cc-location').html('NA');
    $('#emp-location').html('NA');
    $('#cc-social-influence').html('NA');
    $('#emp-social-influence').html('NA');
    $('#cc-bio').html('NA');
    $('#emp-bio').html('NA');
    $('#cc-img').attr('src', '');
    $('#cc-comm-approach').html('<p class="error-msg-p">No data available</p>');
    $('#cc-example').html('<p class="error-msg-p">No data available</p>');
    $('#cc-lang').html('NA');
    $('#cc-social-influence').html('NA');
    $('#cc-ints-holder').hide();
    $('#cc-ints-data').html('<p class="error-msg-p">No data available</p>');
    $('#cc-personality').html('<p class="error-msg-p">No data available</p>');
    $('#emp-personality').html('<p class="error-msg-p">No data available</p>');
    $('#cc-user-bio').html('<p class="error-msg-p">No data available</p>');
    $('#cc-ints').html('');


    $('#professionslism span').html('NA');
    // $('#emp-img').attr('src', '');
    $('#needforautonomy span').html('NA');
    $('#attandout span').html('NA');
    $('#action_orientedness span').html('NA');
    $('#stability_potential span').html('NA');
    $('#teamplayer span').html('NA');
    $('#emp-tech').html('NA');
    $('#emp-lead').html('NA');
    $('#emp-manag').html('NA');
    $('#employee-bg').html('<p class="error-msg-p">No data available</p>');
    // $(".bu-slider").html('<p class="error-msg-p">No data available</p>');
    $('#professionslism span').html('NA');
    // $('#emp-img').attr('src', '');
    $('#needforautonomy span').html('NA');
    $('#attandout span').html('NA');
    $('#action_orientedness span').html('NA');
    $('#stability_potential span').html('NA');
    $('#teamplayer span').html('NA');
    $('#emp-tech').html('NA');
    $('#emp-lead').html('NA');
    $('#emp-manag').html('NA');
    $('#employee-bg').html('<p class="error-msg-p">No data available</p>');
    $('#professionslism span').removeClass('item-medium').removeClass('item-low').removeClass('item-high');
    // event.preventDefault();
    $(".social_profiles_container").empty();
    $(".social_profiles_container1").empty();
    // $('.item-carousel1.owl-carousel').empty();
    $('.bu-slider.owl-carousel').empty();
    // $('#cc-img').attr('src', '');
    $('#cc-comm-approach').html('<p class="error-msg-p">No data available</p>');
    $('#cc-example').html('<p class="error-msg-p">No data available</p>');
    $('#cc-lang').html('NA');
    $('#cc-social-influence').html('NA');
    $('#cc-ints-holder').hide();
    $('#cc-ints-data').html('<p class="error-msg-p">No data available</p>');
    $('#cc-user-bio').html('<p class="error-msg-p">No data available</p>');
    $('#cc-ints').html('');
    // $(".bu-slider").html('<div class="row"><div style="margin-left:40px" class="owl-item features-item"><p class="error-msg-p">No data available</p>');
    $('#professionslism span').html('NA');
    $('#emp-img').attr('src', '');
    $('#needforautonomy span').html('NA');
    $('#attandout span').html('NA');
    $('#action_orientedness span').html('NA');
    $('#stability_potential span').html('NA');
    $('#teamplayer span').html('NA');
    $('#emp-tech').html('NA');
    $('#emp-lead').html('NA');
    $('#emp-manag').html('NA');
    $('#employee-bg').html('<p class="error-msg-p">No data available</p>');
    // $(".bu-slider").html('<p class="error-msg-p">No data available</p>');
    $('#professionslism span').html('NA');

    $('#needforautonomy span').html('NA');
    $('#attandout span').html('NA');
    $('#action_orientedness span').html('NA');
    $('#stability_potential span').html('NA');
    $('#teamplayer span').html('NA');
    $('#emp-tech').html('NA');
    $('#emp-lead').html('NA');
    $('#emp-manag').html('NA');
    $('#employee-bg').html('<p class="error-msg-p">No data available</p>');
    $('#professionslism span').html('NA');

    $('#needforautonomy span').html('NA');
    $('#attandout span').html('NA');
    $('#action_orientedness span').html('NA');
    $('#stability_potential span').html('NA');
    $('#teamplayer span').html('NA');
    $('#emp-tech').html('NA');
    $('#emp-lead').html('NA');
    $('#emp-manag').html('NA');
    $('#employee-bg').html('<p class="error-msg-p">No data available</p>');
    var tuid = $('#tuid').val();
    twitterId = tuid;
    window.history.pushState("object or string", "Title", "thebactrak-app/" + tuid);
    if (existingAnalysis(tuid) == 'new' && getNumberAnalysis() == 2 && getNumberAnalysis() == 5) {

    }
    if (tuid == '') {
        $("#loader_c_p").fadeOut(200, "easeInOutExpo");
        $('#error').html('Please provide valid input').slideDown().delay(5500).slideUp();
    } else {
        // changeLoaderMsg('success');
        $("#loader_c_p").fadeIn(200, "easeInOutExpo");
        var _requestedUserCookie = $.cookie('analysis_list');

        var ckNames = [],
            ckStatus = [];
        ckNames = getAnalysisNames();
        ckStatus = getAnalysisStatus();
        // console.log(ckNames);
        // alert(ckNames.indexOf(tuid));
        // alert(ckStatus[tuid]);
        if (ckNames.indexOf(tuid) == -1 && ckStatus[tuid] != 'example') {
            $.cookie('analysis_list', _requestedUserCookie + "," + tuid + '#pending#1', { expires: 999, path: '/' });
            // console.log($.cookie('analysis_list'));
            // $.cookie('' + tuid + '', 'pending', { expires: 999 });//new
            loadUsersFromCookie();
        } else if (ckNames.indexOf(tuid) > -1) {
            var reqcookie = $.cookie('analysis_list');
            var cookieArr = reqcookie.split(',');
            var ind = ckNames.indexOf(tuid);
            // console.log('ind:' + ind);
            if (ckNames.length - (ind + 1) >= 5) {
                cookieArr.push(tuid + '#pending#1');
                var newCookie = cookieArr.slice(cookieArr.length - 5, cookieArr.length).join(',');
                // console.log(newCookie);
                $.cookie('analysis_list', newCookie, { expires: 999, path: '/' });
                // $.cookie('' + tuid + '', 'pending', { expires: 999 });//new
                loadUsersFromCookie();
            }
        }



        loadUsersFromCookie();

        $('#example_analysis').hide();
        localStorage.setItem('current_userid', tuid);
        var url = "//api.frrole.com/user-profile.php?apikey="+getCurrentApikey()+"&persona=employee,customercare&userid=" + encodeURIComponent(tuid);
        $(".update_button_analysis").attr("data-url", url+"&nocache=true");
        var globuserid = '';
        $.ajax({
            url: url,
            dataType: "json",
            timeout: 180000,
            success: function(data) {
                createAccount();
                var ckNames = [],
                    ckStatus = [],
                    ckNumber = [];
                ckNames = getAnalysisNames();
                ckStatus = getAnalysisStatus();
                ckNumber = getAnalysisEligible();
                if (data.hasOwnProperty('usage_stats') && data.usage_stats.hasOwnProperty('user_profile')
                && data.usage_stats.user_profile.hasOwnProperty('remaining') && data.usage_stats.user_profile.remaining == 0) {
                    _countOfTrials = 0;
                    var _herror = "This passcode has been disabled. Please email us at <a href='javascript:;'>help</a> to get it re-enabled.";
                    $('#result-area').hide();
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $('#error').html(_herror).slideDown();
                    if (ckStatus[tuid] != 'example') {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(tuid + '#' + ckStatus[tuid] + '#' + ckNumber[tuid], tuid + '#failed#' + ckNumber[tuid]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                    }
                    
                    
                } else if (data.hasOwnProperty('status') && data.status == "error" && data.hasOwnProperty('message') && 
                data.message == 'Create failed') {
                    _countOfTrials = 0;
                    // changeLoaderMsg('create');
                    
                    $('#result-area').hide();
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $('#error').html(returnErrorMessage(tuid)).slideDown();
                    if (ckStatus[tuid] != 'example') {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(tuid + '#' + ckStatus[tuid] + '#' + ckNumber[tuid], tuid + '#pending#' + ckNumber[tuid]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                    }
                    
                    
                }
                else if (data.hasOwnProperty('metadata') && data.metadata != null && data.metadata.hasOwnProperty('status_code') && 
                data.metadata.status_code > 40) {
                    // console.log("Fetch failed");
                    _countOfTrials = 0;
                    // changeLoaderMsg('create');
                    $('#result-area').hide();
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $('#error').html(returnErrorMessage(tuid)).slideDown();
                    if (ckStatus[tuid] != 'example') {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(tuid + '#' + ckStatus[tuid] + '#' + ckNumber[tuid], tuid + '#failed#' + ckNumber[tuid]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                    }
                    
                } else if(data.hasOwnProperty('metadata') && data.metadata != null && data.metadata.hasOwnProperty('status_code') && 
                data.metadata.status_code <= 40){
                    var datag = data.results;
                    var dataR = data;
                    // console.log("DataR: "+ dataR.results.hasOwnProperty('work_history'));
                    if (dataR.hasOwnProperty('error') || !dataR.hasOwnProperty('results') 
                    || !dataR.results.hasOwnProperty('persona') || !dataR.results.persona.hasOwnProperty('employee') ) {
                            $('#emp-error-msg').show();
                            // console.log("employee data: "+data);
                            $('#hide_on_error_emp').hide();
                            $('#hiring_persona_section_download').hide();
                            $('#hiring_persona_section_share').hide();
                            $('#customer_care_section_share').hide();
                    } else {
                            var lsEmail = localStorage.getItem('webapp-email');
                            if(lsEmail != null && lsEmail != ''){
                                $.ajax({
                                    url: "https://api.frrole.com/views/apiv2/userProfileMailer.php?userid="+tuid+"&source=web_app&preferedPersona=none&email="+lsEmail,
                                    type: "GET",
                                    success: function(response){
                                        // console.log(response);
                                        // console.log("Mailer service called");
                                    }
                                });
                            }
                            $('#emp-error-msg').hide();
                            $('#hide_on_error_emp').show();
                            $('#hiring_persona_section_download').show();
                            $('#hiring_persona_section_share').show();
                            $('#customer_care_section_share').show();

                            var data = datag;
                            var bars_html = hiringPersona(data);
                            var cc_bars_html = cc_Persona(data);
                            // console.log(data);
                            $('#hiring_behaviour').html(bars_html);
                            $('#cc_behaviour').html(cc_bars_html);
                            $('#hiring_rolefit').html(returnRolefit(data));
                            var image = 'https://frrole.ai/images/team/male.gif';
                            if(data.hasOwnProperty('user_profile_image') && data.user_profile_image != null) {
                                image = data.user_profile_image.replace('_normal', '');
                            }

                            // var image = data.user_profile_image.replace('_normal', '');
                            
                            // $('img#emp-img').attr('src', image);
                            if(data.hasOwnProperty('use_name') && data.user_name !== null && data.user_name != '') {
                                $('#hiring_persona_div span#emp-username').html('@' + data.user_name);
                                $('span#cc-username').html('@' + data.user_name);
                            } else {
                                $('#hiring_persona_div span#emp-username').html('NA');
                                $('span#cc-username').html('NA');
                            }
                            
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('general_behavior') && data.persona.employee.general_behavior.hasOwnProperty('score')) {
                                $('#professionslism span').html(data.persona.employee.general_behavior.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.general_behavior.score).toFixed(1) + ')</span></p>');
                                $('#professionslism').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.general_behavior.level));

                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('need_for_autonomy') && data.persona.employee.need_for_autonomy.hasOwnProperty('score')) {
                                $('#needforautonomy span').html(data.persona.employee.need_for_autonomy.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.need_for_autonomy.score).toFixed(1) + ')</span></p>');
                                $('#needforautonomy').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.need_for_autonomy.level));
                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('teamwork_skills') && data.persona.employee.teamwork_skills.hasOwnProperty('level')) {
                                $('#teamplayer span').html(data.persona.employee.teamwork_skills.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.teamwork_skills.score).toFixed(1) + ')</span></p>');
                                $('#teamplayer').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.teamwork_skills.level));
                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('attitude_and_outlook') && data.persona.employee.attitude_and_outlook.hasOwnProperty('level')) {
                                $('#attandout span').html(data.persona.employee.attitude_and_outlook.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.attitude_and_outlook.score).toFixed(1) + ')</span></p>');
                                $('#attandout').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.attitude_and_outlook.level));
                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('stability_potential') && data.persona.employee.stability_potential.hasOwnProperty('level')) {
                                $('#stability_potential span').html(data.persona.employee.stability_potential.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.stability_potential.score).toFixed(1) + ')</span></p>');
                                $('#stability_potential').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.stability_potential.level));
                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('action_orientedness') && data.persona.employee.action_orientedness.hasOwnProperty('level')) {
                                $('#action_orientedness span').html(data.persona.employee.action_orientedness.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.action_orientedness.score).toFixed(1) + ')</span></p>');
                                $('#action_orientedness').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.action_orientedness.level));
                            }
                            if (data.hasOwnProperty('persona') && data.persona.hasOwnProperty('employee') && data.persona.employee.hasOwnProperty('role_fit')) {
                                if (data.persona.employee.role_fit.hasOwnProperty('technical') && data.persona.employee.role_fit.technical.hasOwnProperty('level')) {
                                    $('#emp-tech').html(data.persona.employee.role_fit.technical.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.role_fit.technical.score).toFixed(1) + ')</span></p>');
                                    $('#emp-tech').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.role_fit.technical.level));
                                }
                                if (data.persona.employee.role_fit.hasOwnProperty('leadership') && data.persona.employee.role_fit.leadership.hasOwnProperty('level')) {
                                    $('#emp-lead').html(data.persona.employee.role_fit.leadership.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.role_fit.leadership.score).toFixed(1) + ')</span></p>');
                                    $('#emp-lead').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.role_fit.leadership.level));
                                }
                                if (data.persona.employee.role_fit.hasOwnProperty('managerial') && data.persona.employee.role_fit.managerial.hasOwnProperty('level')) {
                                    $('#emp-manag').html(data.persona.employee.role_fit.managerial.level + '<p><span style="color:rgba(0, 0, 0, 0.45)"> (Score: ' + parseInt(data.persona.employee.role_fit.managerial.score).toFixed(1) + ')</span></p>');
                                    $('#emp-manag').removeClass('item-low').removeClass('item-medium').removeClass('item-high').addClass(returnLevel(data.persona.employee.role_fit.managerial.level));
                                }
                            }


                            // $('#employee-bg').html(backcheckhtml);
                            if (data.hasOwnProperty('work_history') && !_.isEmpty(data.work_history)) {
                                var sliderHtml = '';

                                data.work_history.forEach(function(el, i) {
                                    var title = '';
                                    var prd = '';
                                    var name = '';
                                    if (el.hasOwnProperty('organization') && el.organization != '') {
                                        name = el.organization;
                                    }
                                    if (el.hasOwnProperty('title') && el.title != null && el.title != undefined) {
                                        title = el.title;
                                    }

                                    if (el.hasOwnProperty('start_date') && el.hasOwnProperty('current') && el.current) {
                                        prd = '<p>' + el.start_date + ' - Current</p>';
                                    } else if (el.hasOwnProperty('start_date') && el.hasOwnProperty('end_date') && el.end_date == null) {
                                        prd = '<p>' + el.start_date + ' - </p>';
                                    } else if (el.hasOwnProperty('start_date') && (el.start_date == null || el.start_date == '' || el.start_date == undefined) && el.hasOwnProperty('end_date') && el.end_date != null) {
                                        prd = '<p> - ' + el.end_date + '</p>';
                                    } else if (!el.hasOwnProperty('start_date') && el.hasOwnProperty('current') && el.current) {
                                        prd = '<p>Current</p>';
                                    }
                                    sliderHtml = sliderHtml + '<div style="text-align:center; background:#f7f7f7; padding:10px; margin:10px;" class="item">';
                                    sliderHtml = sliderHtml + '<p class="p-right"><strong>' + name + '</strong></p><p class="p-right">' + title + '</p>' + prd;
                                    sliderHtml = sliderHtml + '</div>';
                                });
                                $('#error_msg_workhistory').hide();
                                $('#error_msg_workhistory_cc').hide();
                                $('#error_msg_education').hide();
                                $('#error_msg_education_cc').hide();
                                // console.log(sliderHtml);
                                $(".fullwidth-slider-work").removeClass("itIsSliding").owlCarousel("destroy");
                                $('.fullwidth-slider-work').show();
                                $('.fullwidth-slider-work').html(sliderHtml);

                                $(".fullwidth-slider-work").addClass("itIsSliding").owlCarousel({
                                    items: 2,
                                    nav: false,
                                    margin: 20,
                                    dots: true
                                });
                                $(".fullwidth-slider-work-cc").removeClass("itIsSliding").owlCarousel("destroy");
                                $('.fullwidth-slider-work-cc').show();
                                $('.fullwidth-slider-work-cc').html(sliderHtml);

                                $(".fullwidth-slider-work-cc").addClass("itIsSliding").owlCarousel({
                                    items: 2,
                                    nav: false,
                                    margin: 20,
                                    dots: true
                                });
                                $(".fullwidth-slider-edu").removeClass("itIsSliding").owlCarousel("destroy");
                                $('.fullwidth-slider-edu').show();
                                $('.fullwidth-slider-edu').html(educationHtml(data));

                                $(".fullwidth-slider-edu").addClass("itIsSliding").owlCarousel({
                                    items: 2,
                                    nav: false,
                                    margin: 20,
                                    dots: true
                                });
                                $(".fullwidth-slider-edu-cc").removeClass("itIsSliding").owlCarousel("destroy");
                                $('.fullwidth-slider-edu-cc').show();
                                $('.fullwidth-slider-edu-cc').html(educationHtml(data));

                                $(".fullwidth-slider-edu-cc").addClass("itIsSliding").owlCarousel({
                                    items: 2,
                                    nav: false,
                                    margin: 20,
                                    dots: true
                                });

                            } else {
                                $('.fullwidth-slider-edu-cc').hide();
                                $('.fullwidth-slider-edu').hide();
                                $('.fullwidth-slider-work').hide();
                                $('.fullwidth-slider-work-cc').hide();
                                $('#error_msg_education').show();
                                $('#error_msg_education').show();
                                $('#error_msg_education_cc').show();
                            }

                        }
                        $('#btn-emp').click();
                        $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                        $('#error').slideUp();
                            
                    // console.log(JSON.stringify(dataR));
                    if (dataR.hasOwnProperty('error') || !dataR.hasOwnProperty('results') || !dataR.results.hasOwnProperty('persona') || !dataR.results.persona.hasOwnProperty('customercare')) {
                        $('#cc-error-msg').show();
                        $('#hide_on_error_cc').hide();
                        $('#customer_care_persona_section_download').hide();
                        $('#customer_care_section_share').hide();
                    } else {
                        
                        $('#cc-error-msg').hide();
                        $('#hide_on_error_cc').show();
                        $('#customer_care_persona_section_download').show();
                        $('#customer_care_section_share').show();
                        var _r = data;
                        var data = datag;
                        var persona = {};
                        if(data.hasOwnProperty('persona') && data.persona.hasOwnProperty('customercare')){
                            persona = data.persona.customercare;
                        }
                        // var airtel = data.brand_usage.airtel;
                        // var vodafone = data.brand_usage.vodafone;
                        // var languages = data.languages[0].language;
                        var image = data.user_profile_image.replace('_normal', '');
                        // var per_desc = data.personality_analysis.personality_description;
                        // var usr_bio = data.user_description;
                        // var interests = data.interests;
                        // console.log(image);

                        // $('img#cc-img').attr('src', image);

                        $('#cc-username').html('@' + (globuserid === null ? 'NA' : globuserid));
                        // $('#hiring_persona_div span#emp-username').html('@' + globuserid);
                        var htLo = '<strong>';
                        var locationArray = [];
                        if (data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('location') && !_.isEmpty(data.demographics.location)) {
                            if (data.demographics.location.hasOwnProperty('city') && data.demographics.location.city != '' && data.demographics.location.city != null && data.demographics.location.city != undefined) {
                                locationArray.push(data.demographics.location.city.replace(/_/g, ' '));
                            }
                            // if (data.demographics.location.hasOwnProperty('state') && data.demographics.location.state != '' && data.demographics.location.state != null && data.demographics.location.state != undefined) {
                            //     locationArray.push(data.demographics.location.state.replace(/_/g, ' '));
                            // }
                            if (data.demographics.location.hasOwnProperty('country') && data.demographics.location.country != '' && data.demographics.location.country != null && data.demographics.location.country != undefined) {
                                locationArray.push(data.demographics.location.country.replace(/_/g, ' '));
                            }
                            // $('#cc-location').html('<strong>' + locationArray.join(', ') + '</strong').addClass('.capitalize-txt');
                            // $('#emp-location').html('<strong>' + locationArray.join(', ') + '</strong').addClass('.capitalize-txt');
                        }


                        if (persona.hasOwnProperty('influence') && persona.influence != '') {
                            if (persona.influence.split(' ').length < 3) {
                                $('#cc-social-influence').html(persona.influence.split(' ')[0] + ' Social ' + persona.influence.split(' ')[1]);
                                $('#emp-social-influence').html(persona.influence.split(' ')[0] + ' Social ' + persona.influence.split(' ')[1]);
                            } else {
                                $('#cc-social-influence').html(persona.influence.split(' ')[0] + ' ' + persona.influence.split(' ')[1] + ' Social ' + persona.influence.split(' ')[2]);
                                $('#emp-social-influence').html(persona.influence.split(' ')[0] + ' ' + persona.influence.split(' ')[1] + ' Social ' + persona.influence.split(' ')[2]);
                            }

                        } else {
                            $('#cc-social-influence').html('NA');
                            $('#emp-social-influence').html('NA');
                        }



                        var htBio = '';
                        if (data.demographics.hasOwnProperty('gender') && data.demographics.gender != '' && data.demographics.gender != null && data.demographics.gender != undefined) {
                            htBio = htBio + data.demographics.gender;
                        }
                        if (data.demographics.hasOwnProperty('employment_status') && data.demographics.employment_status.length != 0 && data.demographics.employment_status[0] != null && data.demographics.employment_status[0] != undefined) {
                            htBio = htBio + ', ' + data.demographics.employment_status[0];
                        }
                        if (!data.demographics.hasOwnProperty('profession') && data.demographics.profession.length == 0 && data.demographics.profession[0] != undefined && data.demographics.profession[0] != null) {
                            htBio = htBio + ', ' + data.demographics.profession[0];
                        }
                        if (!data.demographics.hasOwnProperty('gender') && data.demographics.gender == '' && !data.demographics.hasOwnProperty('employment_status') && data.demographics.employment_status.length == 0 && !data.demographics.hasOwnProperty('employment_status') && data.demographics.profession.length == 0) {
                            htBio = htBio + 'NA';
                        }

                        $('#cc-bio').html(htBio);
                        $('#emp-bio').html(htBio);
                        // $('#cc-location').html(htLo);
                        // $('#emp-location').html(htLo);
                        if (persona.hasOwnProperty('communication') && persona.communication.hasOwnProperty('style') && persona.communication.style != '') {
                            $('#cc-comm-approach').html('Try to be ' + persona.communication.style);
                        } else {
                            $('#cc-comm-approach').html('NA');
                        }
                        if (persona.hasOwnProperty('communication') && persona.communication.hasOwnProperty('example') && persona.communication.example != '') {
                            $('#cc-example').html('For Example, ' + persona.communication.example);
                        } else {
                            $('#cc-example').html('NA');
                        }

                        if (data.hasOwnProperty('languages') && !_.isEmpty(data.languages) && !_.isEmpty(data.languages[0])) {
                            var lg = '';
                            var lgArr = [];
                            lgArr = data.languages.sort(function(a, b) {
                                return b.percent - a.percent;
                            })
                            for (var i = 0; i < lgArr.length; i++) {
                                if (lgArr[i].language != 'Undetermined') {
                                    lg = lgArr[i].language;
                                    break;
                                }
                            }
                            $('#cc-lang').html(data.languages[0].language);
                            $('#emp-lang').html(data.languages[0].language);
                        } else {
                            $('#cc-lang').html('NA');
                        }

                        if(data.hasOwnProperty('social_activity') && !_.isEmpty(data.social_activity)
                        && data.social_activity.hasOwnProperty('user_authority') && data.social_activity.user_authority != null) {
                            var _soc = '';
                            if(precisionRound(data.social_activity.user_authority, 1) <=3 ) {
                                _soc = "Low";
                            } else if(precisionRound(data.social_activity.user_authority, 1) >3 && precisionRound(data.social_activity.user_authority, 1) <=7) {
                                _soc = "Medium";
                            } else if(precisionRound(data.social_activity.user_authority, 1) >7 ) {
                                _soc = "High";
                            }
                            $('#cc-social-influence').html(_soc);
                        } else {
                            $('#cc-social-influence').html('NA');
                        }

                        if (data.hasOwnProperty('personality_analysis') && data.personality_analysis.hasOwnProperty('personality_description') && data.personality_analysis.personality_description != '' && data.personality_analysis.personality_description != null) {
                            $('#cc-personality').html(data.personality_analysis.personality_description);
                            $('#emp-personality').html(data.personality_analysis.personality_description);
                        } else {
                            $('#cc-personality').html('<p class="error-msg-p p-left">No data available</p>');
                            $('#emp-personality').html('<p class="error-msg-p p-left">No data available</p>');
                        }

                        // if (data.hasOwnProperty('user_description') && data.user_description != '') {
                        //     $('#cc-user-bio').html(data.user_description);
                        // } else {
                        //     $('#cc-user-bio').hide();
                        //     $('#cc-usr-b').hide();
                        // }



                        var _html = '';
                        if (_r.hasOwnProperty("interests") && _r.interests.length != 0 && !_.isEmpty(_r.interests)) {

                            $('#cc-ints-data').html(buildInterest(_r));
                            // _html += '<div class="interest_block mt-10"><div class="text-right"><select class="form-control input-sm" id="interest_selector">';

                            // _r.interests.forEach(function(el, i) {
                            //     _html += '<option  value="' + i + '">' + el.interest.replace(/-/g, " ") + '</option>';
                            // });

                            // _html += '</select></div>';

                            // // _html += '<div id="interest_selector_data">' + returnInterest(_r, 0) + '</div>';

                            // _html += '</div>';
                            // $('#cc-ints').html(_html);
                            $('#cc-ints-holder').show();
                        } else {
                            // $('#cc-ints').html('<p class="error-msg-p">No data available</p>')
                            // $('#cc-ints-holder').hide();
                        }

                        // var val = $("#interest_selector").val();
                        // $("#cc-ints-data").html(returnInterest(_r, val));
                        // $("#interest_selector").change(function() {
                        //     var v = $(this).val();
                        //     $("#cc-ints-data").html(returnInterest(_r, v));
                        // })

                        var object = {};
                        // console.log(data);
                        if (data.hasOwnProperty('social_profiles') && !_.isEmpty(data.social_profiles)) {
                            object = data.social_profiles;
                            // console.log(object);
                            var _htm = '<div class="item-carousel1 owl-theme owl-carousel align-center" style="width:80%;     margin: 27px; padding:0 30px">';
                            var _html_upper = "";
                            var _html_upper1 = "";

                            for (var property in object) {
                                var mapping = {
                                    google: "googleplus"
                                };
                                // console.log(property);
                                if (object.hasOwnProperty(property)) {
                                    _htm = _htm + '<div class="owl-item features-item">';
                                    var icon = mapping.hasOwnProperty(property) ? mapping[property] : property;
                                    _htm = _htm + '<a target="_blank" href="' + object[property].url + '"><img class="carousel-img" src="https://app.frrole.com/custom/socialicons/' + 
                                    icon + '.png"></a></div>';
                                    // console.log(icon);
                                    var uname = '';
                                    var folls = '';
                                    if (object[property].hasOwnProperty('username') && object[property].username != '' && object[property].username != undefined 
                                    && object[property].username != null) {
                                        uname = '<span>@' + object[property].username + '</span>';
                                    }
                                    if (object[property].hasOwnProperty('followers') && object[property].followers != '' 
                                    && object[property].followers != undefined && object[property].followers != null) {
                                        folls = '<span>Followers: ' + object[property].followers + '</span>';
                                    }
                                    _html_upper += '<div class="social_profiles_url"><a class="ia_social_network_link ia_social_network_elem" target="_blank"  href="' + 
                                    object[property].url + '"><span style="text-decoration:underline"><strong>' + icon + '</strong></span><i class="fa fa-link fa-fw" aria-hidden="true"></i>' + 
                                    uname + ' ' + folls + '</a><img class="social_profiles_image" src="https://app.frrole.com/custom/socialicons/' + icon + '.png"></div>';
                                    _html_upper1 += '<a class="social_profiles_url" target="_blank"  href="' + object[property].url + 
                                    '"><img class="social_profiles_image" src="https://app.frrole.com/custom/socialicons/' + icon + '.png"></a>';
                                }
                            }
                            _htm = _htm + '</div>';
                            // console.log(_htm);
                            $(".social_profiles_container").html(_html_upper);


                            $(".social_profiles_container1").html(_html_upper1);
                            $('.social-buttons-slider').html(_htm);

                            $(".item-carousel1").owlCarousel({
                                autoPlay: 6000,
                                items: 6,
                                dots: true,
                                itemsDesktop: [1199, 6],
                                itemsTabletSmall: [768, 3],
                                itemsMobile: [480, 3],
                                navigation: false,
                                singleItem: true,
                                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                            });
                        } else {
                            $(".social_profiles_container").owlCarousel("destroy");
                            $(".social_profiles_container").empty();
                            $(".social_profiles_container1").empty();

                        }
                        var _htm1 = '';
                        if (data.hasOwnProperty('brand_usage') && !_.isEmpty(data.brand_usage)) {
                            var object1 = data.brand_usage;
                            /*data.brand_usage.brand1 = data.brand_usage.airtel;
                            data.brand_usage.brand2 = data.brand_usage.airtel;
                            data.brand_usage.brand3 = data.brand_usage.airtel;
                            data.brand_usage.brand4 = data.brand_usage.airtel;
                            data.brand_usage.brand5 = data.brand_usage.airtel;
                            data.brand_usage.brand6 = data.brand_usage.airtel;
                            data.brand_usage.brand7 = data.brand_usage.airtel;*/
                            for (var property in object1) {
                                if (object1.hasOwnProperty(property)) {
                                    var net = object1[property].positive_tweets - object1[property].negative_tweets;
                                    var affinity = '';
                                    var affinityClass = 'item-medium';
                                    var usage = object1[property].total_tweets;
                                    var usageScore = '';
                                    if (net < -70) {
                                        affinity = 'Very -ve Affinity';
                                        affinityClass = 'item-low';
                                    } else if (net > -70 && net < 0) {
                                        affinity = '-ve Affinity';
                                        affinityClass = 'item-low';
                                    } else if (net == 0) {
                                        affinity = 'Neutral affinity';
                                        affinityClass = 'item-medium';
                                    } else if (net > 0) {
                                        affinity = 'Very +ve Affinity';
                                        affinityClass = 'item-high';
                                    } else {
                                        affinity = '+ve Affinity';
                                        affinityClass = 'item-high';
                                    }

                                    var lastAffinityClass = '';
                                    if (object1[property].hasOwnProperty('last_interaction_affinity')) {
                                        if (object1[property].last_interaction_affinity.indexOf('negative') > -1) {
                                            lastAffinityClass = 'item-low';
                                        } else if (object1[property].last_interaction_affinity.indexOf('neutral') > -1) {
                                            lastAffinityClass = 'item-medium';
                                        } else {
                                            lastAffinityClass = 'item-high';
                                        }
                                    }

                                    if (usage < 10) {
                                        usageScore = 'Low';
                                    } else if (usage < 100 && usage > 10) {
                                        usageScore = 'Medium';
                                    } else {
                                        usageScore = 'High';
                                    }
                                    _htm1 = _htm1 + '<div><div style="width:100%" class="owl-item features-item">';
                                    _htm1 = _htm1 + '<div class="br-usage" style="background:#ebebeb"><span class="brand-br mb-10 capitalize-txt" style="">' + property.replace(/_/g, ' ') + '</span> <div class="row"><div class="col-md-8 col-md-offset-2" style="border-bottom:1px solid grey;padding:5px"><span class="grey-br" >Usage Level :</span> ';
                                    _htm1 = _htm1 + ' <span class="brand-usage">' + usageScore + '</span>';
                                    _htm1 = _htm1 + ' <span class="brand-affinity mb-10 ' + affinityClass + '">(' + affinity + ')</span></div></div>';
                                    _htm1 = _htm1 + ' <div class="row"><div class="col-md-6 ac-mobile" style="text-align:right;padding:8px"><div><span class="grey-br" style="display:block">First Known Interaction</span>';
                                    _htm1 = _htm1 + ' <span class="brand-black mb-10">' + moment(object1[property].first_known_interaction).fromNow() + '</div></span>';
                                    _htm1 = _htm1 + '</div><div class="col-md-6 ac-mobile" style="text-align:left;padding:8px"> <span class="grey-br">Last Known Interaction</span>';
                                    _htm1 = _htm1 + ' <div style="display:block" ><span class="brand-black mb-10">' + moment(object1[property].last_known_interaction).fromNow() + '</span>';
                                    _htm1 = _htm1 + ' <span class="brand-black ' + lastAffinityClass + '">(' + object1[property].last_interaction_affinity + ') </span></div>';
                                    _htm1 = _htm1 + '</div></div></div></div></div>';
                                }
                            }

                            $('#comp-usage').html('<div  class="bu-slider owl-carousel owl-theme align-center">' + _htm1 + '</div>');

                            $(".bu-slider").owlCarousel({
                                items: 1,
                                nav: false,
                                margin: 20,
                                dots: true
                            });

                        } else {
                            $('#comp-usage').html('<div  class="bu-slider owl-carousel owl-theme align-center"><p style="margin-top:15px !important" class="error-msg-p p-left">No data available</p></div>');
                        }
                        $('#customer_care').show();
                        $('#comp-usage .bu-slider').css('display', 'block !important');
                        $('#comp-usage .bu-slider').show();

                    }
                          

                        // changeLoaderMsg('success');
                        $('#lmdiv').hide();
                        if (ckStatus[tuid] != 'example') {
                            var _cookie = $.cookie('analysis_list');
                            // console.log('' + tuid + '#pending#', '' + tuid + '#resolved#')
                            _cookie = _cookie.replace('' + tuid + '#pending#', '' + tuid + '#resolved#')
                            $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                        }
                        loadUsersFromCookie();
                        _countOfTrials = 0;
                        // $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                        // $('#error').slideUp();
                        // console.log("data: "+ JSON.stringify(data));
                        var data = datag;

                        $('#influence-holder-klout').show();
                        if (data.hasOwnProperty('social_profiles') && !_.isEmpty(data.social_profiles)) {
                            object = data.social_profiles;
                            // console.log(object);
                            var _htm = '<div class="item-carousel1 owl-theme owl-carousel align-center" style="width:80%;     margin: 27px; padding:0 30px">';
                            var _html_upper = "";
                            var _html_upper1 = "";

                            for (var property in object) {
                                var mapping = {
                                    google: "googleplus"
                                };
                                if (object.hasOwnProperty(property)) {
                                    _htm = _htm + '<div class="owl-item features-item">';
                                    var icon = mapping.hasOwnProperty(property) ? mapping[property] : property;
                                    _htm = _htm + '<a target="_blank" href="' + object[property].url + '"><img class="carousel-img" src="http://app.frrole.com/custom/socialicons/' + icon + '.png"></a></div>';
                                    var uname = '';
                                    var folls = '';
                                    if (object[property].hasOwnProperty('username') && object[property].username != '' && object[property].username != undefined && object[property].username != null) {
                                        uname = '<span>@' + object[property].username + '</span>';
                                    }
                                    if (object[property].hasOwnProperty('followers') && object[property].followers != '' && object[property].followers != undefined && object[property].followers != null) {
                                        folls = '<span>Followers: ' + object[property].followers + '</span>';
                                    }
                                    _html_upper += '<div class="social_profiles_url"><a class="ia_social_network_link ia_social_network_elem" target="_blank"  href="' + object[property].url + '"><span style="text-decoration:underline"><strong>' + icon + '</strong></span><i class="fa fa-link fa-fw" aria-hidden="true"></i>' + uname + ' ' + folls + '</a><img class="social_profiles_image" src="https://app.frrole.com/custom/socialicons/' + icon + '.png"></div>';
                                    _html_upper1 += '<a class="social_profiles_url" target="_blank"  href="' + object[property].url + '"><img class="social_profiles_image" src="https://app.frrole.com/custom/socialicons/' + icon + '.png"></a>';
                                }
                            }
                            _htm = _htm + '</div>';
                            // console.log(_htm);
                            $(".social_profiles_container").html(_html_upper);
var URL_BASE = $('#URL_BASE').val();

                            $(".social_profiles_container1").html(_html_upper1);
                            $('.social-buttons-slider').html(_htm);

                            $(".item-carousel1").owlCarousel({
                                autoPlay: 6000,
                                items: 6,
                                dots: true,
                                itemsDesktop: [1199, 6],
                                itemsTabletSmall: [768, 3],
                                itemsMobile: [480, 3],
                                navigation: false,
                                singleItem: true,
                                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
                            });
                        } else {
                            $(".social_profiles_container").owlCarousel("destroy");
                            $(".social_profiles_container").empty();
                            $(".social_profiles_container1").empty();

                        }
                        // user_profile_image.replace("_normal", "").replace(".jpeg", "_200x200.jpeg").replace(".jpg", "_200x200.jpg")
                        if(data.hasOwnProperty('user_profile_image') && data.user_profile_image != null && data.user_profile_image != undefined && data.user_profile_image != ''){
                            $('#dp-img').attr('src', 'img1/'+data.display_name+'.jpg');
                            img = data.user_profile_image.replace('_normal', '').replace(".jpeg", "_200x200.jpeg").replace(".jpg", "_200x200.jpg");
                            $.ajax({
                                url: URL_BASE + "ajax_function.php",
                                type: "post",
                                data: {"action":"image_save","url":img,"name":data.display_name},
                                success: function (response) {
                                   //$('#dp-img').attr('src',$url);
                                   //alert(response);
                                },
                                error: function(jqXHR, textStatus, errorThrown) {
                                   console.log(textStatus, errorThrown);
                                }
                            });
                            $('#cc-img').attr('src', data.user_profile_image.replace('_normal', '').replace(".jpeg", "_200x200.jpeg").replace(".jpg", "_200x200.jpg"));
                            $('#emp-img').attr('src', data.user_profile_image.replace('_normal', '').replace(".jpeg", "_200x200.jpeg").replace(".jpg", "_200x200.jpg"));
                        } else {
                            $('#dp-img').attr('src', 'https://frrole.ai/images/team/male.gif');
                            $('#cc-img').attr('src', 'https://frrole.ai/images/team/male.gif');
                            $('#emp-img').attr('src', 'https://frrole.ai/images/team/male.gif');
                        }
                        // console.log(data.user_description);
                        if(data.hasOwnProperty('user_description') && data.user_description !== null && 
                        typeof(data.user_description)=='string' && data.user_description.length>0){
                            $('#p-descr').html(data.user_description.parseURL().parseUsername().parseHashtag());
                        }else{
                            $('#p-descr').html('');
                        }
                        
                        $('#d-name').html(data.display_name);
                        if(data.hasOwnProperty('user_name') && data.user_name != null && data.user_name != ''){
                            $('#u-id').html('@' + data.user_name);
                            $('#cc-username').html('@' + data.user_name);
                        }
                        else{
                            $('#u-id').html('');
                            $('#cc-username').html('');
                        }
                        
                        if (data.hasOwnProperty("last_modified"))
                            $(".last_modified_at_metadata").html('<strong>Last Modified At: </strong>' + moment(data.last_modified).format('lll'));
                        else
                            $(".last_modified_at_metadata").html('<strong>Last Modified At: </strong> N/A');

                        globuserid = data.user_name;
                        // $('#real-person').html(data.demographics.user_type == 'person' ? "Yes" : "No");
                        var devicesArr = [];
                        if (data.hasOwnProperty('tech_usage') && data.tech_usage.hasOwnProperty('devices')) {
                            devicesArr = data.tech_usage.devices;
                        }


                        //klot score calculation
                        //bio description
                        var optBio = '';
                        var bioArr = [];
                        if (data.hasOwnProperty('social_profiles') && data.social_profiles.length != undefined) {
                            if (data.social_profiles.hasOwnProperty('linkedin') && data.social_profiles.linkedin.hasOwnProperty('bio')) {
                                optBio = data.social_profiles.linkedin.bio;
                            } else if (data.social_profiles.hasOwnProperty('twitter') && data.social_profiles.twitter.hasOwnProperty('bio')) {
                                optBio = data.social_profiles.twitter.bio;
                            } else if (data.social_profiles.hasOwnProperty('google') && data.social_profiles.google.hasOwnProperty('bio')) {
                                optBio = data.social_profiles.google.bio;
                            } else if (data.social_profiles.hasOwnProperty('angellist') && data.social_profiles.angellist.hasOwnProperty('bio')) {
                                optBio = data.social_profiles.angellist.bio;
                            } else if (data.social_profiles.hasOwnProperty('facebook') && data.social_profiles.facebook.hasOwnProperty('bio')) {
                                optBio = data.social_profiles.facebook.bio;
                            }
                        }
                        if (optBio != '') {
                            $('#cc-user-bio').html(optBio);
                            $('#cc-user-bio').show();
                            $('#cc-usr-b').show();
                        } else {
                            $('#cc-user-bio').hide();
                            $('#cc-usr-b').hide();

                        }

                        //bio description
                        var devices = [];
                        if (devicesArr.length) {
                            devices = devicesArr.map(function(item, i) {
                                return item.device;
                            })
                            if (devices.length == 1) {
                                $('#devices').html(devices[0].replace(/_/g, ' '));
                            } else {
                                $('#devices').html(devices[0].replace(/_/g, ' ') + ', ' + devices[1].replace(/_/g, ' '));
                            }
                            $('#devices').parent().parent().show();
                        } else {
                            $('#devices').parent().parent().hide();
                        }




                        //klout score calculation

                        if (data.hasOwnProperty('languages') && !_.isEmpty(data.languages)) {
                            var langs = [];
                            var ls = [],
                                lString = [];

                            langs = data.languages.sort(function(a, b) {
                                return b.percent - a.percent;
                            })
                            langs.forEach(function(el, i) {
                                if (i < 2 && el.language != 'Undetermined') {
                                    ls.push(el);
                                }
                            })

                            ls.forEach(function(ele, index) {
                                lString.push(ele.language + " (" + ele.percent + "%)");
                            })
                            $('#languages').html(lString.join(', '));
                            // $('#cc-lang').html(ls[0]);
                            // $('#emp-lang').html(ls[0]);
                            $('#languages').closest('.horizontal-block').show();
                        } else {
                            $('#languages').closest('.horizontal-block').hide();
                        }

                        if (!_.isEmpty(data.websites)) {
                            //<div class="btn-group">
                            //<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
                            // Action
                            //<span class="caret"></span>
                            //</a>
                            //<ul class="dropdown-menu" role="menu" aria-labelledby="dropdownMenu">
                            //     <li><a tabindex="-1" href="#">Regular link</a></li>
                            //   <li class="disabled"><a tabindex="-1" href="#">Disabled link</a></li>
                            // <li><a tabindex="-1" href="#">Another link</a></li>
                            //</ul>
                            //</div>
                            var web_html = '<div class="btn-group">' +
                                '<a class="web_container dropdown-toggle" data-toggle="dropdown" href="#"><i class="fa fa-fw fa-globe"></i> Websites <i class="fa fa-chevron-down" aria-hidden="true" style="font-size: 12px;margin-left: 5px;border-left: 1px solid rgba(255, 255, 255, .3);padding-left: 5px;"></i>' +
                                '</a><ul class="dropdown-menu website-dropdown" role="menu" aria-labelledby="dropdownMenu" style="left=-80px">';
                            data.websites.forEach(function(elem, index) {
                                web_html += '<li><a tabindex="-1" target="_blank" href="' + elem.url + '">' + elem.url + '</a></li>';
                            })

                            web_html += '</ul></div>';
                            $('#websites_hero').html(web_html);
                        } else {
                            var web_html = '';
                            $('#websites_hero').html(web_html);
                        }

                        if (data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('profession') && !_.isEmpty(data.demographics.profession) && data.demographics.profession[0] != undefined) {
                            $('#profession').html(data.demographics.profession[0]);
                            $('#profession').parent().parent().show();
                        } else {
                            $('#profession').parent().parent().hide();
                        }
                        if (data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('marital_status') && !_.isEmpty(data.demographics.marital_status) && data.demographics.marital_status[0] != undefined) {
                            $('#marital').html(data.demographics.marital_status);
                            $('#marital').parent().parent().show();
                        } else {
                            $('#marital').parent().parent().hide();
                        }

                        if ( data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('age') && data.demographics.age != null && data.demographics.age != '' && data.demographics.age != undefined) {
                            $('#age').html(data.demographics.age);
                            $('#age').parent().parent().show();
                        } else if (data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('age_range') && data.demographics.age_range != null && data.demographics.age_range != '' && data.demographics.age_range != undefined) {
                            $('#age').html(data.demographics.age_range);
                            $('#age').parent().parent().show();
                        } else {
                            $('#age').parent().parent().hide();
                        }
                        var locationArray = [];
                        if (data.hasOwnProperty('demographics') && data.demographics.hasOwnProperty('location') && !_.isEmpty(data.demographics.location)) {
                            if (data.demographics.location.hasOwnProperty('city') && data.demographics.location.city != '' && data.demographics.location.city != null && data.demographics.location.city != undefined) {
                                locationArray.push(data.demographics.location.city.replace(/_/g, ' '));
                            }
                            // if (data.demographics.location.hasOwnProperty('state') && data.demographics.location.state != '' && data.demographics.location.state != null && data.demographics.location.state != undefined) {
                            //     locationArray.push(data.demographics.location.state.replace(/_/g, ' '));
                            // }
                            if (data.demographics.location.hasOwnProperty('country') && data.demographics.location.country != '' && data.demographics.location.country != null && data.demographics.location.country != undefined) {
                                locationArray.push(data.demographics.location.country.replace(/_/g, ' '));
                            }
                            if (locationArray.length > 0) {
                                $('#location').html(locationArray.join(', ')).addClass('.capitalize-txt');
                                $('#location').parent().parent().show();
                            } else {
                                $('#location').parent().parent().hide();
                            }


                        } else {
                            $('#location').parent().parent().hide();
                        }

                        if (locationArray.length > 0) {
                            $('#cc-location').html('<strong>' + locationArray.join(', ') + '</strong').addClass('.capitalize-txt');
                            $('#emp-location').html('<strong>' + locationArray.join(', ') + '</strong').addClass('.capitalize-txt');
                        } else {
                            $('#cc-location').html('<strong>NA</strong').addClass('.capitalize-txt');
                            $('#emp-location').html('<strong>NA</strong').addClass('.capitalize-txt');
                        }


                        createPersonalitySection(data);
                        var _html = '';
                        var score = 0;
                        var klout_level = '';

                        $.ajax({
                            url: "//api.klout.com/v2/identity.json/twitter?key=nj88h4rs4h33ta2d3tvs3hmz&screenName=" + data.user_name,
                            dataType: "jsonp",
                            success: function(d) {
                                // console.log(d);
                                var kloutid = d.id;
                                $.ajax({
                                    url: "//api.klout.com/v2/user.json/" + kloutid + "/score?key=nj88h4rs4h33ta2d3tvs3hmz",
                                    dataType: "jsonp",
                                    success: function(kd) {
                                        score = kd.score.toFixed(0);
                                        // console.log(kd);
                                        // console.log(score);
                                        klout_level = '';
                                        if (score > 0 && score <= 5) {
                                            klout_level = 'Very Low'
                                        } else if (score > 5 && score <= 25) {
                                            klout_level = 'Low';
                                        } else if (score > 25 && score <= 45) {
                                            klout_level = 'Medium';
                                        } else if (score > 45 && score < 75) {
                                            klout_level = 'High';
                                        } else if (score >= 75) {
                                            klout_level = 'Very High';
                                        }

                                        if (score == 0) {
                                            createSocialActivitySection(data, 0, klout_level);
                                        } else {
                                            createSocialActivitySection(data, score, klout_level);
                                        }

                                    },
                                    error: function(error) {
                                        createSocialActivitySection(data, 0, klout_level);
                                        // console.log('klout: ' + error);
                                    }
                                })
                            },
                            error: function(error) {
                                createSocialActivitySection(data, 0, klout_level);
                                // console.log('klout: ' + error);

                            }
                        })

                        if (score == 0 && klout_level == '') {
                            createSocialActivitySection(data, 0, klout_level);
                        }

                        var interests = [];
                        var interestArr = [];
                        var sortedInterests = [];
                        var content_html = '';
                        var _html = '';
                        var tab_html = '';
                        if (data.hasOwnProperty('interests') && !_.isEmpty(data.interests) && data.interests.length != 0) {
                            data.interests.forEach(function(item, index) {
                                interests[item.interest] = item["sub-interests"];

                                interestArr.push(item.interest);

                                if (index == 0) {
                                    content_html = content_html + '<div class="tab-pane active" id="tab-' + index + '" role="tabpanel">';
                                    tab_html = tab_html + '<li class="nav-item active"><a class="nav-link active tb' + index + '" data-toggle="tab" href="#tab-' + index + '" role="tab" onclick=changeCircleColor(' + index + ')>' + item.interest + '</a></li>';
                                } else {
                                    content_html = content_html + '<div class="tab-pane" id="tab-' + index + '" role="tabpanel">';
                                    tab_html = tab_html + '<li class="nav-item"><a class="nav-link active tb' + index + '" data-toggle="tab" href="#tab-' + index + '" role="tab" onclick=changeCircleColor(' + index + ')>' + item.interest + '</a></li>';
                                }

                                item["sub-interests"].forEach(function(t, ind) {
                                    content_html = content_html + '<div class="panel panel-default"><div class="panel-heading">' + t["sub-interest"] + ' ('+Math.floor(t["share"])+'% Share)</div><div class="panel-body">';
                                    t.names.forEach(function(itm, idx) {
                                        content_html = content_html + '<p class="black-border" style="display:inline-block;padding:5px; margin:5px 5px 5px 0; border-radius: 4px;text-transform:capitalize; font-size:12px;">' + itm.replace(/_/g, ' ') + '</p>';
                                    })
                                    content_html = content_html + '</div></div>';
                                })
                                if (index < 10) {
                                    _html = _html + '<div style="cursor:pointer; ' + returnStyle(index) + '" class="int-circle' + index + '" onclick=clickInterestCircle(' + index + ')><span>' + item.interest +'</span><span>'+Math.floor(item.share)+'%</span></div>';
                                }

                                content_html = content_html + '</div>';

                            });
                            $('#interest-graph').css('height', '300px');
                            $('#interests_section_download').show();
                            $('#interests_section_share').show();
                        } else {
                            _html = '<p class="error-msg-p">No data available</p>';
                            $('#interest-graph').css('height', '20px');
                            $('#interests_section_download').hide();
                            $('#interests_section_share').hide();
                        }

                        $('#interest-tab-content').html(content_html);
                        $('#interest-graph').html(_html);
                        $('#interest-tabs').html(tab_html);

                        var affinity = [];
                        var affinityArr = [];
                        if (data.hasOwnProperty('content_affinity') && data.content_affinity.hasOwnProperty('categories'))
                            affinity = data.content_affinity.categories;
                        var _ht = '';
                        if (affinity.length != 0) {
                            affinity.forEach(function(ele, i) {
                                affinityGlobal[ele.category] = [];
                                affinityGlobal[ele.category]["entities"] = ele.entities;
                                affinityGlobal[ele.category]["positive_sentiment"] = ele.positive_sentiment;
                                affinityGlobal[ele.category]["negative_sentiment"] = ele.negative_sentiment;
                                affinityGlobal[ele.category]["neutral_sentiment"] = ele.neutral_sentiment;
                                affinityGlobal[ele.category]["share"] = ele.share;

                                if (i < 8) {
                                    if (i == 0) {
                                        _ht = _ht + '<div class="circle0 active-circle" onclick=affinityClick("' + ele.category + '",this)>' + ele.category.replace('_', ' ') + '</div>';
                                    } else {
                                        _ht = _ht + '<div class="circle' + i + ' opaque" onclick=affinityClick("' + ele.category + '",this)>' + ele.category.replace('_', ' ') + '</div>';
                                    }
                                }
                                // console.log(affinityGlobal[ele.category]);
                            })
                            $('#chart').css('height', '400px').css('width', '500px');
                            $('.chart').css('max-height', '600px');
                            $('#affinity_section_share').show();
                            $('#affinity_section_download').show();
                        } else {
                            _ht = '<p class="error-msg-p">No data available</p>';
                            $('#chart').parent().find('.sports-icons').hide();
                            $('#chart').css('height', '20px').css('width', 'auto');
                            $('.chart').css('max-height', '0px');
                            $('#affinity_section_share').hide();
                            $('#affinity_section_download').hide();
                        }

                        if (data.hasOwnProperty('related_entities') && !_.isEmpty(data.related_entities) && data.related_entities.hasOwnProperty('topics') && !_.isEmpty(data.related_entities.topics)) {
                            var otherEntities = [];
                            data.related_entities.topics.forEach(function(el, i) {
                                if (i < 10)
                                    otherEntities.push(el);
                            })

                            if (data.related_entities.hasOwnProperty('other_topics') && !_.isEmpty(data.related_entities.other_topics)) {

                                data.related_entities.other_topics.forEach(function(ele, ind) {

                                    if (ind < 10) {
                                        var obj = {};
                                        obj["count"] = 0;
                                        obj["share"] = 0;
                                        obj["negative_sentiment"] = 0;
                                        obj["other_entity"] = ele;
                                        obj["positive_sentiment"] = 0;
                                        obj["type"] = '';
                                        obj["neutral_sentiment"] = 0;
                                        otherEntities.push(obj);
                                    }
                                })
                            }
                            // console.log(otherEntities);

                            affinityGlobal["others"] = [];
                            affinityGlobal["others"]["entities"] = otherEntities;
                            affinityGlobal["others"]["positive_sentiment"] = 0;
                            affinityGlobal["others"]["negative_sentiment"] = 0;
                            affinityGlobal["others"]["neutral_sentiment"] = 0;
                            affinityGlobal["others"]["share"] = 0;

                            _ht = _ht + '<div class="circleother opaque" onclick=affinityClick("others",this)>Others</div>';
                        }



                        // console.log(affinityGlobal);

                        $('#chart').html(_ht);

                        var brands = [];
                        var brandsArr = [];
                        if (data.hasOwnProperty('content_affinity') && data.content_affinity.hasOwnProperty('entity_types'))
                            brands = data.content_affinity.entity_types;
                        var _htbp = '';
                        if (brands.length != 0) {
                            brands.forEach(function(ele, i) {
                                // verifiedGlobal[ele.entity_type] = ele.qualified_entities;
                                verifiedGlobal[ele.entity_type] = [];
                                verifiedGlobal[ele.entity_type]["qualified_entities"] = ele.qualified_entities;
                                verifiedGlobal[ele.entity_type]["positive_sentiment"] = ele.positive_sentiment;
                                verifiedGlobal[ele.entity_type]["negative_sentiment"] = ele.negative_sentiment;
                                verifiedGlobal[ele.entity_type]["neutral_sentiment"] = ele.neutral_sentiment;
                                verifiedGlobal[ele.entity_type]["share"] = ele.share;

                                if (i < 8) {
                                    if (i == 0) {
                                        _htbp = _htbp + '<div class="bp-circle0 active-circle" onclick=brandClick("' + ele.entity_type + '",this)>' + ele.entity_type.replace('_', ' ') + '</div>';
                                    } else {
                                        _htbp = _htbp + '<div class="bp-circle' + i + ' opaque" onclick=brandClick("' + ele.entity_type + '",this)>' + ele.entity_type.replace('_', ' ') + '</div>';
                                    }
                                }

                            });
                            $('#bp-chart').css('height', '400px').css('width', '500px');
                            $('#pro_affinity_section_share').show();
                            $('#product_or_brand_affinity_section_download').show();
                        } else {
                            _htbp = '<p class="error-msg-p">No data available</p>';
                            $('#bp-chart').parent().find('.bp-icons').hide();
                            $('#bp-chart').css('height', '20px').css('width', 'auto');
                            $('#pro_affinity_section_share').hide();
                            $('#product_or_brand_affinity_section_download').hide();
                        }

                        $('#bp-chart').html(_htbp);



                        // $('#interactions-table').html(_h);
                        // console.log(verifiedGlobal);
                        $('#chart div.active-circle').click();
                        $('#bp-chart div.active-circle').click();
                        $('#loader-img').slideUp();
                        $('#result-area').show();
                        $('#ds-intro-section').hide();
                        // window.location.href = '#result-area';
                        $('html, body').animate({
                            scrollTop: $('#result-area').offset().top
                        }, 2000, 'easeInOutExpo');



                    
                    clickInterestCircle(0);
                    $('#interactions-table').find('span.table-sp').each(function() {
                        var a = $(this).html();
                        if (parseInt(a) < 0) {
                            $(this).css('color', '#e74c3c');
                        } else if (parseInt(a) > 0) {
                            $(this).css('color', '#2ecc71');
                        } else {
                            $(this).css('color', '#f1c40f')
                        }
                    })
                    $('#bp-table,#affinity-table').find('span.table-sp.table-sp-sent').each(function() {
                        var a = $(this).html();
                        if (parseInt(a) < 0) {
                            $(this).css('color', '#e74c3c');
                        } else if (parseInt(a) > 0) {
                            $(this).css('color', '#2ecc71');
                        } else {
                            $(this).css('color', '#f1c40f')
                        }
                    })

                    // var url = window.location.href;
                    // var subsec = url.split('#')[1];
                    // alert(subsec);
                    $('#results-area').show();
                    if ($('#' + deeplinkUrl).offset() != undefined) {
                        $('html, body').animate({
                            scrollTop: $('#' + deeplinkUrl).offset().top
                        }, 2000, 'easeInOutExpo');
                    }

                } else {
                    // console.log("Fetch failed");
                    _countOfTrials = 0;
                    // changeLoaderMsg('create');

                    $('#result-area').hide();
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $('#error').html(returnErrorMessage(tuid)).slideDown();
                    if (ckStatus[tuid] != 'example') {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(tuid + '#' + ckStatus[tuid] + '#' + ckNumber[tuid], tuid + '#failed#' + ckNumber[tuid]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                    }
                }

                if ($('.web_container').length > 0) {
                    var w = $('.website-dropdown').width();
                    var a = $('.web_container').width();
                    var c = w - a;
                    $('.website-dropdown').css('left', -(c / 2 - 15) + 'px')
                }


            },
            error: function(xmlhttprequest, textstatus, message) {
                if(textstatus==="timeout") {
                    $('#result-area').hide();
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $('#error').html("This request is probably queued up. Don't worry, we would email you the profile as soon as it is ready.").slideDown();
                    if (ckStatus[tuid] != 'example') {
                        var _cookie = $.cookie('analysis_list');
                        _cookie.replace(tuid + '#' + ckStatus[tuid] + '#' + ckNumber[tuid], tuid + '#failed#' + ckNumber[tuid]);
                        $.cookie('analysis_list', '' + _cookie + '', { expires: 999, path: '/' });
                    }
                } else {
                    $("#loader_c_p").fadeOut(200, "easeInOutExpo");
                    $("#loader_success").fadeOut(200, "easeInOutExpo");
                    $('#error').html('Can not connect to our system. Please check your connection.').slideDown();
                    if ($.cookie('' + tuid + '') != 'example')
                        $.cookie('' + tuid + '', 'pending', { expires: 999, path: '/' });
                    $('#result-area').hide();
                }
            }
        });
        // ,virgin_america

    }







}

String.prototype.parseHashtag = function() {
    return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
        var tag2 = t.replace("#", "%23")
        return "<a href='http://twitter.com/search?q=" + tag2 + "' class='' target='_blank'>" + t + "</a>";

    });
};
String.prototype.parseUsername = function() {
    return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
        var username = u.replace("@", "")
        return "<span class='MakeUserSpecificCall_username'>" + u + "</span>";
        //return "<a href='http://twitter.com/"+username+"' class='nocolorlink' target='_blank'>"+u+"</a>";
    });
};
String.prototype.parseURL = function() {
    return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
        return "<a href='" + url + "' class='' target='_blank'>" + url + "</a>";
    });
};

function returnLevel(data) {
    if (data.toLowerCase() == 'medium' || data == 'Neutral/Realist' || data.toLowerCase() == 'realist' || data.toLowerCase() == 'good' || data.toLowerCase() == 'sometimes friendly') {
        return 'item-medium';
    } else if (data.toLowerCase() == 'low' || data.toLowerCase() == 'very low' || data == 'Negative/Slightly Pessimistic' || data == 'Very Negative/Highly Pessimistic' || data.toLowerCase() == 'slightly pessimistic' || data.toLowerCase() == 'highly pessimistic' || data.toLowerCase() == 'average' || data.toLowerCase() == 'poor' || data.toLowerCase() == 'sometimes unfriendly' || data.toLowerCase() == 'usually unfriendly') {
        return 'item-low';
    } else if (data.toLowerCase() == 'high' || data.toLowerCase() == 'very high' || data == 'Very Positive/Highly Optimistic' || data == 'Positive/Optimistic' || data == 'Excellent' || data.toLowerCase() == 'very good' || data.toLowerCase() == 'very friendly' || data.toLowerCase() == 'usually friendly' || data.toLowerCase() == 'dominant' || data.toLowerCase() == 'influencial' || data.toLowerCase() == 'highly optimistic' || data.toLowerCase() == 'optimistic') {
        return 'item-high';
    }
}

function convertDomToJpeg(id) {
    domtoimage.toJpeg(document.getElementById(id), { quality: 0.95 })
        .then(function(dataUrl) {
            var link = document.createElement('a');
            link.download = 'my-image-name.jpeg';
            link.href = dataUrl;
            link.click();
        });
}


function returnStyle(index) {
    var screenWidth = $("body").width();
    var x = 10;

    var y = (screenWidth + 10 * x) / 9;
    // console.log(y);
    var current = y - x * index;
    current = current + (3.5 * (10 - index));
    current = current + "px";

    return 'height:' + current + '; width:' + current + '; line-height:' + current + '; margin-left:-' + (3.5 * (12 - index)) + 'px;';
}

function loadUsersFromCookie() {
    var ckNames = [],
        ckStatus = [],
        ckNumber = [];
    ckNames = getAnalysisNames();
    // console.log("ckNames: " + ckNames);
    ckStatus = getAnalysisStatus();
    ckNumber = getAnalysisEligible();
    var _requestedUserCookie = $.cookie('analysis_list');
    if (_requestedUserCookie) {
        _requestedUserCookie = _requestedUserCookie.split(", ");
        var _html = "";
        ckNames.forEach(function(el, i) {
            // console.log(el + ' :' + $.cookie('' + el + ''));
            if (i > (ckNames.length - 6)) {
                if (ckStatus[el] == 'resolved')
                    _html += '<button data-toggle="tooltip" title="The analysis is available."  data-name="' + el + '" class="putThisNameInInput resolved">' + el + ' <i class="fa fa-check" style="color:green" aria-hidden="true"></i></button>';
                else if (ckStatus[el] == 'pending') {
                    _html += '<button data-toggle="tooltip" title="The analysis is under process." data-name="' + el + '" class="putThisNameInInput pending">' + el + ' <i class="fa fa-exclamation-circle" style="color:red" aria-hidden="true"></i></button>';
                } else if (ckStatus[el] == 'example') {
                    _html += '<button data-toggle="tooltip" title="This is an example analysis" data-name="' + el + '" class="putThisNameInInput example">' + el + '</button>';
                } else if (ckStatus[el] == 'failed') {
                    _html += '<button data-toggle="tooltip" title="The analysis is not available." data-name="' + el + '" class="putThisNameInInput pending">' + el + ' <i class="fa fa fa-times-circle-o" style="color:red" aria-hidden="true"></i></button>';
                }
            }
        });
        $("#cookie_analyses .saved_analysis_container").html(_html);
        $("#cookie_analyses.saved_analysis_parent_container").show();
    } else {
        $("#cookie_analyses.saved_analysis_parent_container").hide();
    }
    $('[data-toggle="tooltip"]').tooltip();
}

$(".close_intro_popup").click(function() {
    $.cookie('load_personas_popup', "no", { expires: 7, path: '/' });
    $(this).closest("section").slideUp(100);
});

$('.close_section_popup').click(function() {
    var sectionId = $(this).attr('id').replace('_close', '');
    $.cookie('' + sectionId + '', true, { expires: 90, path: '/' });
    $(this).closest("section").slideUp(100);
    $('#show-all-sections').show();
})

$(document).on("click", ".putThisNameInInput", function() {
    var _name = $(this).attr("data-name");
    $('.placeholder').hide();
    $("#tuid").val(_name);
    $('#start-analysis').click();

})
$('#show-all-sections').click(function() {
    $('#result-area').find('section').each(function() {
        var _sectionhidecookie = $(this).attr('id');
        var loadSectionorHide = $.cookie('' + _sectionhidecookie + '');
        // console.log(loadSectionorHide);
        if (loadSectionorHide) {
            $.cookie('' + _sectionhidecookie + '', false, { expires: 90, path: '/' });
            $('#' + _sectionhidecookie).show();
        }
    })
    $(".learn_more_button").click();
})

$("#hiring_scroll").click(function() {
    $('#btn-emp').click();

    $('html, body').animate({
        scrollTop: $('#customer_care').offset().top
    }, 2000, 'easeInOutExpo');

})

$("#customer_care_scroll").click(function() {
    $('#btn-cc').click();
    $('html, body').animate({
        scrollTop: $('#customer_care').offset().top
    }, 2000, 'easeInOutExpo');
})



$(".learn_more_button").click(function() {
    $('html, body').animate({
        scrollTop: $('#ds-intro-section').offset().top
    }, 2000, 'easeInOutExpo');
})

function ifcookieempty() {
    var _requestedUserCookie = $.cookie('analysis_list');
    var exs = 'rrhoover#example#29, kimkardashian#example#29, patrickc#example#29';
    // console.log("empty:" + _requestedUserCookie);
    if ($.cookie('analysis_list') == null) {
        // $.cookie('analysis_number', 0, { expires: 999, path: '/' });
        localStorage.setItem('analysis_number', 0);
        $.cookie('analysis_list', exs, { expires: 999, path: '/' });

    }
}



var _countOfTrials = 0;


$(document).ready(function() {
    // console.log("hi hi");
    
    setCorrectApikey();
    $('span.placeholder').click();
    if ($('#tuid').val().length > 0) {
        $('span.placeholder').hide();
    } else {
        $('span.placeholder').show();
    }
    watchAnalysis();

    ifcookieempty();
    var url = window.location.href;
    var urlArr = url.split('/');
    // console.log(urlArr);
    deeplinkUrl = query = urlArr[urlArr.length - 1].split('?')[0].split('#')[1];
    if(urlArr[urlArr.length - 1] == '' && urlArr[urlArr.length - 3] == 'thebactrak-app'){
        $('#tuid').val(urlArr[urlArr.length - 2]);
        $('.placeholder').hide();
        $('#start-analysis').click();
    }else if($.inArray('www.linkedin.com',urlArr)){
        var linkedinUname = url.split('thebactrak-app/')[1];
        $('#tuid').val(linkedinUname);
        $('.placeholder').hide();
        $('#start-analysis').click();
    }else if (urlArr[urlArr.length - 1] != 'thebactrak-app') {
        var tid = urlArr[urlArr.length - 1].replace('#result-area', '');
        var fV = tid.split('#')[0];
        // console.log(fV);
        if (fV != "thebactrak-app?ref=producthunt") {
            $('#tuid').val(fV.split('?')[0]);
            $('.placeholder').hide();
            $('#start-analysis').click();
            // load_ana(event);
        }
    } else {
        $('.placeholder').show();
    }

    $(".social_profiles_container").empty();
    $(".social_profiles_container1").empty();
    // $('.item-carousel1.owl-carousel').empty();
    $('.bu-slider.owl-carousel').empty();
    // $('#cc-img').attr('src', '');
    $('#cc-comm-approach').html('<p class="error-msg-p">No data available</p>');
    $('#cc-example').html('<p class="error-msg-p">No data available</p>');
    $('#cc-lang').html('NA');
    $('#cc-social-influence').html('NA');
    $('#cc-ints-holder').hide();
    $('#cc-ints-data').html('<p class="error-msg-p">No data available</p>');
    $('#cc-user-bio').html('<p class="error-msg-p">No data available</p>');
    $('#cc-ints').html('');
    $(".bu-slider").html('<div class="row"><div style="margin-left:40px" class="owl-item features-item"><p class="error-msg-p">No data available</p>');
    // $('#request-a-demo').hide();
    $('#footer').hide();
    var showallflag = false;
    $('#result-area').find('section').each(function() {
        var _sectionhidecookie = $(this).attr('id');
        var loadSectionorHide = $.cookie('' + _sectionhidecookie + '');

        if (loadSectionorHide) {
            showallflag = true;
        }
    })

    if (showallflag) {
        $('#show-all-sections').hide();
    }
    // var items = [
    //         "Wondering what the personality traits of that 'popular' friend are? Right here for you.",
    //         "Going out on a date and wondering what your date's interests are? Happy to help.",
    //         "Resolving a customer's complaint but not sure of his temperament? We got your back.",
    //         "Evaluating a candidate and wondering if she is a team-person at all? Just ask me nicely :) ",
    //         "Want to know more about the person who moved in next door? We can help!",
    //         "Want to impress the boss? Figure out his/her personality traits and interests with us!"
    //     ],
    //     $text = $('#replace-msgs'),
    //     delay = 10; //seconds
    // function loop(delay) {
    //     $.each(items, function(i, elm) {
    //         $text.delay(delay * 1E3).fadeOut();
    //         $text.queue(function() {
    //             $text.html(items[i]);
    //             $text.dequeue();
    //         });
    //         $text.fadeIn();
    //         $text.queue(function() {
    //             if (i == items.length - 1) {
    //                 loop(delay);
    //             }
    //             $text.dequeue();
    //         });
    //     });
    // }
    // loop(delay);
    $('#ds-intro-section').hide();
    $('[data-toggle="tooltip"]').tooltip();
    $("body").mousemove(function() {
        $(document).on('mouseenter', 'div.social_profiles_url', function() {
            $(this).find('img').addClass('img-blur-effect');
            $(this).find('a.ia_social_network_link.ia_social_network_elem').addClass('show-link-content');
        });
        $(document).on('mouseleave', 'div.social_profiles_url', function() {
            $(this).find('img').removeClass('img-blur-effect');
            $(this).find('a.ia_social_network_link.ia_social_network_elem').removeClass('show-link-content');
        });
    })

    loadUsersFromCookie();
    if ($.cookie('analysis_list') == null) {
        $('#example_analysis').show();
    }
    $('#affinity-table').html('');
    $('#bp-table').html('');
    $('#result-area').hide();
    $('#ds-intro-section').show();
    var _loadPersonaPopup = $.cookie('load_personas_popup');
    if (!_loadPersonaPopup) {
        $(".close_intro_popup").closest("section").show();
    }

    $('#result-area').find('section').each(function() {
        var _sectionhidecookie = $(this).attr('id');
        var loadSectionorHide = $.cookie('' + _sectionhidecookie + '');
        // console.log(loadSectionorHide);
        if (loadSectionorHide == true) {
            // console.log('repeated' + loadSectionorHide);
            $('#' + _sectionhidecookie).hide();
        }
    })

    // var rand1 = getRandomNumber(0, 10);
    // var rand2 = getRandomNumber(0, 10);
    // var formop = '<h3 class="banner-heading font-alt" style="color:#ffffff;">Are you a developer and want to use the Frrole API?</h3><h2 class="font-alt mb-30 mb-sm-40" style="color:#ffffff !important;font-size:25px">Request for the API key and get started. </h2>' +
    //     '<div class="row"><div class="col-md-offset-2 col-md-8"><input type="text" id="appname" class="r_inp_name input-md form-control" placeholder="Application Name">' +
    //     '<input type="text" id="email" class="r_inp_name input-md form-control" placeholder="EMail">' +
    //     '<input type="text" id="captcha" class="r_inp_name input-md form-control" placeholder="' + rand1 + ' + ' + rand2 + ' = ?">' +
    //     '<button id="sub" class="btn btn-mod btn-border-w btn-round btn-medium">Submit</button></div></div>';
    // $('div#box-form').html(formop);
    // $(document).on('click', '#sub', function(event) {
    //     if ($("#captcha").val() != rand1 + rand2) {
    //         $("#resp").html("<p class='red'>Captcha Error!</p>");
    //         return;
    //     }
    //     $("#resp").html("<img src='http://frrole.com/_layout/images/ajax.gif'>");
    //     //alert("yo");
    //     $.ajax({
    //         url: 'http://api.frrole.com/views/apiv2/send_data.php',
    //         cache: false,
    //         type: "POST",
    //         data: { appname: $("#appname").val(), emailid: $("#emailid").val() },
    //         //dataType: 'json',
    //         success: function(data) {
    //             //alert(data);
    //             var res = data.split("::");
    //             if (res[0] == 0) {
    //                 $("#resp").html("<p class='red'>" + res[1] + "</p>");
    //                 $("#resp").fadeIn(200);
    //                 //setTimeout(function(){$("#resp").fadeOut(200);},2000);
    //             } else {
    //                 $("#resp").html("<p class='green'>" + res[1] + "</p>");
    //                 $("#resp").fadeIn(200);
    //                 /*setTimeout(function(){$("#center").fadeOut();
    //                 $("#baapcontainer").fadeOut();
    //                 $("#resp").fadeOut();
    //                 },2000);*/
    //             }
    //         }
    //     });

    // });
    // $(".page-loader div").fadeOut();
    // $(".page-loader").delay(200).fadeOut("slow");
    $('a.link-to-top').hide();
    // $('a[href="thebactrak-app#top"]').click(function(e) {
    //     e.preventDefault();
    //     $('html, body').animate({
    //         scrollTop: $('body').offset().top
    //     }, 2000, 'easeInOutExpo');
    // })

    var rand1 = getRandomNumber(0, 10);
    var rand2 = getRandomNumber(0, 10);
    var formop = '<h2 class="mb-30 mb-sm-40" style="color:#ffffff !important;font-size:25px">Ready to integrate the Frrole API?</h2><h3 class="banner-heading mb-30" style="color:#ffffff;font-size:17px; text-transform:none">Request an API key and get started!</h3>' +
        '<div class="row" style>' +
        '<div class="col-lg-4"><div class="mb-20 mb-md-10"><input style="margin:auto 10px" type="text" id="appname" class="r_inp_name input-md form-control" placeholder="Application Name"></div></div>' +
        '<div class="col-lg-4"><div class="mb-20 mb-md-10"><input style="margin:auto 10px" type="text" id="email" class="r_inp_name input-md form-control" placeholder="EMail"></div></div>' +
        '<div class="col-lg-4"><div class="mb-20 mb-md-10"><input style="margin:auto 10px" type="text" id="captcha" class="r_inp_name input-md form-control" placeholder="' + rand1 + ' + ' + rand2 + ' = ?"></div></div>' +
        '<div class="col-lg-12"><div class="mb-20 mb-md-10"><button style="margin:auto 10px" id="sub" class="btn btn-mod btn-border-w btn-round btn-medium">Submit</button></div></div><div id="resp"></div></div>';
    $('div#box-form').html(formop);
    $(document).on('click', '#sub', function(event) {
        if ($("#captcha").val() != rand1 + rand2) {
            $("#resp").html("<p class='red'>Captcha Error!</p>");
            return;
        }
        $("#resp").html("<img src='images/ajax-loader.gif'>");

        $.ajax({
            url: '//api.frrole.com/views/apiv2/send_data.php',
            cache: false,
            type: "POST",
            data: { appname: $("#appname").val(), emailid: $("#email").val(), source: ' From Deepsense' },
            //dataType: 'json',
            success: function(data) {
                //alert(data);
                var res = data.split("::");
                if (res[0] == 0) {
                    $("#resp").html("<p class='red'>" + res[1] + "</p>");
                    $("#resp").fadeIn(200);
                    //setTimeout(function(){$("#resp").fadeOut(200);},2000);
                } else {
                    $("#resp").html("<p class='green'>Thanks, you will receive the confirmation for API key in email. You can also visit <a href='http://api.frrole.com/v4/docs/user-profile' target='_blank'>the documentation</a> for user profile.</p>");
                    $("#resp").fadeIn(200);
                    /*setTimeout(function(){$("#center").fadeOut();
                    $("#baapcontainer").fadeOut();
                    $("#resp").fadeOut();
                    },2000);*/
                }
            }
        });

    });
})



function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function returnInterest(_r, index) {

//     var _html = "";
//     if (_r.hasOwnProperty('interests') && _r.interests.length != 0 && _r.interests[index] != undefined) {
//         var data = _r.interests[index];
//         _html += '<div class="mt-10">';

//         data["sub-interests"].forEach(function(el) {
//             _html += '<div class="interest-heading mt-5"><span class="interest-name titlecase">' + el["sub-interest"].replace(/_/g, " ").replace(/-/g, " ") + '</span></div>';
//             _html += '<div class="interest-labels titlecase">' + el.names.slice(0, 5).join(", ").replace(/_/g, " ").replace(/-/g, " ") + '</div>';
//         });
//         _html += '</div>';
//     } else {
//         _html += '<p class="error-msg-p">Data not available</p>';
//     }

//     return _html;
// }

function affinityClick(ind, elem) {
    $(elem).siblings().removeClass('active-circle').addClass('opaque');
    $(elem).addClass('active-circle');
    if (ind == 'others') {
        $('#affinity-soc').html('-');
        $('#affinity-neutral').html('-');
        $('#affinity-positive').html('-');
        $('#affinity-negative').html('-');
    } else {
        $('#affinity-soc').html(affinityGlobal[ind].share.toFixed(0) + '%');
        $('#affinity-neutral').html(affinityGlobal[ind].neutral_sentiment.toFixed(0) + '%');
        $('#affinity-positive').html(affinityGlobal[ind].positive_sentiment.toFixed(0) + '%');
        $('#affinity-negative').html(affinityGlobal[ind].negative_sentiment.toFixed(0) + '%');
    }
    var _html_aff = '<table style="width:100%"><tr><th></th><th class="affinity-th">Count</th><th class="affinity-th">Sentiment</th></tr>';
    // '<div class="affinity-row ar-first" style="padding:10px 0;"><div class="col-md-2 col-md-offset-5 col-sm-offset-3 col-xs-offset-3 col-sm-3 col-xs-3"><p class="table-p mb-30" style="color:#9599ac;font-size:15px;margin-bottom:20px">Count</p></div><div class="col-md-2 col-sm-4 col-xs-4"><p class="table-p mb-30" style="color:#9599ac;font-size:15px;margin-bottom:20px">Sentiment</p></div></div>';
    affinityGlobal[ind].entities.forEach(function(item, index) {
        if (index < 20) {
            var colorClass = '';
            if ((item.positive_sentiment - item.negative_sentiment).toFixed(0) == 0) {
                colorClass = 'item-medium';
            } else if ((item.positive_sentiment - item.negative_sentiment).toFixed(0) > 0) {
                colorClass = 'item-high';
            } else {
                colorClass = 'item-low';
            }
            if (item.hasOwnProperty('entity')) {
                // console.log(ind);
                _html_aff = _html_aff + '<tr class="affinity-tr"><td class="affinity-cell">' + item.entity + '</td><td class="affinity-cell"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">' + item.count + '</span></td><td class="affinity-cell"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">' + (item.positive_sentiment - item.negative_sentiment).toFixed(0) + '%</span></td></tr>';
            } else if (item.hasOwnProperty('topic')) {
                _html_aff = _html_aff + '<tr class="affinity-tr"><td class="affinity-cell">' + item.topic + '</td><td class="affinity-cell"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">' + item.count + '</span></td><td class="affinity-cell"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">' + (item.positive_sentiment - item.negative_sentiment).toFixed(0) + '%</span></td></tr>';
            } else if (item.hasOwnProperty('user_mention')) {
                _html_aff = _html_aff + '<tr class="affinity-tr"><td class="affinity-cell">' + item.user_mention + '</td><td class="affinity-cell"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">' + item.count + '</span></td><td class="affinity-cell"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">' + (item.positive_sentiment - item.negative_sentiment).toFixed(0) + '%</span></td></tr>';
            } else if (item.hasOwnProperty('other_entity')) {
                _html_aff = _html_aff + '<tr class="affinity-tr"><td class="affinity-cell">' + item.other_entity + '</td><td class="affinity-cell"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">-</span></td><td class="affinity-cell"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">-</span></td></tr>';
            }

        }
    })

    $('#affinity-table').html(_html_aff);

}

function brandClick(ind, elem) {
    $(elem).siblings().removeClass('active-circle').addClass('opaque');
    $(elem).addClass('active-circle');
    $('#bp-soc').html(verifiedGlobal[ind].share.toFixed(0) + '%');
    $('#bp-neutral').html(verifiedGlobal[ind].neutral_sentiment.toFixed(0) + '%');
    $('#bp-positive').html(verifiedGlobal[ind].positive_sentiment.toFixed(0) + '%');
    $('#bp-negative').html(verifiedGlobal[ind].negative_sentiment.toFixed(0) + '%');
    var _html_bp = '<table style="width:100%"><tr><th></th><th class="affinity-th">Count</th><th class="affinity-th">Sentiment</th></tr>';
    // '<div class="affinity-row ar-first" style="padding:10px 0;"><div class="col-md-2 col-md-offset-5 col-sm-offset-3 col-xs-offset-3 col-sm-3 col-xs-3"><p class="table-p mb-30" style="color:#9599ac;font-size:15px;margin-bottom:20px">Count</p></div><div class="col-md-2 col-sm-4 col-xs-4"><p class="table-p mb-30" style="color:#9599ac;font-size:15px;margin-bottom:20px">Sentiment</p></div></div>';
    verifiedGlobal[ind].qualified_entities.forEach(function(item, index) {
            if (index < 10) {
                var colorClass = '';
                if ((item.positive_sentiment - item.negative_sentiment).toFixed(0) == 0) {
                    colorClass = 'item-medium';
                } else if ((item.positive_sentiment - item.negative_sentiment).toFixed(0) > 0) {
                    colorClass = 'item-high';
                } else {
                    colorClass = 'item-low';
                }
                // _html_bp = _html_bp + '<div class="affinity-row" style="padding:10px 0;"><div class="col-md-5 col-sm-3 col-xs-3"><p class="table-p" style="color:#3c4052;">' + item.entity.replace(/_/g, ' ') + '</p></div><div class="col-md-2 col-sm-3 col-xs-3"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">' + item.count + '</span></div><div class="col-md-2 col-sm-3 col-xs-3"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">' + (item.positive_sentiment - item.negative_sentiment).toFixed(0) + '%</span></div></div><hr class="mt-0 mb-0 " />';

                _html_bp = _html_bp + '<tr class="affinity-tr"><td class="affinity-cell">' + item.entity.replace(/_/g, ' ') + '</td><td class="affinity-cell"><img class="table-icon" src="dsense/comment.svg" alt=""><span class="table-sp">' + item.count + '</span></td><td class="affinity-cell"><img class="table-icon" src="dsense/like.svg" alt=""><span class="table-sp table-sp-sent ' + colorClass + '">' + (item.positive_sentiment - item.negative_sentiment).toFixed(0) + '%</span></td></tr>';
            }

        })
        // _html_bp = _html_bp + '</div>';
    $('#bp-table').html(_html_bp);

}

function clickInterestCircle(number) {
    $('#interest-tabs li').eq(number).find('a').click();
}

function changeCircleColor(num) {
    $('#interest-graph').find('div').each(function() {
        $(this).removeClass('active-circle').addClass('opaque');
    })


    $('#interest-graph').find('div.int-circle' + num).removeClass('opaque').addClass('active-circle');
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
var intervalId = '';
function changeLoaderMsg(type) {
    clearInterval(intervalId);
    intervalId = setInterval(function(){ 
        $('#loader-msg').html(_messages[getRandomInt(_messages.length)]);
    }, 3000);
}


function beautyRoundOff(n) {

    if (isNaN(n))
        return n;

    if (n > 10)
        return Math.round(n);

    if (n > 1)
        return Math.round(n * 10) / 10;

    return parseFloat(n.toExponential(Math.max(1, 2 + Math.log10(Math.abs(n)))));
}


Object.resolve = function(path, obj, error) {
    var res = path.split('.').reduce(function(prev, curr) {
        return prev ? prev[curr] : undefined
    }, obj || self);
    var error = (typeof error == "undefined" ? undefined : error);
    if (!res)
        return error;
    return res;
}


function hiringPersonaProgessBars(data, index) {

    if (data.value == "-")
        return "";

    var mt = "mt-10";
    // if (data.hasOwnProperty("first") && data.first == true)
    //     mt = "mt-5";
    var _html = '';
    if(index%2 == 0) {
        _html = '<div class="row">';
    }
    _html += '<div class="col-lg-6 col-md-12 bar-item ' + (index % 2 == 0 ? "even-bar-item" : "odd-bar-item") + '"><div class="' + mt + '">';

    if (data.level == "Very Positive/Highly Optimistic")
        data.level = "Highly Optimistic";

    _html += '<span class="dswa-hiringperson_name">' + data.name + '</span>'
        //_html += '<span class="pull-right hiringpersona_value_container"> <span class="hiringperson_big_value">'+beautyRoundOff(data.value)+'</span><span class="hiringperson_label">/10</span></span>'
    _html += '<span class="pull-right dswa-hiringpersona_value_container"><span class="dswa-hiringperson_level titlecase">' + data.level + '</span></span>'
    _html += '</div>';

    _html += '<div class="">';
    _html += '<div class="dswa-demogrpahics_icon_progress">' +
        '<div class="progress-group bars-holder" >' +
        '<div class="progress dswa-progress-custom dswa-vsm" style="background-color:#ffffff;">' +
        '<div class="progress-bar dswa-bgblack" style="width: ' + data.value * 10 + '%; background-color: rgb(255, 0, 0);">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<span class="dswa-demogrpahics_icon_progress_value_label">' + Math.round(data.value) + '/10</span>' +
        '</div>';
    _html += '</div></div>';

    if(index%2 == 1) {
        _html+= '</div>';
    }
    return _html;

}

function ccPersonaProgessBars(data, index) {

    if (data.value == "-")
        return "";

    var mt = "mt-10";
    // if (data.hasOwnProperty("first") && data.first == true)
    //     mt = "mt-5";
    var _html = '<div class="row"><div class="col-lg-6 col-md-12 bar-item even-bar-item"><div class="' + mt + '">';

    if (data.level == "Very Positive/Highly Optimistic")
        data.level = "Highly Optimistic";

    _html += '<span class="dswa-hiringperson_name">' + data.name + '</span>'
        //_html += '<span class="pull-right hiringpersona_value_container"> <span class="hiringperson_big_value">'+beautyRoundOff(data.value)+'</span><span class="hiringperson_label">/10</span></span>'
    _html += '<span class="pull-right dswa-hiringpersona_value_container"><span class="dswa-hiringperson_level titlecase">' + data.level + '</span></span>'
    _html += '</div>';

    _html += '<div class="">';
    _html += '<div class="dswa-demogrpahics_icon_progress">' +
        '<div class="progress-group bars-holder" >' +
        '<div class="progress dswa-progress-custom dswa-vsm" style="background-color:#ffffff;">' +
        '<div class="progress-bar dswa-bgblack" style="width: ' + data.value * 10 + '%; background-color: rgb(255, 0, 0);">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<span class="dswa-demogrpahics_icon_progress_value_label">' + Math.round(data.value) + '/10</span>' +
        '</div>';
    _html += '</div></div></div>';
    return _html;

}

function returnRoleFitHTML(data) {
    var _html = "";
    _html += '<div class="frrole_hiring_circles_container">';

    var _c = data.level;
    var count = Math.round(data.score / 2);
    for (var i = 0; i < 5; i++) {
        if (i >= count)
            _c = "white";
        _html += '<span class="frrole_hiring_circle frrole_hiring_circle_' + _c + '"></span>';
    }
    _html += '</div>';
    return _html;
}

function hiringPersona(response) {

    var _html = "";
    // _html = '<div class="mb-30">';
    var attitude_and_outlook = {
        name: "Attitude and Outlook",
        value: Object.resolve("persona.employee.attitude_and_outlook.score", response, "-"),
        level: Object.resolve("persona.employee.attitude_and_outlook.level", response, "-"),
        first: true
    };
    _html += hiringPersonaProgessBars(attitude_and_outlook, 0);

    var need_for_autonomy = {
        name: "Need for Autonomy",
        level: Object.resolve("persona.employee.need_for_autonomy.level", response, "-"),
        value: Object.resolve("persona.employee.need_for_autonomy.score", response, "-")
    };
    _html += hiringPersonaProgessBars(need_for_autonomy, 1);

    var teamwork_skills = {
        name: "Teamwork Skills",
        level: Object.resolve("persona.employee.teamwork_skills.level", response, "-"),
        value: Object.resolve("persona.employee.teamwork_skills.score", response, "-")
    };
    _html += hiringPersonaProgessBars(teamwork_skills, 2);

    var general_behavior = {
        name: "General Behavior",
        level: Object.resolve("persona.employee.general_behavior.level", response, "-"),
        value: Object.resolve("persona.employee.general_behavior.score", response, "-")
    };
    _html += hiringPersonaProgessBars(general_behavior, 3);


    var action_orientedness = {
        name: "Action Orientedness",
        level: Object.resolve("persona.employee.action_orientedness.level", response, "-"),
        value: Object.resolve("persona.employee.action_orientedness.score", response, "-")
    };
    _html += hiringPersonaProgessBars(action_orientedness, 4);

    var stability_potential = {
        name: "Stability Potential",
        level: Object.resolve("persona.employee.stability_potential.level", response, "-"),
        value: Object.resolve("persona.employee.stability_potential.score", response, "-")
    };
    _html += hiringPersonaProgessBars(stability_potential, 5);

    var learning_ability = {
        name: "Learning Ability",
        level: Object.resolve("persona.employee.learning_ability.level", response, "-"),
        value: Object.resolve("persona.employee.learning_ability.score", response, "-")
    };
    _html += hiringPersonaProgessBars(learning_ability, 6);

    _html += '<div></div>';

    return _html;
}

function cc_Persona(response) {

    var _html = "";
    // _html = '<div class="mb-30">';
    var attitude_and_outlook = {
        name: "Attitude and Outlook",
        value: Object.resolve("persona.employee.attitude_and_outlook.score", response, "-"),
        level: Object.resolve("persona.employee.attitude_and_outlook.level", response, "-"),
        first: true
    };
    _html += ccPersonaProgessBars(attitude_and_outlook, 0);

    
    var general_behavior = {
        name: "General Behavior",
        level: Object.resolve("persona.employee.general_behavior.level", response, "-"),
        value: Object.resolve("persona.employee.general_behavior.score", response, "-")
    };
    _html += ccPersonaProgessBars(general_behavior, 3);



    _html += '<div></div>';

    return _html;
}

function returnRolefit(response) {
    var _rolefit = Object.resolve("persona.employee.role_fit", response, {});
    var _html = '';

    if (Object.keys(_rolefit).length > 0) {
        _html += '';
        _html += '<span class="hiringperson_name" style="display:inline-flex;margin-top:30px">Role Fit</span>';
        _html += '';
        _html += '<div class="hiring_person_role_fit_all_container mt-3">';
    }


    var rolefit = [];
    Object.keys(_rolefit).forEach(function(el, i) {
        var data = _rolefit[el];
        data.role = el;
        rolefit.push(data);
    });
    rolefit = rolefit.sort(function(a, b) {
        return a.score > b.score ? -1 : 1;
    });

    var max = -1;
    var maxindex = -1;
    rolefit.forEach(function(el, i) {
        if (max < beautyRoundOff(el.score)) {
            maxindex = i;
            max = beautyRoundOff(el.score);
        }
    });


    rolefit.forEach(function(el, i) {
        var level = el.level.charAt(0).toUpperCase() + el.level.slice(1).toLowerCase();
        _html += '<div class="hiring_person_role_fit_single_container" data-html="true" data-toggle="tooltip" data-original-title="' + level + '<br>' + Math.round(el.score * 10) / 10 + ' / 10">' +
            '<div class="hiring_person_role_fit_label titlecase ' + (i == maxindex ? 'frrole-stronger' : '') + '"><span>' + el.role + '</span></div>' +
            returnRoleFitHTML(el)
            //+'<div class="hiring_person_role_fit_value_container"><span class="hiringperson_big_value">'+beautyRoundOff(_rolefit[el].score)+'</span><span class="hiringperson_label">/10</span></div>'
            +
            '</div>';
    })


    if (Object.keys(_rolefit).length > 0) {
        // _html += '</div>';
        _html += '<div class="frrole-seperator"></div>';
    }

    return _html;
}

function returnInterest(_r, index) {

    var data = _r.interests[index];
    var _html = "";
    // console.log(index);
    _html += '<div class="mt-10">';

    data["sub-interests"].forEach(function(el) {
        _html += '<div class="interest-heading mt-5"><span class="interest-name titlecase">' + el["sub-interest"].replace(/_/g, " ").replace(/-/g, " ") + '</span></div>';
        _html += '<div class="interest-labels titlecase">' + el.names.slice(0, 5).join(", ").replace(/_/g, " ").replace(/-/g, " ") + '</div>';
    });
    _html += '</div>';
    return _html;
}

var interestSelector = function() {
    var val = jQuery(".frrole-app-box").find("#interest_selector").val();
    jQuery(".frrole-app-box").find("#interest_selector_data").html(returnInterest(fetchResponseCache, val));
};

function buildInterest(_r) {
    var interestData = Object.resolve("interests", _r, []);
    var _html = "";
    if (interestData.length > 0) {
        _html = '<div><div class="frrole-grey-heading"></div></div>';

        _html += '<div class="frrole_interest_container_all mt-10">';
        interestData.forEach(function(el, i) {
            _html += '<span class="frrole_interest_button_container frrole_interest_button_showtrigger" data-index="' + i + '"><span class="titlecase frrole_interest_button_label">' + el.interest + '</span><span class="frrole_interest_button_value">' + (el.share == "-" ? "-" : beautyRoundOff(el.share) + '%') + '</span></span>';
        });
        _html += '</div>';
        _html += '<div class="frrole_specific_interest_container"></div>';
    }

    $(document).off("click", ".frrole_interest_button_showtrigger");
    $(document).on("click", ".frrole_interest_button_showtrigger", function() {
        var id = $(this).attr("data-index");
        buildInterestSpecific(_r, id);
    });

    if (_html != "")
        _html += '<div class="frrole-seperator"></div>';
    // console.log(_html);
    return _html;
}

function buildInterestSpecific(_r, index) {
    var index = +index;
    var data = _r.interests[index];
    var _html = "";

    if (!data.hasOwnProperty("sub-interests") || _.isEmpty(data["sub-interests"])) {
        _html += '<div>No sub-interest details found... Click here to go back!</div>';
    }

    var indexPrev, indexNext;
    indexNext = index + 1;
    indexPrev = index - 1;
    if (index + 1 == _r.interests.length)
        indexNext = 0;

    if (index == 0)
        indexPrev = _r.interests.length - 1;



    _html += '<div class="frrole_interest_title_slider mt-10 mb-10">' +
        '<span class="frrole_interest_button_showtrigger" data-index="' + indexPrev + '"><i class="fa fa-fw fa-chevron-left"></i></span>' +
        '<span class="frrole_interest_title_label">' + data.interest.toUpperCase() + '<span class="frrole_interest_title_details">' + (data.share == "-" ? "-" : beautyRoundOff(data.share) + '% share') + '</span></span>' +
        '<span class="frrole_interest_button_showtrigger" data-index="' + indexNext + '"><i class="fa fa-fw fa-chevron-right"></i></span>' +
        '</div>';

    data["sub-interests"].forEach(function(el, i) {
        _html += '<div class="frrole_subinterest_title titlecase mt-15">' + el["sub-interest"] + '<span class="pull-right">' + (el.share == "-" ? "-" : beautyRoundOff(el.share) + '% share') + '</span></div>';

        _html += '<div class="frrole_subinterest_names_container mt-3">';

        _html += '<table style="width:100%; font-size:13px;" class="mt-5 table_frrole_crx_elem_interest">'
        var splittedNames = splitPairs(el.names);
        var splittedNames = el.names;
        splittedNames.forEach(function(_el, _i) {

            var classToAdd = "";
            if (_i > 4) {
                classToAdd = 'style="display: none;"';
            }



            _html += '<tr ' + classToAdd + ' class="tr_frrole_crx_elem_interest"><td class="td_frrole_crx_elem_interest titlecase">' + fE(_el) + '</td></tr>';

        });
        _html += '</table>';

        if (splittedNames.length > 5)
            _html += '<div class="frrole_interest_title_label_container text-right"><span class="more_interest_frrole_crx">Show More</span></div>';

        //_html += '<span class="frrole_subinterest_name_label titlecase">'+fE(el.names.join(", "))+'</span></div>'


    });

    $(".frrole_specific_interest_container").html(_html).slideDown(200);
    $(".frrole_interest_container_all").slideUp(200);

}

function splitPairs(arr) {
    var pairs = [];
    for (var i = 0; i < arr.length; i += 2) {
        if (arr[i + 1] !== undefined) {
            pairs.push([arr[i], arr[i + 1]]);
        } else {
            pairs.push([arr[i]]);
        }
    }
    return pairs;
}

function fE(str) {
    return str.replace(/_/g, " ");
}

function educationHtml(_res) {
    if (_res.hasOwnProperty('education') && !_.isEmpty(_res.education)) {
        var sliderHtml = '';

        _res.education.forEach(function(el, i) {
            var degree = '';
            var prd = '';
            var school = '';
            if (el.hasOwnProperty('degree') && el.degree != '' && el.degree != null) {
                degree = el.degree;
            } else {
                degree = ' - ';
            }

            if (el.hasOwnProperty('school') && el.school != null && el.school != undefined) {
                school = el.school;
            }
            // if (!el.hasOwnProperty('school') || el.school == '' && el.school == null) {
            //     school = '-';
            // }
            if (!el.hasOwnProperty('start_date') && !el.hasOwnProperty('end_date')) {
                prd = 'Dates Unknown';
            } else if (el.hasOwnProperty('start_date') && el.start_date != null && (!el.hasOwnProperty('end_date') || el.end_date == "")) {
                prd = el.start_date + ' - ';
            } else if (el.hasOwnProperty('end_date') && el.end_date != null && (!el.hasOwnProperty('start_date') || el.start_date == "")) {
                prd = ' - ' + el.end_date;
            } else {
                prd = el.start_date + ' - ' + el.end_date;
            }

            sliderHtml = sliderHtml + '<div style="text-align:center; background:#f7f7f7; padding:10px; margin:10px;" class="item">';
            sliderHtml = sliderHtml + '<p class="p-right"><strong>' + degree + '</strong></p><p class="p-right">' + school + '</p>' + prd;
            sliderHtml = sliderHtml + '</div>';
        });
        $('#error_msg_education').hide();
        $('#error_msg_education_cc').hide();
        // console.log(sliderHtml);
        $(".fullwidth-slider-edu").removeClass("itIsSliding").owlCarousel("destroy");
        $('.fullwidth-slider-edu').show();
        $('.fullwidth-slider-edu').html(sliderHtml);

        $(".fullwidth-slider-edu").addClass("itIsSliding").owlCarousel({
            items: 2,
            nav: false,
            margin: 20,
            dots: true
        });
        $(".fullwidth-slider-edu-cc").removeClass("itIsSliding").owlCarousel("destroy");
        $('.fullwidth-slider-edu-cc').show();
        $('.fullwidth-slider-edu-cc').html(sliderHtml);

        $(".fullwidth-slider-edu-cc").addClass("itIsSliding").owlCarousel({
            items: 2,
            nav: false,
            margin: 20,
            dots: true
        });

    } else {
        $('.fullwidth-slider-edu-cc').hide();
        $('.fullwidth-slider-edu').hide();
        $('#error_msg_education').show();
        $('#error_msg_education_cc').show();
    }
}

$(document).on("click", ".frrole_interest_title_label", function() {
    $(".frrole_specific_interest_container").slideUp(200);
    $(".frrole_interest_container_all").slideDown(200);
});

$(document).on("click", ".more_interest_frrole_crx", function() {
    $(this).closest("div").prev("table").find("tr:eq(4)").nextAll("tr").slideToggle();
    if ($(this).text() === "Show More") {
        $(this).html("Show Less");
    } else {
        $(this).html("Show More");
    }
});