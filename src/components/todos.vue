<template>
    <div class="card">
      <div class="card-body">

    <ul class='todo-list' v-if='job.todos'>
      <li  v-for='(todo, index) in job.todos' v-bind:key='index' @click='toggle(todo)' :class='{ done: isDone(todo) }'>
        <font-awesome-layers class="fa-lg">
          <font-awesome-icon icon="circle" />
          <font-awesome-icon icon="check" transform="shrink-6" class='todo-icon' />
        </font-awesome-layers>
        {{ todo.title }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>

import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { mapActions } from 'vuex'

export default {
  name: 'todos',
  props: ['job'],
  components: { FontAwesomeIcon, FontAwesomeLayers },
  computed: {
  },

  methods: {
    ...mapActions(['updateTodos']),
    isDone(todo) {
      return todo.state ? true : false
    },
    toggle(todo) {
      todo.state = !todo.state
      this.update()
    },
    update() {
      this.updateTodos(this.job)
    }
  },
  created() {
    if(!this.job.todos) {
      this.job.todos = [
        { title: "Contract sent", state: false},
        { title: "Contract signed", state: false},
        { title: "Flight complete", state: false},
        { title: "Editing complete", state: false},
        { title: "Invoice sent", state: false},
        { title: "Invoice paid", state: false},
      ]
    }
    this.update()
  }
}
</script>

<style>
.done {
  color: #15752b;
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
