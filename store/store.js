import Vue from 'vue';
import Vuex from 'vuex';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    inputData: {
      year: 0,
      month: 0,
      date: 0,
      monthTotal: 0,
      categoryPayments: {
        food: 0,
        daily: 0,
        cosme: 0,
        entertainment: 0,
        transportation: 0,
        others: 0
      }
    }
  },
  mutations: {
    updateInputData(state, inputDate) {
      state.inputData = inputDate;
    },
  },
  actions: {
    getInputData({ commit }, newData) {
      commit('updateInputData', newData);
    }
  }

});
