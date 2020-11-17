<template>
  <div id="login-container">
    <h1>Login</h1>
    <input v-model="email" placeholder="email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button v-on:click="login()">Log In</button>
    <a> Forgot Password </a>
    <a> Create an Account </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: "",
      secondPassword: "",
      email: "",
    };
  },
  methods: {
    login: function () {
      console.log("foo");
    },
  },
};
</script>

<style>
#login-container {
  border: 2px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 20%;
  padding: 20px;
  float: right;
}

input {
  margin-bottom: 5px;
}
</style>