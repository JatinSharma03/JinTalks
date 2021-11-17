import React,{useContext} from 'react';

import { makeStyles, Box, Typography, List, ListItem, Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { AccountContext } from '../../context/AccountProvider';

import { socket } from '../../socket/Socket';

const useStyles = makeStyles({
    container:{
        width:"70vw",
        height:"70vh",
        position: 'absolute',
        top:"20vh",
        left:"15vw",
        backgroundColor:"white",
        zIndex:20,
        boxShadow:"0 0 20px black",
        display:"flex",
        justifyContent:"space-around",
        flexWrap:"wrap",
        ['@media (max-width:620px)']:{
            padding:"10px",
            width:"80vw",
            height:"60vh",
            position: 'absolute',
            top:"20vh",
            left:"8vw",
        }
    },
    leftComponent:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        height:"50vh",
        ['@media (max-width:620px)']:{
            height:"40vh",
            textAlign:"center",
        },
        "& > *":{
            fontSize:20,
        }
    },
    rightComponent:{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"50vh",
        ['@media (max-width:620px)']:{
            height:"10vh",
        },
        "& > *":{
            backgroundColor:"black",
            color:"white",
            fontSize:20,
            fontWeight:600,
            padding:"10px 30px",
            boxShadow:"0 0 10px black",
        },
    },
    rightComponentButton:{
        "&:hover":{
            backgroundColor:"white",
            color:"black",
        }
    }
})

export default function Login() {

    const classes = useStyles();
    const clintId = '886494164586-c8g32taobbk671mb6ue10nljhrevfj0h.apps.googleusercontent.com';

    const { setaccount, setalert,alertTimeout, setalerttimeout} = useContext(AccountContext)

    const onLoginSuccess = (res)=>{
        socket.emit('verificationProfile',res.profileObj);
        socket.on('verificationProfileResult',result=>{
            if(result != false){
                setaccount(result);

                setalert()
                clearInterval(alertTimeout)
                setalert({status:"success",heading:"Successful Login",text:`You are SUCCESSFULLY Login in JinTalks with Email Id ${res.profileObj.email}`})
                let clear = setTimeout(() => {
                  setalert()
                }, 8000);
                setalerttimeout(clear);
            }
            else{
                setaccount(result);

                setalert()
                clearInterval(alertTimeout)
                setalert({status:"error",heading:"Login Failed",text:`You are already logged in with this Email Id ${res.profileObj.email}`})
                let clear = setTimeout(() => {
                  setalert()
                }, 8000);
                setalerttimeout(clear);
            }
        })

    }

    const onLoginFail = ()=>{
        
        setalert()
        clearInterval(alertTimeout)
        setalert({status:"error",heading:"Login Failed",text:`Loging has Failed, Please try again`})
        let clear = setTimeout(() => {
          setalert()
        }, 8000);
        setalerttimeout(clear);
    }

    return (
        <>
        <Box className={classes.container}>
            <Box className={classes.leftComponent}>
                <Typography style={{width:"100%", fontSize:30, padding:20}}>
                    To use JinTalks in your Computer:
                </Typography>
                <List>
                    <ListItem>
                        1. Click on Login Button on your Right
                    </ListItem>
                    <ListItem>
                        2. Login with Email Id
                    </ListItem>
                    <ListItem>
                        3. Join or Create Room
                    </ListItem>
                    <ListItem>
                        4. Enjoy Room Chat with Friends 
                    </ListItem>
                </List>
            </Box>
            <Box className={classes.rightComponent}>
                
                <GoogleLogin
                clientId={clintId}
                buttonText=""
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                onSuccess={onLoginSuccess}
                onFailure={onLoginFail}
                render={renderProps => (
                    <Button className={classes.rightComponentButton} onClick={renderProps.onClick}>Login</Button>
                  )}
                />
            </Box>
        </Box> 
        </>
    )
}


// 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
// clint secret