import express from "express";
import dotenv from "dotenv";
import Net from "net"
import cors from "cors"
import mongoose from "mongoose";
import { Server } from "socket.io"

dotenv.config();
const app = express();
const agent = new Net.Server();
let _socket = null;
let socket_client = null;

app.use(cors())
app.use(express.json());
app.use(express.static('payload'))
import routes from "./routes/main.js";
app.use(routes)

agent.listen(process.env.PORT_AGENT || 80, function () {
    console.log(`Server listening for connection requests on socket localhost: 80`);
});

agent.on('connection', function (socket) {
    console.log('A new connection has been established.');
    _socket = socket
    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
        console.log(chunk.toString())
        let data = chunk.toString()
        // let command = data.
        if (socket_client) {
            socket_client.emit("command_res", {
                command: _socket.command,
                data
            });
        }
        console.log(`Data received from client: ${chunk.toString()}.`);
    });

    // When the client requests to end the TCP connection with the server, the server
    // ends the connection.
    socket.on('end', function () {
        console.log('Closing connection with the client');
    });

    // Don't forget to catch error, for your own sake.
    socket.on('error', function (err) {
        console.log(`Error: ${err}`);
    });
});
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

const io = new Server(server, { cors: { origin: '*' } });

io.on("connection", (socket) => {
    socket_client = socket
    //for a new user joining the room
    socket.on("joinRoom", ({ username, roomname }) => {

        const p_user = join_User(socket.id, username, roomname);
        console.log(socket.id, "=id");
        socket.join(p_user.room);

        //display a welcome message to the user who have joined a room
        socket.emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `Welcome ${p_user.username}`,
        });

        //displays a joined room message to all other room users except that particular user
        socket.broadcast.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: `${p_user.username} has joined the chat`,
        });
    });

    //user sending message
    socket.on("chat", (text) => {
        //gets the room user and the message sent
        const p_user = get_Current_User(socket.id);

        io.to(p_user.room).emit("message", {
            userId: p_user.id,
            username: p_user.username,
            text: text,
        });
    });

});
// mongoose
//     .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then((result) => {
//         console.log("Database connected");
//         
//     })
//     .catch((err) => {
//         console.log(err);
//     });

export { agent, _socket }