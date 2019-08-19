<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button class="btn btn-primary" @click="deleteTodo">Delete</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
    ...mapActions({
      deleteTodo: "Act/deleteTodo"
    })
  }
};
</script>