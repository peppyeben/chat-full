// src/store/plugins/socketPlugin.js
export default (store) => {
    store.dispatch("socket/initSocketListeners");
};
