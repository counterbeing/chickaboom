<template>
  <form class="form-signin" @submit.prevent='submit'>
    <h1 class="h3 mb-3 font-weight-normal">Please sign up</h1>
    <label for="email" class="sr-only">Email address</label>
    <input v-model='email' type="email" id="email" class="form-control" placeholder="Email address" required autofocus>

    <label for="password" class="sr-only">Password</label>
    <input v-model='password' type="password" id="password" class="form-control" placeholder="Password" required>

    <button class="btn btn-lg btn-primary btn-block" type="submit">Sign up</button>
    <p>Have an account?  <router-link :to='{name: "signin"}'>Sign in.</router-link></p>
  </form>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      name: null,
      email: null,
      password: null
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
    submit() {
      const data = { name: this.name, email: this.email, password: this.password }
      this.$store.dispatch('signup', data)
    }
  }
}
</script>

<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
