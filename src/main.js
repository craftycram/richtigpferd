import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import i18n from '@/plugins/i18n';

const app = createApp(App);

app.use(router).use(i18n).mount('#app');
