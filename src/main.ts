import { createApp } from 'vue';
import App from './App.vue';
import { store, key } from './store';
import './styles/core/fonts.scss';

// Note: Passed loadDuration to allow for spinner to appear during browser access for a nicer visual, but not during testing (would require awaiting each test for the spinner to end)
createApp(App, { loadDuration: 2000 }).use(store, key).mount('#app');
