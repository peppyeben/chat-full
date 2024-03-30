import { createStore } from "vuex";

import socketPlugin from "./plugins/socketPlugin";
import socketModule from "./modules/socket";

export default createStore({
    plugins: [socketPlugin],
    state: {
        rooms: null,
    },
    getters: {},
    mutations: {
        SET_ROOMS(state, payload) {
            state.rooms = payload;
        },
    },
    actions: {
        async getRooms({ commit, state, dispatch }) {
            try {
                let requestOptions = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: process.env.VUE_APP_ADMIN_TOKEN,
                    },
                };
                const res = await fetch(
                    `${process.env.VUE_APP_SERVER_URL}/rooms`,
                    requestOptions
                );
                const rooms = await res.json();
                commit("SET_ROOMS", rooms);
                console.log(rooms);
            } catch (error) {
                console.log(error);
            }
        },
    },
    modules: {
        socket: socketModule,
    },
});
