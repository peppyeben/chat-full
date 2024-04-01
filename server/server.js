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
    cors: {
        origin: "*",
    },
});

const roomSchema = new mongoose.Schema({
    name: String,
    email: String,
    createdAt: { type: Date, default: Date.now },
});

const messageSchema = new mongoose.Schema({
    room: String,
    message: String,
    sender_id: String,
    createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);
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
        socket.emit("join-room", { name: data.userId });
    });

    socket.on("join-room", async ({ name, isAdmin = null }) => {
        try {
            let room = await Room.findOne({ name });
            if (!room) {
                room = await Room.create({ name });
            }
            socket.join(name);
            console.log(`${socket.id} joined room: ${name}`);

            const previousMessages = await Message.find({ room: name })
                .sort({ createdAt: 1 })
                .lean();
            console.log("PREV MESSAGES: ", previousMessages);

            io.to(socket.id).emit("previous-messages", previousMessages);
            // if (isAdmin) {
            //     console.log(" ADMIN YAYY");
            // }
        } catch (error) {
            console.error("Error joining room:", error);
        }
    });

    socket.on("chat message", async (data) => {
        try {
            const message = new Message({
                room: data.room,
                message: data.message,
                sender_id: data.sender_id,
            });
            console.log("chat incoming ", data);
            await message.save();
            io.to(data.room).emit("message", data);
        } catch (error) {
            console.error("Error saving message:", error);
        }
        // io.to(data.room).emit("message", data);
    });

    socket.on("leaveRoom", (roomName) => {
        socket.leave(roomName);
        console.log(`User left room: ${roomName}`);
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

// const PORT = process.env.PORT || 80;

// server.listen(PORT, () => {
server.listen(() => {
    console.log(`Server is running`);
    // console.log(`Server is running on port ${PORT}`);
});
