import {React, createContext, useState} from 'react';

export const AccountContext = createContext(null);


export default function AccountProvider({children}) {

    const [account, setaccount] = useState()
    const [roomId, setroomid] = useState()
    const [sound, setsound] = useState(true)
    const [alert, setalert] = useState()
    const [alertTimeout, setalerttimeout] = useState()

    const [messages, setmessages] = useState([])
    const [roomUsers, setroomusers] = useState([])
    
    return (
        <>
            <AccountContext.Provider
            value={{
                account,
                setaccount,
                
                roomId,
                setroomid,

                sound,
                setsound,

                alert,
                setalert,
                
                alertTimeout,
                setalerttimeout,

                messages,
                setmessages,

                roomUsers,
                 setroomusers
            }}
            >
                {children}
            </AccountContext.Provider>
        </>
    )
}
