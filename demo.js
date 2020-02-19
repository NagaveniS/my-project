$(document).ready(function() {

    $.ajaxSetup({
        async: false
    });   
        console.log("opened");
        $.getJSON('https://jsonplaceholder.typicode.com/posts', function(data) {
            var info= "";
            $.each(data,function(key,value)
            {
              
                // console.log(key);
                info +=  "<tr data-post-id="+value.id+" onclick='open_post(" + key + "," + value.id +  "," + value.id +")'>";
                info += '<td>'  + "user" + value.userId + '<br>';
                
                info +=  value.title  + '</td>';
                info += '</tr>';   
            });
            // console.log(info);
            $('.post-table').append(info);
            
        });
    
    });
    function open_post(index,post_id,user_id)
        {
            $(".newpost").hide();
            $(".right-division").show();
                // console.log(post_id);
                var url1 ='https://jsonplaceholder.typicode.com/posts/';
                var uid = index + 1;
                var url=url1.concat(uid);
                var username ="";
                var mail_id;
                username=getName(index);
                // console.log("function returns");
              // console.log(username);
                $.getJSON( url, function(data) {
                    $(".right-division").html("<p class='author'>Author:" + username + "</p>");
                    $(".right-division").append("<h4 class='ptitle'>" + data.title + "</h4>");
                    $(".right-division").append("<p>" + data.body + "</p>");
                    $(".right-division").append("<p>" + "<b>Comments:</b>" + "</p>");
                    // $(".right-division").append("<p>" + data.title + "</p>");
                 });

                var path="https://jsonplaceholder.typicode.com/comments?postId=";
               var path1=path.concat(post_id);
                // console.log(path1);
                 $.getJSON( path1,function(data){

                    var info_cmt="";
                    info_cmt ="<table>";
                    $.each(data,function(key,value){
                        info_cmt += '<tr>';
                      
                        info_cmt += '<td>' + value.name + ':<br><br>'+ value.body + '</td>';
                        info_cmt += '</tr>';
                        
                    });
                   $(".right-division").append(info_cmt);
                   info_cmt +="</table>";
                 } );
      }
    function getName(index)
    {
        var name="";
        var path= "https://jsonplaceholder.typicode.com/users/";
        index=index+1;
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
         $(".newpost").html("<h4>NewPost</h4>");
         $(".newpost").append("<h5>Title</h5>");
         $(".newpost").append("<input type='text' class='inputField'> </input>");
         $(".newpost").append("<h5>Body</h5>");
        $(".newpost").append("<textarea rows='4' cols='50' class='inputField'> </textarea>");
        $(".newpost").append("<br><br><button class='link-post'>Post</button>");
    }
    