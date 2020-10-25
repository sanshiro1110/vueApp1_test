import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


export default new Vuex.Store({
  //state,getters,mutations,actions
  state: {
    year: 0,
    month: 0,
    date: 0,
    category: "食費",
    payment: 0,
    diary: "",
  },
  mutations: {

  }
});
