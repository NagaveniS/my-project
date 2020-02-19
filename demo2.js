$(document).ready(function() {
    $(".newpost").hide();
    $.ajaxSetup({
        async: false
    });   
        console.log("opened");
        $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
            var info= "";
            $.each(data,function(key,value)
            {
                info += "<div class='test'>";
                info +="<p id='userid'>" + value.userId + "</p>";

                info += "<p class='title'>" + value.title + "</p>";
                info +="</div>";
               
            });
            $('.left-portion').append(info);    
        });
        $(".test").bind('click', function () {
            var id=$(this).index();
            var uid=$(this).find('#userid').text();
            var pid=$(this).find('#postid').text();
           
            console.log(uid);
            console.log(pid);
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
                // $(".right-division").append("<p>" + data.title + "</p>");
             });
             
             var path="https://jsonplaceholder.typicode.com/comments?postId=";
             var path1=path.concat(id);
              // console.log(path1);
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
    function new_posts() {
     console.log("function called"); 
         $(".right-division").hide();
         $(".newpost").show();
         
    }      

//     $.post("https://jsonplaceholder.typicode.com/posts",
//     {
//       title: " + title + ",
//       body: " + content + "
     
//     },
//     function(data, status){
//         alert("posted data");
//       alert("Data: " + data + "\nStatus: " + status);
//     });
//   }); 



