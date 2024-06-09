<template>
    <div class="registration-container">
      <h1>Outpatient Registration</h1>
      <form @submit.prevent="createAccount" class="registration-form">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" v-model="name" class="form-input">
  
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" v-model="email" class="form-input">
  
        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="password" class="form-input">
  
        <label for="password_confirmation">Confirm Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation" v-model="password_confirmation" class="form-input">
        
        <button type="submit" class="btn btn-success">Register</button>
        <a href="/" class="link-secondary">Already have an account?</a>
      </form>
    </div>
  </template>
  
  <script>
  import axios from '@/lib/axios'
  export default {
    data(){
      return {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    },
  
    methods: {
      async createAccount(){
        const response = await axios.post('/api/register', {
          name: this.name,
          email: this.email,
          type: 3,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
  
        if(response.status == 201){
          alert('Success! Login your account with your email and password')
          this.$router.go(-1);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .registration-container {
    max-width: 500px;
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
  
  .registration-form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    font-weight: bold;
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
  