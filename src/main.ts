import { createApp } from 'vue'
import VueSvgInlinePlugin from 'vue-svg-inline-plugin';
import App from './App.vue';
import { store, key } from './store';

createApp(App).use(store, key).use(VueSvgInlinePlugin).mount('#app');
