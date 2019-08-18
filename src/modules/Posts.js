import axios from "axios";
import { BaseURL } from "../AppConstants";

const state = {
  posts: [],
  loading: false,
  err: null
};

const getters = {
  loading: state => state.loading,
  posts: state => state.posts,
  err: state => state.err
};

const actions = {
  async getPosts({ commit }) {
    commit("load_posts");
    try {
      let { data } = await axios.get(`${BaseURL}/posts?_limit=15`);
      commit("posts_loaded", data);
    } catch (err) {
      commit("post_err");
    }
  },

  async deletePost({ commit }, id) {
    commit("deleting_post");
    try {
      await axios.delete(`${BaseURL}/posts/${id}`);
      commit("post_deleted", id);
    } catch (err) {
      commit("post_err");
    }
  }
};

const mutations = {
  load_posts(state) {
    state.loading = true;
  },
  posts_loaded(state, data) {
    state.loading = false;
    state.posts = data;
  },
  post_err(state) {
    state.loading = true;
    state.err = "Unable to Load Posts...";
  },
  deleting_post(state) {
    state.loading = true;
  },
  post_deleted(state, id) {
    state.loading = false;
    state.posts = state.posts.filter(post => post.id !== id);
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
};
