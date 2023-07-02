import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

import VueWriter from "vue-writer";

import './assets/main.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import axios from 'axios';
axios.defaults.baseURL = 'https://chat-cortex-server.vercel.app/'

const app = createApp(App)

app.use(router);
app.use(Toast, {
  newestOnTop: true,
  position: "top-center",
  transition: "Vue-Toastification__bounce",
  maxToasts: 5,
  timeout: 2000,
  closeOnClick: false,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: false,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: false,
  icon: true,
  rtl: false
});
app.use(VueWriter);

app.mount('#app')
