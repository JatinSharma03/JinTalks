import React,{useContext} from "react";
import { Box, makeStyles, Typography } from "@material-ui/core";

const useStyle = makeStyles({
  getMessage: {
    display: "flex",
    alignItems: "center",
    maxWidth: "50vw",
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    boxShadow: "0 0 10px black",
  },
  getMessageText: {
    maxWidth: "40vw",
    display: "flex",
    flexDirection: "column",
    paddingLeft: 10,
  },
  getMessageTextData: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  getMessageTextChat: {
    maxWidth: "50vw",
    "&>*": {
      fonSize: 15,
    },
  },

  sendMessage: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "50vw",
    margin: 10,
    backgroundColor: "black",
    color: "white",
    borderRadius: 10,
    padding: 5,
    boxShadow: "0 0 10px white",
  },

  formalities: {
    fontSize: 15,
    color: "rgb(120,120,120)",
    margin:5
  },
});
export default function TextMessages({ message, type, user,time,image }) {

  const classes = useStyle();
  
  

  return (
    <>
    {/* {
      (forAlertPurpose)?callAlert(message):null
    } */}
      {type == "message" ? (
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Typography className={classes.formalities}>{message}</Typography>
        </Box>
      ) : type == "messageSend" ? (
        <Box style={{ display: "flex", justifyContent: "flex-end" }}>
          <Box className={classes.sendMessage}>
            <Box>
              <Typography style={{ fontSize: 13, color: "rgb(182,182,182)" }}>
                {time}
              </Typography>
            </Box>
            <Box>
              <Typography style={{ fontSize: 15,overflowWrap: "break-word", }}>
                {message}
              </Typography>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box style={{ display: "flex", justifyContent: "flex-start" }}>
          <Box className={classes.getMessage}>
            <img
              src={image}
              alt=""
              width="30px"
              height="30px"
            />
            <Box className={classes.getMessageText}>
              <Box className={classes.getMessageTextData}>
                <Typography
                  style={{ fontSize: 15, color: "rgb(120, 120, 120)" }}
                >
                  {user.name}
                </Typography>
                <Typography
                  style={{ fontSize: 13, color: "rgb(120, 120, 120)", marginLeft:10 }}
                >
                  {time}
                </Typography>
              </Box>
              <Box className={classes.getMessageTextChat}>
                <Typography style={{overflowWrap: "break-word", }}>
                  {message}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
