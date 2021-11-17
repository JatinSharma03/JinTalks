import React, { useContext, useEffect } from "react";
import { AccountContext } from "../context/AccountProvider";
import Me from "./chat components/Me";
import Users from "./chat components/Users";
import TextMessages from "./chat components/TextMessages";
import Send from "./chat components/Send";

import { socket } from "../socket/Socket";
import { Box, makeStyles, Typography, Dialog } from "@material-ui/core";

const useStyle = makeStyles({
  container: {
    display: "flex",
    position: "absolute",
    justifyContent: "space-between",
    top: "20vh",
    left: "2vw",
    width: "96vw",
    height: "75vh",
    zIndex: 20,
  },
  containerLeft: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "25vw",
    height: "75vh",
  },
  containerRight: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "69vw",
    height: "100%",
  },
  leftTop: {
    maxWidth: "25vw",
    height: "16vh",
    backgroundColor: "transparent",
    boxShadow: "10px 10px 20px black",
    borderRadius: 10,
    color: "white",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "space-around",
    padding: 10,
    cursor:"pointer",
  },
  leftBottom: {
    width: "100%",
    boxShadow: "10px 10px 20px black",
    height: "50vh",
    borderRadius: 10,
    backgroundColor: "transparent",
    overflowY: "scroll",
  },
  rightTop: {
    width: "100%",
    boxShadow: "10px 10px 20px black",
    height: "85%",
    borderRadius: 10,
    backgroundColor: "transparent",
    overflowY: "scroll",
    border:"1px solid white",
  },
  rightBottom: {
    width: "100%",
    boxShadow: "10px 10px 20px black",
    borderRadius: 10,
    height: "10%",
    backgroundColor: "transparent",
  },


});

let me = null;

export default function Chat() {
  const { account, roomId,messages,setmessages ,roomUsers, setroomusers ,setalert,alertTimeout, setalerttimeout} = useContext(AccountContext);
  const classes = useStyle();

  useEffect(() => {
    socket.emit("formalities", { account, roomId });

    socket.on("message", (messageData) => {
      setmessages(messages => [...messages,messageData]);
      let forScrollDown = document.getElementById('forScrollDown');
      forScrollDown.scrollTop = forScrollDown.scrollHeight;
      if(messageData.forAlertPurpose == true){
        setalert()
    clearInterval(alertTimeout)
    setalert({status:"info",heading:messageData.message,text:``})
    let clear = setTimeout(() => {
      setalert()
    }, 3000);
    setalerttimeout(clear);
      }
    });

    socket.on('roomUsers',(users)=>{
      setroomusers(users);
    });

    socket.on('myself',(user)=>{
      me = user;
    })

  }, []);

  return (
    <>
      <Box className={classes.container}>

        <Box className={classes.containerLeft}>

          <Box className={classes.leftTop}>
            {me?<Me me={me}/>:null}
          </Box>

          <Box className={classes.leftBottom}>
            {
              roomUsers.map((user)=><Users user={user}/>)
            }
          </Box>
        </Box>

        <Box className={classes.containerRight}>
          <Box className={classes.rightTop} id='forScrollDown'>
            {
              messages.map((data)=><TextMessages message={data.message} type={data.type} user={data.user} time={data.time} image={data.image} forAlertPurpose={data.forAlertPurpose}/>)

            }
          </Box>

          <Box className={classes.rightBottom}>
            <Send/>
          </Box>

        </Box>

      </Box>
    </>
  );
}
