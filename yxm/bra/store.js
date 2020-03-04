import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        login: false,
        token: '',
        avatarUrl: '',
        userName: '',
        is_lyy: false,
        is_jms: false ,
        is_login : false
    },
    mutations: {
        change_lyy: function (state, is_lyy) {
            state.is_lyy = is_lyy;
        },
        change_jms: function (state, is_jms) {
            state.is_jms = is_jms;
        },
        change_login: function (state, is_login) {
            state.is_login = is_login;
        },

    }
});
export default store