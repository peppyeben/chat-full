import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

require("dotenv").config();

import "tw-elements";

import "./styles/styles.css";

createApp(App).use(store).use(router).mount("#app");
