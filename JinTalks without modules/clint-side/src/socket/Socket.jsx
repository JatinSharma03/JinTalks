import React from 'react'

import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:3001/';

export const socket = io(ENDPOINT, { transports : ['websocket'] });
export let socketID = '';


socket.on('connect', () => {
    socketID = socket.id
})
