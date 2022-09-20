import {ref } from 'vue'
export default function useTodos(){
    const todos = ref([]);
    return {todos}
}