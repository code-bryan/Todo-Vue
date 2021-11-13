<template>
  <div class="home">
    <h3>To do List</h3>
    <div>
      <label>
        <input
          class="input"
          type="text"
          v-model="text"
          placeholder="Type a new to do"
          @keyup.enter="addTodo"
        />
        <button @click="addTodo">Add Todo</button></label>
    </div>

    <br/>
    <div class="todos" v-if="todos.length > 0">
      <div class="todo" v-for="todo in todos.sort((a, b) => a.id - b.id)" :key="todo.id">
        <h5 @click="completeTodo(todo)" :class="todo.completed ? 'underline' : ''">
          {{ todo.id }} - {{ todo.text }}
        </h5>
        <h5 class="close" @click="close(todo)">X</h5>
      </div>
    </div>
    <h5 v-else>No todos</h5>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ADD_TODO, CHANGE_TEXT, Todo } from '@/store';

export default defineComponent({
  name: 'Home',
  methods: {
    addTodo() {
      const { todos, text } = this.$store.state;

      if (text.length <= 0 || this.$store.getters.findTodoByText()) return;

      const todo: Todo = { id: todos.length + 1, text, completed: false };
      this.$store.dispatch(ADD_TODO, todo);
      this.$store.commit(CHANGE_TEXT, { text: '' });
    },
    close() {
      console.log('test');
    },
  },
  created() {
    console.log(this.$store.state.text);
  },
  computed: {
    text: {
      get() {
        return this.$store.state.text;
      },
      set(text: string) {
        this.$store.commit(CHANGE_TEXT, { text });
      },
    },
    todos() {
      return this.$store.state.todos;
    },
  },
});
</script>

<style scoped>
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  h3 {
    align-self: center;
  }

  .input {
    padding: 4px 6px;
    border: 2px solid #3D3D3D;
    border-radius: 2.5px;
    outline: none;
    margin: 0 2px;
  }

  button {
    padding: 6px 15px;
    margin: 0 2px;
    background: #3D3D3D;
    color: #FFFFFF;
    outline: none;
    border-radius: 2.5px;
    border-width: 0;
  }

  .todo {
    display: flex;
    flex-direction: row;
  }

  .todos {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  .close {
    cursor: pointer;
    color: red;
  }

  h5 {
    margin: 0.5rem;
    word-break: break-all;
    text-align: justify;
  }

  .underline {
    text-decoration: line-through;
  }
</style>
