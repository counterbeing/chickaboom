<template>
  <div id="app">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <router-link class="navbar-brand" :to="{ name: 'home'}">Chickaboom</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item ">
            <router-link class="nav-link" :to="{ name: 'customers'}">Customers</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'jobs'}">Jobs</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container">
        <router-view/>
    </div>
  </div>
</template>

<script>
import router from './router'

export default {
  name: 'app',
  router,
  components: {}
}
</script>

<style>
  body {
    padding-top: 5rem;
  }
</style>
