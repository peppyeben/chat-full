// src/store/modules/socket.js
import io from "socket.io-client";

const { VUE_APP_SERVER_URL } = process.env;

const socket = io(VUE_APP_SERVER_URL, {
    // transports: ["websocket", "polling", "flashsocket"],
    transports: ["polling", "flashsocket", "websocket"],
});

export default {
    namespaced: true,
    state: {
        messages: [],
    },
    mutations: {
        ADD_MESSAGE(state, message) {
            state.messages.push(message);
        },
    },
    actions: {
        joinRoom({ commit }, roomName) {
            // socket.emit("join-room", { name: roomName, isAdmin: true });
            socket.emit("join-room", { name: roomName });
            console.log("Joined room");
        },
        sendMessage({ commit, state }, { room, message, sender_id }) {
            socket.emit("chat message", { room, message, sender_id });
            console.log(state.messages);
        },
        // Listen to socket events and commit mutations accordingly
        initSocketListeners({ commit }) {
            socket.on("message", (message) => {
                commit("ADD_MESSAGE", message);
                console.log(message);
            });

            socket.on("previous-messages", (message) => {
                if (Array.isArray(message) && message.length > 0) {
                    message.forEach((x) => {
                        commit("ADD_MESSAGE", x);
                    });
                }
                console.log(message);
            });
        },
    },
};
