<script>
export default {
  name: "FilterTodo",
  props:['selected'],
  setup() {
    const filters = [
      { label: "全部", value: "all" },
      { label: "已完成", value: "done" },
      { label: "待办", value: "todo" },
    ];

    return {
      filters,
    };
  },
};
</script>

<template>
  <div class="filters">
    <span
      v-for="filt in filters"
      :key="filt.value"
      @click="$emit('change-filter', filt.value)"
      class="filter"
      :class="{ active:selected===filt.value }"
    >
      {{ filt.value }}
    </span>
  </div>
</template>

<style>
.filters {
  margin: 10px 2px;
  color: #c0c2ce;
}
span {
  color: inherit;
  font-size: 16px;
  margin-right: 3px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}
span:hover {
  border-color: #db7676;
  font-size: 20px;
  color: #6b729c;
  cursor:pointer;
}

.filters .filter.active{
  border-color: #db7676;
  font-size: 20px;
  color:#6b729c;
  transform: scale(1.2);
}
</style>
