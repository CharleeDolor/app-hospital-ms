<template>
    <h1>Outpatient Registration</h1>
    <form @submit.prevent="createAccount">
        <label for="name">Name:</label>
        <input type="text" name="name" id="name" v-model="name">

        <label for="email">Email:</label>
        <input type="email" name="email" id="email" v-model="email">

        <label for="password">Password:</label>
        <input type="password" name="password" id="password" v-model="password">

        <label for="password_confirmation">Confirm Password:</label>
        <input type="password" name="password_confirmation" id="password_confirmation" v-model="password_confirmation">
        
        <button type="submit" class="btn btn-success">Register</button>
        <a href="/" class="link-secondary">Already have an account?</a>
    </form>
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
