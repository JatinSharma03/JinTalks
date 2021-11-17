const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require('path')
const moment = require("moment");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const router = express.Router();

const env = require('dotenv').config();

const {
  createRoom,
  joinRoom,
  addProfile,
  addUser,
  getUser,
  romoveUser,
  halfUserRemove,
  usersInRoom,
  getMe,
} = require("./impFunctions");

const PORT = process.env.PORT || 3001;

io.on("connection", (socket) => {
  socket.on("verificationProfile", (demoProfile) => {
    socket.emit(
      "verificationProfileResult",
      addProfile(demoProfile, socket.id)
    );
  });

  socket.on("verificationCreate", (demoRoomIdCreate) => {
    socket.emit(
      "verificationCreateResult",
      createRoom(demoRoomIdCreate, socket.id)
    );
  });

  socket.on("verificationJoin", (demoRoomIdJoin) => {
    socket.emit("verificationJoinResult", joinRoom(demoRoomIdJoin, socket.id));
  });

  socket.on("formalities", ({ account, roomId }) => {
    const user = addUser(account, roomId, socket.id);
    socket.join(user.room);

    socket.emit("message", {
      message: `Welcome ${user.name} in the room ${
        user.room
      } at ${moment().format("h : mm a")}`,
      type: "message",
      forAlertPurpose:false
    });
    socket.broadcast
      .to(user.room)
      .emit("message", {
        message: `${user.name} has joind the room ${
          user.room
        } at ${moment().format("h : mm a")}`,
        type: "message",
        forAlertPurpose:true
      });

    io.to(user.room).emit("roomUsers", usersInRoom(user.room, socket.id));

    socket.emit("myself", getMe(socket.id));
  });

  socket.on("messageSend", (message) => {
    const user = getUser(socket.id);
    socket.emit("message", {
      message,
      user,
      time: moment().format("h : mm a"),
      type: "messageSend",
      image: user.image,
      forAlertPurpose:false
    });
    socket.broadcast
      .to(user.room)
      .emit("message", {
        message,
        user,
        time: moment().format("h : mm a"),
        type: "messageGet",
        image: user.image,
        forAlertPurpose:false
    });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    if (user != undefined) {
      halfInUser = null;
      socket.broadcast
        .to(user.room)
        .emit("message", {
          message: `${user.name} has left the room ${
            user.room
          } at ${moment().format("h : mm a")}`,
          type: "message",
        forAlertPurpose:true
        });
      romoveUser(socket.id);
      io.to(user.room).emit("roomUsers", usersInRoom(user.room, socket.id));
    } else {
      halfUserRemove(socket.id);
    }
  });
});

if(process.env.NODE_ENV === "production"){console.log('x')
  app.use(express.static(path.join("clint-side/build")))
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,'clint-side','build','index.html'))
  });
}

server.listen(PORT, () => {
  console.log("port is running>>>>");
});
