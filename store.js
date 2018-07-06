import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
  placeAd : [],
  placeAdStep: 0,
  placeAdSelectedCatgStore: {
    title: ''
  },
  placeAdSelectedCatgListViewShow: [],
  openService: false,
  serviceStep: 0, // will be 1, 2, 3
  serviceModalParentId: 0,
  serviceSelectedStep: []
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
    placeAdSelectedCatgListView(state, payload){
      state.placeAdSelectedCatgListViewShow = payload
    },
    isOpenService(state, payload){
      state.openService = payload
    },
    serviceStepper(state, payload){
      state.serviceStep = payload
    },
    changeServiceSelectedStep(state, payload){
      state.serviceSelectedStep = payload
    }
  },
  actions: {

  }
})
