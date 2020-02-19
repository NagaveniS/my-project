$(document).ready(function() {
    var post_title;
    $(".newpost").hide();
    $.ajaxSetup({
        async: false
    }); 
    $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
        var info= "";
        $.each(data,function(key,value)
        {
            info += "<div class='test' >";
            // info += `<div class='test' data-post_id=${value.id} >`;
            info +="<p id='userid'>" + value.userId + "</p>";
            info += "<p class='title'>" + value.title + "</p>";
            info +="</div>";
           
        });
        $('.left-portion').append(info);    
    });
    $(".test").bind('click', function () {
        var id=$(this).index();
        var uid=$(this).find('#userid').text();
        $(".newpost").hide();
        $(".right-division").show();
        var url1 ='https://jsonplaceholder.typicode.com/posts/';
        var url=url1.concat(uid);
        var username ="";
        username=getName(uid);
        $.getJSON( url, function(data) {
            $(".right-division").html("<p class='author'>Author:" + username + "</p>");
            $(".right-division").append("<h4 class='ptitle'>" + data.title + "</h4>");
            $(".right-division").append("<p>" + data.body + "</p>");
            $(".right-division").append("<p>" + "<b>Comments:</b>" + "</p>");
           
         });
         
         var path="https://jsonplaceholder.typicode.com/comments?postId=";
         pid=id+1;
         var path1=path.concat(pid);
           $.getJSON( path1,function(data){            
              var info_cmt="";
              info_cmt ="<div class='border'>";
              $.each(data,function(key,value){               
                info_cmt +="<div class='border'>"
                  info_cmt += '<p>' + value.name + ':<br><br>'+ value.body + '</p>';
                 info_cmt +="</div>"                  
              });
             $(".right-division").append(info_cmt);
             info_cmt +="</div>";
           } );     
     });
     function getName(index)
    {
        var name="";
        var path= "https://jsonplaceholder.typicode.com/users/";
       
        path = path.concat(index);
       
        $.getJSON(path, function(data){
            name = data.username;
        });
        return name;
    }
    $('.link').click(function (prms) {
        
        $(".right-division").hide();
        $(".newpost").show();
        $('.post-form').submit(function () {
            post_title=$('.inputField1').val();
            post_body=$('.inputField2').val();
            post_data ={
                'title':$('.inputField1').val(),
                'body' :$('.inputField2').val()
            };
             
            alert("data submitted");
            $.post("https://jsonplaceholder.typicode.com/posts",
            post_data,
            function(data,status){
                var info='';
                console.log(info);
                console.log(data.body)
                    info += "<div class='test'>";
                    info +="<p id='userid'>" + data.id + "</p>";
        
                    info += "<p class='title'>" + data.title + "</p>";
                    info +="</div>";
        
                $('.left-portion').append(info);
           
            });
            
            return false;
          
        });
        
         
        
        
    });

   
  
    
    
});

