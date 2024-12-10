import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./index.css"
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

library.add(faShoppingCart);
createApp(App).use(router).mount('#app')
App.component('font-awesome-icon', FontAwesomeIcon);