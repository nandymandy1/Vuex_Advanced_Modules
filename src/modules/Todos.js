import axios from "axios";
import { BaseURL } from "../AppConstants";

const state = {
  todos: [],
  loading: false,
  err: null,
  title: "",
  status: null
};

const getters = {
  loading: state => state.loading,
  todos: state => state.todos,
  err: state => state.err,
  title: state => state.title,
  status: state => state.status
};

const actions = {
  // CREATE
  async addTodo({ commit }, title) {
    commit("adding_todo");
    try {
      let newTodo = {
        title,
        completed: true,
        userId: 100
      };

      let { data } = await axios.post(`${BaseURL}/todos`, newTodo);
      commit("todo_added", data);
      return true;
    } catch (err) {
      commit("todo_err", "Unable to add the todo.");
    }
  },

  // RETRIVE
  async getTodos({ commit }) {
    commit("loading_todos");
    try {
      let { data } = await axios.get(`${BaseURL}/todos?_limit=15`);
      commit("todos_loaded", data);
    } catch (err) {
      commit("todo_err", "unable to fetch the todos");
    }
  },

  // DELETE
  async deleteTodo({ commit }, id) {
    commit("deleting_todo");
    try {
      await axios.delete(`${BaseURL}/todos/${id}`);
      commit("todo_deleted", id);
    } catch (err) {
      commit("todo_err", "Unable to delete the todo.");
    }
  },

  // UPDATE
  async editTodo({ commit }, todo) {
    commit("editing_todo");
    try {
      todo.completed = !todo.completed;
      let { data } = await axios.put(`${BaseURL}/todos/${todo.id}`, todo);
      commit("todo_edited", data);
    } catch (err) {
      commit("todo_err", "Unable to edit the todo.");
    }
  }
};

const mutations = {
  adding_todo(state) {
    state.loading = true;
    state.status = "Adding New Todo...";
  },

  todo_added(state, data) {
    state.loading = false;
    state.title = "";
    state.todos = [data, ...state.todos];
  },

  loading_todos(state) {
    state.loading = true;
    state.status = "Loading Todos...";
  },

  todos_loaded(state, data) {
    state.loading = false;
    state.todos = [...state.todos, ...data];
  },

  todo_err(state, message) {
    state.loading = true;
    state.err = message;
  },

  deleting_todo(state) {
    state.loading = true;
    state.status = "Deleting Todo...";
  },

  todo_deleted(state, id) {
    state.loading = false;
    state.todos = state.todos.filter(todo => todo.id !== id);
  },

  editing_todo(state) {
    state.loading = true;
    state.status = "Deleting Todo...";
  },

  todo_edited(state, data) {
    state.loading = false;
    state.todos = state.todos.map(todo => (todo.id == data.id ? data : todo));
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
};
