<script>
// import TodoItem from "./TodoItem.vue";
import { ref } from "vue";
export default {
  name: "TodoList",
  // components: {
  //   TodoItem,
  // },
  props: {
    ftodos: [],
  },
  setup(props, ctx) {
    const deletetodo = (todo) => {
      ctx.emit("delete-todo", todo);
    };
    let editedtodo = ref("");

    let beforeEditCache = "";
    function editTodo(todo) {
      beforeEditCache = todo.title;
      editedtodo.value = todo;
    }
    
    function cancelEdit(todo){
      editedtodo.value=null;
      todo.content=beforeEditCache;
 
    }
    function doneEdit(todo) {
      if (editedtodo.value) {
        editedtodo.value = null;
        todo.content = todo.content.trim();
        if (!todo.content) deletetodo(todo);
      }
    }
    return { deletetodo, editedtodo, editTodo, doneEdit,cancelEdit };
  },
};
</script>
<template>
  <section class="main">
    <input
      type="checkbox"
      id="toggle-all"
      class="toggle-all"
      @change="$emit('changeall-state', $event)"
    />
    <label for="toggle-all">完成所有的待办事项</label>

    <ul class="todo-list">
      <li
        v-for="todo in ftodos"
        :key="todo.id"
        :class="{ completed: todo.completed, editing: todo === editedtodo }"
      >
        <div class="view">
          <input
            type="checkbox"
            class="toggle"
            @click="todo.completed = $event.target.checked"
            :checked="todo.completed"
          />
          <label @dblclick="editTodo(todo)">{{ todo.content }} </label>
          <button class="destroy" @click="deletetodo(todo)">x</button>
        </div>

        <input
          type="text"
          class="edit"
          v-if="todo === editedtodo"
          v-model="todo.content"
          @vnode-mounted="({ el }) => el.focus()"
          @blur="doneEdit(todo)"
          @keyup.enter="doneEdit(todo)"
          @keyup.escape="cancelEdit(todo)"
        />
      </li>
    </ul>
  </section>
</template>

<style>
.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%; /* 靠在屏幕最左边 */
  bottom: 100%;
}
/* 紧邻随后兄弟选择器，选择紧邻在。toggle-all元素后面的label元素 */
.toggle-all + label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 65px;
  font-size: 0;
  position: absolute;
  top: -118px;
  left: -0;
}
.toggle-all + label:before {
  content: "❯"; /* 在label之前添加content内容 */
  display: inline-block; /* 允许元素设置宽和高 */
  font-size: 22px;
  color: #949494;
  padding: 10px 27px 10px 27px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.toggle-all:checked + label:before {
  color: #484848;
}
.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: calc(100% - 43px);
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  /*
		Firefox requires `#` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
		IE and Edge requires *everything* to be escaped to render, so we do that instead of just the `#` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
	*/
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23949494%22%20stroke-width%3D%223%22/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url("data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%2359A193%22%20stroke-width%3D%223%22%2F%3E%3Cpath%20fill%3D%22%233EA390%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22%2F%3E%3C%2Fsvg%3E");
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
  font-weight: 400;
  color: #484848;
}

.todo-list li.completed label {
  color: #949494;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #949494;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover,
.todo-list li .destroy:focus {
  color: #c18585;
}

/*  */

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}
button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
:focus,
.toggle:focus + label,
.toggle-all:focus + label {
	box-shadow: 0 0 2px 2px #CF7D7D;
	outline: 0;
}
</style>
