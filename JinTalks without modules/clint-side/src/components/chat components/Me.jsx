import React, {useState} from 'react'
import { Box, makeStyles, Typography, Dialog } from '@material-ui/core';

const useStyle = makeStyles({

  leftTopText:{
    marginLeft:10,
    overflow:"hidden",
    whiteSpace:"nowrap",
    textOverflow:"ellipsis",
    fontSize:20,
    lineHeight:2,
  },
  leftTopImage:{
    borderRadius:10,
    overflow:"hidden",
    width:"100px",
    height:"80px",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  dialog:{
    backgroundColor:"black",
    color:"white",
    display:"flex",
    flexDirection:"column",
    alignItems:"center",
    justifyContent:"center",
    padding:40,
    border:"1px solid white"
  }
});

export default function Me({me}) {

  const classes = useStyle();
  const [dialog, setdialog] = useState(false)

    return (
        <>
        
        <Box className={classes.leftTopImage} onClick={()=>{setdialog(true)}}>
              <img src={me.image} alt="" width="80px" height="80px"/>
            </Box>
            <Box className={classes.leftTopText} onClick={()=>{setdialog(true)}}>
              <Box><Typography className={classes.leftTopText}>{me.name}</Typography></Box>
              <Box><Typography className={classes.leftTopText}>{me.email}</Typography></Box>
            </Box>
            
            
      <Dialog open={dialog} onClose={()=>setdialog(false)}>
        <Box className={classes.dialog}>
        <img
            src={me.image}
            alt=""
            width="300px"
            height="300px"
          />
        <Typography style={{fontWeight:600,fontSize:30}} >{me.name}</Typography>
        <Typography style={{fontWeight:600,fontSize:30}} >{me.email}</Typography>
        </Box>
      </Dialog>
        </>
    )
}
