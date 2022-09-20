<script>
import { ref } from "vue";
export default {
  name: "AddTodo",
  setup(props, context) {
    const todoContent = ref([]);

    const emitAddtodo = () => {
      if (todoContent.value) {
        const todo = {
          id: Date.now(),
          content: todoContent.value.trim(),
          completed: false,
        };
        // console.log(todo);
        context.emit("add-todo", todo);
      }
      todoContent.value = "";
    };

    return {
      todoContent,
      emitAddtodo,
    };
  },
};
</script>

<template>
  <header class="header">
    <h1>我的待办事项</h1>
    <input
      type="text"
      class="add-todo"
      placeholder="今天需要做什么？"
      v-model="todoContent"
      @keyup.enter="emitAddtodo"
    />
    <!-- {{todoContent}} -->
  </header>
</template>

<style>
header h1 {
  width: 100%;
  font-size: 30px;
  color: #414873;
  text-align: center;
  margin-bottom: 10px;
}
header input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 400;
  font-size: 24px;
  color: rgba(0, 0, 0, 0.4);
}
header input::-moz-placeholder {
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}
header input::input-placeholder {
  font-style: italic;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.4);
}

.add-todo {
  padding: 16px 16px 16px 60px;
  height: 65px;
  width: 100%;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
</style>
