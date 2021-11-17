const users=[];
const rooms=[];
const profiles=[];

const addProfile = (data,socketId)=>{
    const existingProfile = profiles.find((profile)=>profile.email == data.email);

    if(existingProfile){
        return false;
    }
    profiles.push({email:data.email,socketId});
    return data;
}

const createRoom = (id,socketId)=>{
    const existingRoom = rooms.find((room)=>room.room == id);

    if(existingRoom){
        return false;
    }
    rooms.push({room:id,socketId});
    return id;
}

const joinRoom = (id,socketId)=>{
    const existingRoom = rooms.find((room)=>room.room == id);

    if(existingRoom){
        rooms.push({room:id,socketId});
        return id;
    }
    return false;
}

const addUser = (account,roomId,socketId)=>{
    const user = {name:account.name, email:account.email, image:account.imageUrl, id:account.googleId, room:roomId,socketId  }
    users.push(user);
    return user;
}

const getUser = (id)=>{
    const user = users.find((user)=>user.socketId == id)
    return user;
}

const romoveUser = (id)=>{
        const indexEmail = profiles.findIndex((profile)=>profile.socketId == id);
        if(indexEmail != -1){
            profiles.splice(indexEmail,1);
        }

        const indexUser = users.findIndex((user)=>user.socketId == id);
        if(indexUser != -1){
            users.splice(indexUser,1);
        }

        const indexRoom = rooms.findIndex((room)=>room.socketId == id);
        if(indexRoom != -1){
            rooms.splice(indexRoom,1);
        }

}

const halfUserRemove = (id)=>{
    const indexHalfUser = profiles.findIndex((profile)=>profile.socketId == id);
        if(indexHalfUser != -1){
            profiles.splice(indexHalfUser,1);
        }
}

const usersInRoom = (room,id)=>{
    const roomUsers = users.filter((user)=>user.room == room);
    return roomUsers;
}

const getMe = (id)=>{
    return users.find((user)=>user.socketId == id);
}

module.exports = {createRoom,joinRoom,addProfile,addUser,getUser,romoveUser,halfUserRemove,usersInRoom,getMe};