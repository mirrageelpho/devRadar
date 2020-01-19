import socketIo from 'socket.io-client'

const socket = socketIo('http://192.168.0.5:3333', {
    autoConnect: false
})

function subscribeToNewsDevs(subscribeFunction){
    socket.on('new-dev', subscribeFunction)
}

function connect(params){
    socket.io.opts.query = params
    socket.connect()
    socket.on('message', text=>{console.log(text)})
}

function disconnect(){
    if(socket.connected){
        socket.disconnect()
    }
}

export {
    connect,
    disconnect,
    subscribeToNewsDevs
}