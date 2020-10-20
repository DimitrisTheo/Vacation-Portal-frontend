import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from "./router";
import { store} from "@/store";
import axios from 'axios';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import * as VeeValidate from 'vee-validate';
import moment from 'moment';

import {
  faHome,
  faUser,
  faUserPlus,
  faSignInAlt,
  faSignOutAlt,
  faEdit,
  faInfoCircle,
  faTrashAlt,
  faPlusSquare,
  faEnvelope,
  faSave,
  faCheck,
  faExclamation,
  faCog
} from '@fortawesome/free-solid-svg-icons';

library.add(
    faHome,
    faUser,
    faUserPlus,
    faSignInAlt,
    faSignOutAlt,
    faEdit,
    faInfoCircle,
    faTrashAlt,
    faPlusSquare,
    faEnvelope,
    faSave,
    faCheck,
    faExclamation,
    faCog
);

Vue.config.productionTip = false
Vue.prototype.moment = moment;

Vue.prototype.$http = axios

Vue.component('App', require('./App.vue') );
Vue.use(VeeValidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
