import { createStore } from 'vuex';

export const ADD_TODO = '@todos/ADD_TODO';
export const UPDATE_TODO = '@todos/UPDATE_TODO';
export const CLOSE_TODO = '@todos/CLOSE_TODO';
export const CHANGE_TEXT = '@todos/CHANGE_TEXT';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface State {
  text: string;
  todos: Todo[];
}

export default createStore<State>({
  state: {
    text: '',
    todos: [],
  },
  mutations: {
    [CHANGE_TEXT](state, { text }) {
      state.text = text;
    },
    [UPDATE_TODO](state, { todos }) {
      state.todos = todos;
    },
  },
  actions: {
    [ADD_TODO]({ state, commit }, todo: Todo) {
      const todos = [...state.todos, todo];
      commit(UPDATE_TODO, { todos });
    },
    [CLOSE_TODO]({ state, commit }, todo: Todo) {
      console.log('here');
    },
  },
  getters: {
    todosWithout: ({ todos }) => (todo: Todo): Todo[] => todos
      .filter((current) => current.id !== todo.id),
    findTodoByText: ({ todos, text }) => () => !!todos.find((current) => current.text === text),
  },
  modules: {
  },
});
