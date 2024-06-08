<template>
    <NavBar></NavBar>
    <h1>Change Date of Appointment</h1>
    <form @submit.prevent="updateAppointment">
        <label for="day">Date: </label>
        <input type="date" name="day" id="day" v-model="day">
        <button type="submit" class="btn btn-warning">Update</button>
    </form>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from '@/lib/axios';

export default {
    components: {
        NavBar
    },

    data(){
        return {
            day: '',
        }
    },

    methods: {
        async updateAppointment(){
            const response = await axios.put('/api/appointments/' + this.$route.params.id);

            if(response.status == 200){
                alert('Date of appointment updated.');

                this.$router.push('/appointments');
            }
        }
    },

    async beforeMount(){
        // this means that current logged in user have no permission to edit appointments
        if(this.getRolesAndPermissions.permissions.indexOf('edit appointments') == -1){
            this.$router.push('/dashboard');
            return;
        }
        const response = await axios.get('/api/appointments/' + this.$route.params.id);

        this.day = response.data.appointment.day;
    }
}
</script>