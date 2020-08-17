

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const chalk = require("chalk");

const port = process.env.PORT||6500;

var users ={};

app.set("view engine", "ejs");
app.set("views","./views");
app.use(express.static(__dirname+"/public"));


server.listen(port,()=>{
    console.log("App is running on port ",port);
});

io.on("connection",(socket)=>{
    socket.on("nicknametext",(nicknamefromhtml,callback)=>{
        if(nicknamefromhtml in users){
            callback(true);
        }else{
            socket.nickname = nicknamefromhtml;
            users[socket.nickname] = socket;
            console.log(chalk.red("***********"));
            console.log(users[socket.nickname]);
            callback(false);
        }
    });

    socket.on("newmessage",(message)=>{
        if(message!=""){
            io.sockets.emit("mymessagesend",{msg: message, user: socket.nickname});
            console.log("newmessage has been sent");
        }
    });
});

app.get("/",(req,res)=>{
    res.render("homepage");
});