import { createApp } from 'vue'
import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
import App from './App.vue';
import store from './store';

createApp(App).use(store).use(VueSvgInlinePlugin).mount('#app');
