// src/store/modules/socket.js
import io from "socket.io-client";

const socket = io(process.env.VUE_APP_SERVER_URL);

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
            socket.emit("join-room", roomName);
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
        },
    },
};
