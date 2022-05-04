import express from "express";
import dotenv from "dotenv";
import Net from "net"

dotenv.config();
const app = express();
const agent = new Net.Server();

app.use(express.json());

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${process.env.PORT || 3000}`);
});

agent.listen(80, function () {
    console.log(`Server listening for connection requests on socket localhost: 80`);
});

agent.on('connection', function (socket) {
    console.log('A new connection has been established.');

    // Now that a TCP connection has been established, the server can send data to
    // the client by writing to its socket.
    while (true) {
        let time = 500 + Math.random() * 1000
        setTimeout(() => {
            socket.write('Hello, client.');
        }, time)
    }


    // The server can also receive data from the client by reading from its socket.
    socket.on('data', function (chunk) {
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