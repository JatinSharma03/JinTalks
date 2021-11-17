import React from 'react'

import { Box, makeStyles, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

import { socket } from '../../socket/Socket';

const useStyle = makeStyles({

  send:{
    display:"flex",
    alignItems:"center",
    justifyContent:"space-around"
  },
  sendInput:{
    width:"100%",
    margin:7,
    borderRadius:5,
    padding:6,
    fontSize:18,
  },
  sendButton:{
    marginRight:10,
  }
});

export default function Send() {

  const sendMessageFun = ()=>{
    const input = document.getElementById('input');
    socket.emit('messageSend',input.value);
    input.value = '';
    input.focus();
  }

  const classes = useStyle();

    return (
        <>
         <Box className={classes.send}>
              <input className={classes.sendInput} id="input" type="text" placeholder="Type Message here..." onKeyPress={(event)=> event.key == 'Enter'? sendMessageFun():null}/>
              <Button className={classes.sendButton} onClick={()=>sendMessageFun()} variant="outlined" color="primary">
                Send <SendIcon/>
              </Button>
            </Box>
               
        </>
    )
}
