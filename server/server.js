const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./db/index");
const authenticateAdmin = require("./middleware/authenticate-admin");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: { origin: ["http://localhost:8080", "http://localhost:4000"] },
});

const roomSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
});
const Room = mongoose.model("Room", roomSchema);

app.use(cors());

// SERVER-SIDE SOCKET.IO CODE
io.on("connection", async (socket) => {
    await connectDB(process.env.MONGO_URI)
        .then((x) => {
            console.log("Connected to DB");
        })
        .catch((e) => {
            console.log("Error: ", e);
            return;
        });

    console.log(socket.id);
    socket.on("start-connection", (data) => {
        socket.emit("join-room", data.userId);
    });

    socket.on("join-room", async (name) => {
        try {
            let room = await Room.findOne({ name });
            if (!room) {
                room = await Room.create({ name });
            }
            socket.join(name);
            console.log(`${socket.id} joined room: ${name}`);
        } catch (error) {
            console.error("Error joining room:", error);
        }
    });

    socket.on("chat message", (data) => {
        console.log("chat incoming ", data);
        io.to(data.room).emit("message", data);
    });
});

app.get("/rooms", authenticateAdmin, async (req, res) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (error) {
        console.error("Error getting rooms:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});

const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
