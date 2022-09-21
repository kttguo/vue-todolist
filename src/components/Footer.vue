<script>
    export default {
        name:"TodoFooter",
        props: {
          remaining: Number,
  }
    }

</script>
<template>
  <footer class="footer">
    <span class="todo-count" v-show="remaining">
      <strong>{{ remaining }}</strong>
      <span>{{ remaining===1? "item" : "items"}}</span>
    </span>
    <span class="slogan">Just do it</span>
    <!-- <button class="clear-completed">Clear ompleted</button> -->
  </footer>
</template>

<style>
    footer {
  padding: 10px 15px;
  height: 20px;
  text-align: 15px;
  font-size: 15px;
  border-top: 1px solid #e6e6e6;
}

footer:before {
  content: "";
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2), 0 8px 0 -3px #f6f6f6,
    0 9px 1px -3px rgba(0, 0, 0, 0.2), 0 16px 0 -6px #f6f6f6,
    0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}
.todo-count strong {
  font-weight: 600;
}

.slogan {
  display: inline-block;
  margin: 0 50px;
  padding: 0;
  font-weight: 600;
  float:right;
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 19px;
  text-decoration: none;
  cursor: pointer;
}
.clear-completed:hover {
  text-decoration: underline;
}
</style>
