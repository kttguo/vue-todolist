<template>
  <section class="todoapp">
    <div id="container">
      <add-todo @add-todo="addTodo"  />
      <filter-todo :selected="filter" @change-filter="filter = $event" />
      <todo-list
        :ftodos="filterTodo"
        @delete-todo="removeTodo"
        @changeall-state="completedALL"
      />
      <todo-footer :remaining="filterTodo.length"></todo-footer>
    </div>
    
  </section>
</template>

<script>
import { ref,computed } from "vue";
import AddTodo from "./components/AddTodo.vue";
import FilterTodo from "./components/FilterTodo.vue";
import TodoList from "./components/TodoList.vue";
import TodoFooter from "./components/Footer.vue";
import useTodos from '@/composables/useTodos.js'
// export const todos = reactive([]);
export default {
  name: "App",
  components: {
    AddTodo,
    FilterTodo,
    TodoList,
    TodoFooter,
  },
  setup() {
    const {todos}=useTodos();
    
    const addTodo = (todo) => todos.value.push(todo);
    const removeTodo=(todo)=>todos.value.splice(todos.value.indexOf(todo), 1);
    const completedALL=(event)=>todos.value.forEach((todo)=>todo.completed=event.target.checked)
    const filter=ref("all");
    const filterTodo=computed(()=>{
      switch(filter.value){
        case "done":
          return todos.value.filter((t)=>t.completed);
        case "todo":
          return todos.value.filter((t)=>!t.completed);
        default:
          return todos.value;
      }
    });
    return {
      todos,
      addTodo,
      filter,
      filterTodo,
      removeTodo,
      completedALL
    };
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Helvetica, "PingFang SC", "Microsoft Yahei", sans-serif;
}

.todoapp {
  background: rgba(203, 210, 240, 0.5);
  width: 100vm;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

#container {
  width: 60%;
  max-width: 400px;
  box-shadow: 0px 0px 24px rgba(0, 0, 0, 0.15);
  border-radius: 24px;
  padding: 48px 28px;
  background-color: rgb(245, 246, 252);
  position: relative;
}
.hidden {
  display: none;
}

@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .toggle-all,
  .todolist li .toggle {
    background: none;
  }

  .todolist li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filter {
    bottom: 10px;
  }
}
</style>
