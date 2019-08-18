<template>
  <div class="container home">
    <div class="row">
      <div class="col-md-8 mx-auto">
        <h1>Todos</h1>
        <div class="card mb-3">
          <div class="card-header">
            <h4>Add Todo</h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="addNewTodo()">
              <div class="from-group">
                <label for="title">Todo Title</label>
                <input type="text" class="form-control" placeholder="New Todo" v-model="title" />
              </div>
              <input type="submit" class="btn btn-block btn-success mt-3" value="Add" />
            </form>
          </div>
        </div>
        <ul class="list-group" v-if="(!todoLoading && !todoErr) && todos.length">
          <li
            class="list-group-item mt-2"
            v-for="todo in todos"
            :key="todo.id"
            @dblclick="deleteTodo(todo.id)"
            :style="{ backgroundColor: todo.completed ? '#2ECC71' : '#E74C3C', color: '#fff' }"
          >{{ todo.title }}</li>
        </ul>
        <div v-else-if="todoLoading && !todoErr">
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <br />
          {{ todoStatus }}
        </div>
        <div v-else>Todo list is empty...</div>
      </div>
      <!--
      <div class="col-md-6">
        <h1>Posts</h1>
        <ul class="list-group" v-if="!postLoading && !postErr">
          <li
            class="list-group-item mt-2"
            v-for="post in posts"
            :key="post.id"
            @dblclick="deletePost(post.id)"
          >{{ post.title }}</li>
        </ul>
        <div class="spinner-border text-success" role="status" v-else-if="postLoading && !postErr">
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>Unable to load the posts...</div>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "home",
  data() {
    return {
      title: ""
    };
  },
  computed: {
    ...mapGetters({
      todoErr: "Todos/err",
      todos: "Todos/todos",
      todoStatus: "Todos/status",
      todoLoading: "Todos/loading",
      postErr: "Posts/err",
      posts: "Posts/posts",
      postLoading: "Posts/loading"
    })
  },
  methods: {
    ...mapActions({
      addTodo: "Todos/addTodo",
      loadTodos: "Todos/getTodos",
      editTodo: "Todos/editTodo",
      deleteTodo: "Todos/deleteTodo",
      loadPosts: "Posts/getPosts",
      deletePost: "Posts/deletePost"
    }),
    
    addNewTodo() {
      if (this.addTodo(this.title)) {
        this.title = "";
      }
    }
  },
  created() {
    if (this.todos.length == 0) {
      this.loadTodos();
    }
    if (this.posts.length == 0) {
      this.loadPosts();
    }
  }
  // watch: {
  //   todos(nextProp, prevProp) {
  //     console.log("TODO Next State ", nextProp);
  //     console.log("TODO Previous State ", prevProp);
  //   },

  //   posts(nextProp, prevProp) {
  //     console.log("POST Next State ", nextProp);
  //     console.log("POST Previous State ", prevProp);
  //   }
  // }
};
</script>
<style scoped>
.list-group-item {
  border-radius: 0;
  border-width: 0;
  border-color: #fff;
  cursor: pointer;
  font-weight: 500;
}
.card {
  border-radius: 0;
  border-width: 0;
  border-color: none;
}
.card-header {
  background-color: #27ae60;
  border-radius: 0;
  color: #fff;
  border-width: 0;
  border-color: none;
  font-weight: 800;
}
.btn {
  border-radius: 0;
}
.form-control {
  border-radius: 0;
}
</style>
<!-- @click="editTodo(todo)" -->
          <!-- @dblclick="deleteTodo(todo.id)" -->