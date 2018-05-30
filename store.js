import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  placeAd : [],
  placeAdStep: 0,
  placeAdSelectedCatgStore: {
    title: ''
  }
}

export default new Vuex.Store({
  state,
  mutations: {
    placeAd(state, payload){
        state.placeAd = payload
    },
    placeAdStateChange(state, payload){
      state.placeAdStep = payload
    },
    placeAdSelectedCatg(state, payload){
      state.placeAdSelectedCatgStore = payload
    },
  },
  actions: {

  }
})
