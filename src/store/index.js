import Vue from 'vue';
import Vuex from 'vuex';
//general
import { auth } from './auth.module';
Vue.use(Vuex);

export const store = new Vuex.Store({
    modules: {
        auth
    }
});