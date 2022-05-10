import express from "express";
import dotenv from "dotenv";
import Net from "net"
import cors from "cors"

dotenv.config();
const app = express();
const agent = new Net.Server();
let _socket = null;

app.use(cors())
app.use(express.json());
app.use(express.static('payload'))
import routes from "./routes/main.js";
app.use(routes)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

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
        res.end(chunk.toString())
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

export { agent, _socket }