$(document).ready(()=>{

    const socket = io.connect();
    $("#homepage").show();
    $("#messagepage").hide();
    var enterednickname = $("#nicknametext");
    var invalidnickname = $("#invalidnickname");
    var newmessage = $("#messagetext");
    var messagebox = $("#messagebox");
    var chatOuter = $("#entirechat");
    var title;


    $("#mynickname").submit((event)=>{
        event.preventDefault();
        console.log("nickname is ");
        console.log(enterednickname.val());
        console.log("My Nickname Submit");
        socket.emit("nicknametext",enterednickname.val(),(flag,nicknameofuser)=>{
            console.log("Socket emit function");
            if(flag){
                invalidnickname.html("<i style='color:red;'>Nickname is already taken</i>");
            }
            else{
                $("#homepage").hide();
                $("#messagepage").show();
                title = enterednickname.val();
                document.title = title;
            }
        });

    });

    $("#messagetext").keydown((e)=>{
        if(e.keyCode ==13){
            $("#mymessageform").submit();
            return false;
        }
    })

    $("#mymessageform").submit((event)=>{
        event.preventDefault();
        socket.emit("newmessage",newmessage.val());
        newmessage.val("");
    });

    socket.on("mymessagesend",(data)=>{
        if(title == data.user){
            messagebox.append("<table><tr><td style='width:50%;'></td><td style='width: 50%; background-color:violet; border-radius: 15px; padding:15px; align: right'><b>You: </b>"+data.msg+"</td></tr></table></br>");
        }
        else{
            messagebox.append("<table><tr><td style='width: 50%; background-color:violet; border-radius: 15px; padding:15px; align: left'><b>"+data.user+": </b>"+data.msg+"</td style='width:50%;'><td></td></tr></table></br>");
        }
        scrollCorrect();
    });

    function scrollCorrect(){
        chatOuter.scrollTop(messagebox.outerHeight());
    }



});