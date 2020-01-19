const socketIo = require('socket.io');

const parseStringToArray = require('./utils/parseStringToArray')
const getDistanceFromLatLonInKm = require('./utils/cauculoDedistancia')
const dataBaseConnections = []

let io;

exports.config_socker = (server)=> {
    io = socketIo(server)

    io.on('connection', (socket) => {
        console.log(socket.id)
        const { latitude, longitude, techs } = socket.handshake.query

        setTimeout(()=>{
            socket.emit('message', 'Hello OmniStack')
        }, 3000)

        dataBaseConnections.push({
            id: socket.id,
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude)
            },
            techs: parseStringToArray(techs)
        })

    })
}

exports.finUsersOnSockectConnection = (coordinates, techs) =>{
    return dataBaseConnections.filter(connection => {
        return getDistanceFromLatLonInKm(coordinates, connection.coordinates) < 10 && connection.techs.some(item => techs.includes(item))
    })

}

exports.sendMessageTo = (to, message, data) => {
    to.forEach(connection => {
        io.to(connection.id).emit(message, data)
    });
}
