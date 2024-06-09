<template>
    <div class="login-container">
      <h1>Hospital Management System</h1>
  
      <form @submit.prevent="login" class="login-form">
        <input type="email" name="email" id="email" v-model="email" placeholder="Email" class="form-input">
        <input type="password" name="password" v-model="password" placeholder="Password" id="password" class="form-input">
        <button type="submit" class="btn btn-success">Login</button>
        <a href="/register" class="link-secondary">Don't have an account?</a>
      </form>
    </div>
  </template>
  
  <script>
  //axios
  import axios from "@/lib/axios";
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
  
    methods: {
      async login() {
        try {
          const response = await axios.post('/api/login', {
            email: this.email,
            password: this.password
          });
  
          if(response.status == 200){
            localStorage.setItem('token', response.data.token);
            this.email = '';
            this.password = '';
  
            const rolesAndPermissions = await axios.get('/api/user/permissions');
            this.$store.dispatch('asyncLoadRolesAndPermissions', rolesAndPermissions.data);
  
            this.$router.push('/dashboard');
          }
  
        } catch (error) {
          console.log(error);
        }
      },
    }
  }
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: #fff;
  }
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .login-form {
    display: flex;
    flex-direction: column;
  }
  
  .form-input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn {
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .link-secondary {
    margin-top: 10px;
    text-align: center;
    display: block;
    color: #007bff;
    text-decoration: none;
  }
  
  .link-secondary:hover {
    text-decoration: underline;
  }
  </style>
  