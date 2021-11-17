import React, { useContext, useState } from "react";
import Login from "./account/Login";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import VolumeUpIcon from "@material-ui/icons/VolumeUp";
import VolumeOffIcon from "@material-ui/icons/VolumeOff";
import { Alert, AlertTitle } from "@material-ui/lab";

import AlertSound from './sound/alert.mp3'
import {
  AppBar,
  Box,
  Toolbar,
  makeStyles,
  Typography,
  Button,
} from "@material-ui/core";
import { AccountContext } from "../context/AccountProvider";
import Entry from "./account/Entry";
import Chat from "./Chat";

const useStyle = makeStyles({
  container: {
    backgroundColor: "#000000",
    height: "40vh",
    zIndex: 10,
  },
  text: {
    fontWeight: 600,
    fontSize: 40,
    padding: 30,
    fontFamily: "'Architects Daughter', cursive",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  icon: {
    fontSize: 50,
    marginLeft: 10,
  },
  subCcontainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  button: {
    paddingRight: 30,
    fontSize: 40,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
  alert: {
    marginRight: 20,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default function Messanger() {
  const classes = useStyle();
  const {
    account,
    roomId,
    sound,
    setsound,
    alert,
    setalert,
    alertTimeout,
    setalerttimeout,
  } = useContext(AccountContext);

  const soundFun = () => {
    sound ? setsound(false) : setsound(true);

    setalert();
    clearInterval(alertTimeout);
    setalert({
      status: "info",
      heading: "Sound Status",
      text: !sound ? "Sound is turned ON" : "Sound is turned OFF",
    });
    let clear = setTimeout(() => {
      setalert();
    }, 3000);
    setalerttimeout(clear);
  };

  return (
    <>
      <Box>
        <AppBar className={classes.container}>
          <Toolbar className={classes.subCcontainer}>
            <Typography component="h2" className={classes.text}>
              <Box style={{ display: "flex", alignItems: "center" }}>
                JinTalks
                <WhatsAppIcon className={classes.icon} />
              </Box>
              <Box style={{ fontSize: 30 }}>
                {roomId ? `Room Id: ${roomId}` : ""}
              </Box>
            </Typography>

            <Typography className={classes.button}>
              {alert ? (
                <Alert severity={alert.status} className={classes.alert}>
                  <AlertTitle style={{ fontSize: 20 }}>
                    {alert.heading}
                  </AlertTitle>
                  This is an {alert.status} alert —{" "}
                  <strong>{alert.text}</strong>
                </Alert>
              ) : null}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                {account ? (
                  <Button
                    variant="contained"
                    
                    style={{ marginBottom: 10 }}
                  >
                    <a href="/" style={{textDecoration:"none", color:"black"}}> Logout </a>
                  </Button>
                ) : null}
                {/* <Box onClick={() => soundFun()}>
                {sound ? <VolumeUpIcon  /> : <VolumeOffIcon />}
                </Box> */}
              </Box>
            </Typography>
          </Toolbar>
        </AppBar>
        {roomId ? <Chat /> : account ? <Entry /> : <Login />}
      </Box>
    </>
  );
}
