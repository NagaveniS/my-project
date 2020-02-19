$(document).ready(function () {
    var user_name;
    var listOfUser = {};
    var listOfPosts = {};
    result_status_title = false;
    result_status_body = false;
    $(".newpost").hide();
    $.ajaxSetup({
        async: false
    });
    path = 'https://jsonplaceholder.typicode.com/users';
    $.get(path, function (data) {
        $.each(data, function (key, value) {
            listOfUser[value.id] = value;
        });
    });
    var userid;
    $.getJSON('https://jsonplaceholder.typicode.com/posts', function (data) {
        var info = "";
        $.each(data, function (key, value) {

            userid = value.userId;
            user_name = getName(userid);
            info += `<div class='test' data-post_id=${value.id} data-user_id=${value.userId} >`
            info += "<p id='userid'>user name:" + user_name + "</p>"
            info += "<p class='title'>" + value.title + "</p></div>";
        });
        $('.left-portion').append(info);
    });
    $(".test").bind('click', function () {
        var post_id = $(this).data('post_id');
        var user_id = $(this).data('user_id');
        $(".newpost").hide();
        $(".right-division").show();
        user_name = getName(user_id);
         var url ='https://jsonplaceholder.typicode.com/posts/';
        url=url.concat(post_id);
        $.getJSON(url,function (data) {
        $(".right-division").html("<p class='author'>Author:" + user_name + "</p>");
        $(".right-division").append("<h4 class='ptitle'>" + data.title + "</h4>");
        $(".right-division").append("<p>" + data.body + "</p>");
        $(".right-division").append("<p>" + "<b>Comments:</b>" + "</p>");
          });
        var path = "https://jsonplaceholder.typicode.com/comments?postId=";
        path = path.concat(post_id);
        $.getJSON(path, function (data) {
            var info_cmt = "";
            info_cmt = "<div class='border'>";
            $.each(data, function (key, value) {
                info_cmt += "<div class='border'>"
                info_cmt += '<p>' + value.name + ':<br><br>' + value.body + '</p>';
                info_cmt += "</div>"
            });
            $(".right-division").append(info_cmt);
            info_cmt += "</div>";
        });
    });
    function getName(user_id) {
        user_name = listOfUser[user_id].username;
        console.log(user_name);
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
        result_status_title = validateTitle(post_title);
        result_status_body=validateBody(post_body);
        post_data ={
            'title':$('.inputField1').val(),
            'body' :$('.inputField2').val()
        };   
        if(result_status_title == true && result_status_body == true)
       { 
           $.post("https://jsonplaceholder.typicode.com/posts",
        post_data,
        function(data,status){
            var info='';
           
                info += "<div class='test'>";
                // info +="<p id='userid'>" + data.id + "</p>";
    
                info += "<p class='title'>" + data.title + "</p>";
                info +="</div>";
    
            $('.left-portion').prepend(info);
            alert(status);
            $('.inputField1').val('');
            $('.inputField2').val('');
            return false;
        });
        //  $(".post-form").reset();  
    }
    else{
        //alert("failure");
    }            
         return false;      
    });
    function validateTitle(post_title)
    {
        var maxLength=25,minLength=5;
        var element=$(".error-field1");
       var message="title should contain" + minLength + "characters and " + maxLength + "characters";
        if(!(post_title.length >= minLength && post_title.length<=maxLength))
        {
          setError(element,message);
          result_status_title=false;
          return false;
        }
         else{
            result_status_title=true;
            clearError(element);
         }   
         return result_status_title;
    }
    function validateBody(post_body)
    {
        var maxLength=1000,minLength=10;
        var element=$(".error-field2");
        var message="body should contain" + minLength + "characters and " + maxLength + "characters";
        if(!(post_body.length >= minLength && post_body.length<=maxLength))
        {
           setError(element,message);
           result_status_body=false;
        }
         else{
            result_status_body=true;
            clearError(element);
         }  
         return result_status_body;
    }
    function setError(element,message)
    {
        // $("element").text(message);
        element.html(message);
        return false;
    }
    function clearError(element)
    {
        element.html("");
       
    }
});


