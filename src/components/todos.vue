<template>
  <div>
    <ul
      <li class='todo-list' v-for='(todo, index) in job.todos' v-bind:key='index' @click='toggle(todo)'>
        <font-awesome-layers class="fa-lg">
          <font-awesome-icon icon="circle" />
          <font-awesome-icon icon="check" transform="shrink-6" class='todo-icon' :class='{ done: isDone(todo) }' />
        </font-awesome-layers>
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>

<script>

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
 export default {
   name: 'todos',
   props: ['job'],
   components: { FontAwesomeIcon, FontAwesomeLayers },
   computed: {
   },

   methods: {
     isDone(todo) {
       return todo.state ? true : false
     },
     toggle(todo) {
       todo.state = !todo.state
     }
   },
   mounted() {
     if(!this.job.todos) {
       this.job.todos = [
         { title: "Contract signed", state: false},
         { title: "Flight complete", state: false},
         { title: "Editing complete", state: false},
         { title: "Invoice sent", state: false},
         { title: "Invoice paid", state: false},
       ]
     }
   }
 }
</script>

<style>
  .done {
    color: green;
  }

  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .todo-icon {
    color: white;
  }
</style>
