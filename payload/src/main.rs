use std::net::{TcpStream};
use std::io::{Read, Write};
use std::str::from_utf8;

fn main() {
    match TcpStream::connect("127.0.0.1:80") {
        Ok(mut stream) => {
            println!("Successfully connected to server in port 80");

            let msg = b"Hello!";

            stream.write(msg).unwrap();
            println!("Sent Hello, awaiting reply...");

            let mut data = [0; 1024]; // using 6 byte buffer
            match stream.read(&mut data) {
                Ok(_) => {
                    let text = from_utf8(&data).unwrap();
                    println!("Reply: {}", text)
                },
                Err(e) => {
                    println!("Failed to receive data: {}", e);
                }
            }
        },
        Err(e) => {
            println!("Failed to connect: {}", e);
        }
    }
    println!("Terminated.");
}