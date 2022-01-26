// entrypoint to our server file

// needed to build our server
const express = require('express')
const app = express()
const http = require('http')

// middleware useful to solve issues with socket io
const cors = require('cors')
// use the middleware 
app.use(cors())
// import a class called Server from the socket.io library
const { Server } = require('socket.io')


// create a server wit our express app 
const server = http.createServer(app)

// instantiate the server by creating the io variable (establishing connection), new instance of the Server class we imported 
// we pass in the server we created, add an object which takes in cors as key and specify settings related to cors and socket io server, origin is telling our server which url/server is going to make calls to our socket io server
// == basically, defined what our io server we initiate from where it can expect the calls 

const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		// can also add method and specify types of requests we allow (Post, get etc) -- apparently not necessary
		// methods: ['GET', 'POST'],
		// doc https://socket.io/docs/v3/handling-cors/
	},
})

// when someone connects to the io server
// this is how socket works, based on events emitted (which some events are already built in socket io)
// remaining code for socket io is within this connection given that it should only listen to events when the user is actually connected to the server (actions enacted thru a callback function), (socket) is what is used to specify events and listening events (like id etc), see example from console log 

io.on('connection', (socket) => {
    console.log(`User connected ${socket.id}`)
// also need to listen to disconnect
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id)
    })
})



// define server we like to use and pass a callback function whenever the server actually runs, log
server.listen(3001, () => {
    console.log('server is running')
})
