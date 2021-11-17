import React,{useContext, useState, useEffect} from "react";
import {
  Box,
  Typography,
  Button,
  makeStyles,
  List,
  ListItem,
} from "@material-ui/core";
import { AccountContext } from '../../context/AccountProvider';

import { socket } from '../../socket/Socket';



const useStyles = makeStyles({
  container: {
    width: "70vw",
    height: "70vh",
    position: "absolute",
    top: "20vh",
    left: "15vw",
    backgroundColor: "white",
    zIndex: 20,
    boxShadow: "0 0 20px black",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    ["@media (max-width:620px)"]: {
      padding: "10px",
      width: "80vw",
      height: "60vh",
      position: "absolute",
      top: "20vh",
      left: "8vw",
    },
  },
  leftComponent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    width: "40vw",
    ["@media (max-width:620px)"]: {
      height: "40vh",
      textAlign: "center",
    },
    "& > *": {
      fontSize: 18,
    },
  },
  rightComponent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "35vh",
    ["@media (max-width:620px)"]: {
      height: "10vh",
    },
    "& > *": {
      backgroundColor: "black",
      color: "white",
      fontSize: 20,
      fontWeight: 600,
      padding: "10px 30px",
      boxShadow: "0 0 10px black",
    },
  },
  rightComponentButton: {
    "&:hover": {
      backgroundColor: "white",
      color: "black",
    },
  },
  rightInput:{
      margin:"20px 0",
      width:150,
      backgroundColor:"white",
      color:"black"
  }
});

export default function Entry() {

  const classes = useStyles();
  const {setroomid, setalert,alertTimeout, setalerttimeout } = useContext(AccountContext);
  const [showInputBox, setshowinputbox] = useState(false)

    const createRoomId = ()=>{
        let randomNum = "";
          for(let i = 0; i < 4; i++){
              randomNum += String(Math.floor(Math.random()*4));
          }
          socket.emit('verificationCreate',randomNum);
          socket.on('verificationCreateResult',result=>{
              
              if(result != false){
                setroomid(result);

                setalert()
                clearInterval(alertTimeout)
                setalert({status:"success",heading:"Room Created Successfully",text:`You Successfully created the Room of Id: ${result}`})
                let clear = setTimeout(() => {
                  setalert()
                }, 5000);
                setalerttimeout(clear);
              }
              else{
                  createRoomId();
              }
          })
      }
  
 

  const joinRoomId = (id)=>{
      if(id.length === 4){
        socket.emit('verificationJoin',id);
        socket.on('verificationJoinResult',result=>{

            if(result != false){
                setroomid(result);
                
                setalert()
                clearInterval(alertTimeout)
                setalert({status:"success",heading:"Joined Room Successfully",text:`You Successfully joined the Room of Id: ${result}`})
                let clear = setTimeout(() => {
                  setalert()
                }, 5000);
                setalerttimeout(clear);
              }
              else{
                
                setalert()
                clearInterval(alertTimeout)
                setalert({status:"warning",heading:"Room Not Available",text:`Room of Id ${id} is not Available`})
                let clear = setTimeout(() => {
                  setalert()
                }, 5000);
                setalerttimeout(clear);
              }
        })
      }
  }

  const showInput = ()=>{
    setshowinputbox(true)
    setTimeout(() => {
    const joinInputBoxId = document.getElementById('joinInputBoxId');
    joinInputBoxId.focus();
    }, 500);
  }

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.leftComponent}>
          <Typography style={{ width: "100%", fontSize: 25, padding: 20 }}>
            To Create JinTalks Room in your Computer:
          </Typography>
          <List>
            <ListItem>1. Click on Create Room Button</ListItem>
            <ListItem>2. You will get a Room Id, Share Room Id with your friends and Invite them</ListItem>
           
          </List>
          <Typography style={{ width: "100%", fontSize: 25, padding: 20 }}>
            To Join JinTalks Room in your Computer:
          </Typography>
          <List>
            <ListItem>1. Click on Join Room and Enter Room Id inside the Input Box</ListItem>
            <ListItem>2. You get Enter into Room of Id you Inserted</ListItem>
          
          </List>
        </Box>
        <Box>
          <Box className={classes.rightComponent}>
            <Button className={classes.rightComponentButton} onClick={()=>{createRoomId()}}>
              Create Room
            </Button>
          </Box>
          <Box className={classes.rightComponent}>
              { showInputBox?
              <input type="number" id="joinInputBoxId" placeholder="Room Id..." onChange={(event)=>{ joinRoomId(event.target.value)}} className={classes.rightInput}/>
            :<Button className={classes.rightComponentButton} onClick={()=>{showInput()}}>Join Room</Button>
              }
            </Box>
        </Box>
      </Box>
    </>
  );
}
