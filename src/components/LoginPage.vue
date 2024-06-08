<template>
    <h1>Hospital Managment System</h1>

    <form @submit.prevent="login">
        <input type="email" name="email" id="email" v-model="email" placeholder="Email">
        <input type="password" name="password" v-model="password" placeholder="Password" id="password">
        <button type="submit" class="btn btn-success">Login</button>
        <a href="/register" class="link-secondary">Don't have an account?</a>
    </form>
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