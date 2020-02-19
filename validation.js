$(document).ready(function() {
    var user_name;
    result_status_title=false;
    result_status_body=false;
    $(".newpost").hide();
    $.ajaxSetup({
        async: false
    }); 
   var userid;
    $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
        var info= "";
       
        $.each(data,function(key,value){
            userid =value.userId;
            user_name=getName(userid);  
          
            info += `<div class='test' data-post_id=${value.id} data-user_id=${value.userId} >`
            info += "<p id='userid'>user name:" + user_name + "</p>"
            info += "<p class='title'>" + value.title + "</p></div>";
          
        });
        $('.left-portion').append(info);  
        
    });
    $(".test").bind('click', function () {
        
        var post_id=$(this).data('post_id');
        var user_id=$(this).data('user_id');
        console.log(user_id);
        console.log(post_id);
         $(".newpost").hide();
        $(".right-division").show();
        user_name=getName(user_id);
        var url ='https://jsonplaceholder.typicode.com/posts/';
        url=url.concat(post_id);
       
        $.getJSON(url,function (data) {
            $(".right-division").html("<p class='author'>Author:" + user_name + "</p>" + "<h4 class='ptitle'>" + data.title + "</h4>" + "<p>" + data.body + "</p>" + "<p>" + "<b>Comments:</b>" + "</p>");
           
         });
         var path="https://jsonplaceholder.typicode.com/comments?postId=";
         path=path.concat(post_id);
         $.getJSON( path,function(data){  
            var info_cmt="";
            info_cmt ="<div class='border'>";
            $.each(data,function(key,value){               
              info_cmt +="<div class='border'>"
                info_cmt += '<p>' + value.name + ':<br><br>'+ value.body + '</p>';
               info_cmt +="</div>"                  
            });
           $(".right-division").append(info_cmt);
           info_cmt +="</div>";
         });
    });
    var obj;
    function getName(user_id)
    {
        path='https://jsonplaceholder.typicode.com/users/';
        path=path.concat(user_id);
        $.getJSON(path, function(data)
        { 
            user_name= data.username; 
            console.log(user_name);
            // obj = data;
        });
        return user_name;
    }
    $('.link').click(function (prms) {
        
        $(".right-division").hide();
        $(".newpost").show();
       
       
        
    });
    $('.post-form').submit(function () {
        result_status_title=false;
        result_status_body=false;
        post_title=$('.inputField1').val();
        post_body=$('.inputField2').val();
        $(function()
        {
        var maxLength=25,minLength=5;
        $(function() {if(!(post_title.length >= minLength && post_title.length<=maxLength))
        {
            $(("<p>" + " title should contain" + minLength + "characters and " + maxLength + "characters" +"</p>"));
                   }
         else{
            result_status_title=true;
           
         }   
         });
        });
        $(function()
        {
        var maxLength=1000,minLength=10;
        $(function() {if(!(post_body.length >= minLength && post_body.length<=maxLength))
        {
            alert(" title should contain" + minLength + "characters and " + maxLength + "characters");
        }
         else{
            result_status_body=true;
           
         }   
         });
        });

        post_data ={
            'title':$('.inputField1').val(),
            'body' :$('.inputField2').val()
        };
       
        if(result_status_title == true && result_status_body == true)
       { $.post("https://jsonplaceholder.typicode.com/posts",
        post_data,
        function(data,status){
            var info='';
           
                info += "<div class='test'>";
                // info +="<p id='userid'>" + data.id + "</p>";
    
                info += "<p class='title'>" + data.title + "</p>";
                info +="</div>";
    
            $('.left-portion').prepend(info);
            alert(status);
       
        });
    }
    else{
        alert("failure");
    }            
        return false;      
    });       
});

function user_list()
{
    var userList;
    path='https://jsonplaceholder.typicode.com/users';
    // path=path.concat(user_id);
    $.getJSON(path, function(data)
    { 
        user_name= data.username; 
        console.log(user_name);
        userList= data;
    });
    console.log(userList);

}
// function getUserName











