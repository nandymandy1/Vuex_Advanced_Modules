import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Posts from "./modules/Posts";
import Todos from "./modules/Todos";

export default new Vuex.Store({
  modules: {
    Posts,
    Todos
  },
  state: {},
  mutations: {},
  actions: {}
});
