const state = {
  loading: false,
  id: null,
  i: 1
};

const getters = {
  loading: state => state.loading,
  id: state => state.id,
  i: state => state.i
};

const actions = {
  deleteTodo({ commit, dispatch, state, rootState, rootGetters }) {
    // console.log(
    //   "Accessing state of one module from another",
    //   rootState.Todos.todos
    // );

    // console.log(
    //   "Getting State of one module from another",
    //   rootGetters["Todos/todos"]
    // );

    // Calling an action of different module from one module
    dispatch("Todos/deleteTodo", state.i, { root: true });
    commit("TODO_DELETING");
    // Calling a mutation of different module from one module

    commit(
      "Todos/say_hello",
      { hello: "Hi fom about component" },
      { root: true }
    );
  }
};

const mutations = {
  TODO_DELETING(state) {
    if (state.i !== 15) {
      state.i = state.i + 1;
    } else {
      state.i = 1;
    }
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
