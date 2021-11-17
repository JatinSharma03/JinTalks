import React,{useState} from "react";

import { Box, makeStyles, Typography , Dialog} from "@material-ui/core";

const useStyle = makeStyles({
  leftBottomBox: {
    display: "flex",
    alignItems: "center",
    padding: 10,
    margin: "10px 0",
    cursor: "pointer",
  },
  leftBottomImage: {
    borderRadius: 10,
    overflow: "hidden",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  leftBottomText: {
    fontSize: 20,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
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

export default function Users({user}) {
  const classes = useStyle();

  const [dialog, setdialog] = useState(false)

  return (
    <><Box className={classes.leftBottomBox} onClick={()=>{setdialog(true)}}>
        <Box className={classes.leftBottomImage}>
          <img
            src={user.image}
            alt=""
            width="50px"
            height="50px"
          />
        </Box>
        <Typography className={classes.leftBottomText}>{user.name}</Typography>
      </Box>

      <Dialog open={dialog} onClose={()=>setdialog(false)}>
        <Box className={classes.dialog}>
        <img
            src={user.image}
            alt=""
            width="300px"
            height="300px"
          />
        <Typography style={{fontWeight:600,fontSize:30}} >{user.name}</Typography>
        <Typography style={{fontWeight:600,fontSize:30}} >{user.email}</Typography>
        </Box>
      </Dialog>
    </>
  );
}
