<template>
    <NavBar></NavBar>
    <h1>Create Appointment</h1>
    <div class="container-fluid">
        <form @submit.prevent="createAppointment">
            <button class="btn btn-primary" @click="getDoctors">Select Doctor</button>
            <h3>Doctor selected: {{ this.getSelectedDoctor.name }}</h3>
            <label for="type">Type:</label>
            <select name="type" id="type" v-model="type">
                <option value="">Select Type</option>
                <option value="checkup">Checkup</option>
                <option value="follow-up">Follow-up checkup</option>
            </select>

            <label for="day">Date of appointment:</label>
            <input type="date" name="day" id="day" v-model="day">
            <button type="submit" class="btn btn-success">Save</button>
        </form>
    </div>
</template>

<script>
import axios from '@/lib/axios'
import NavBar from '@/components/NavBar.vue'

export default {
    components: {
        NavBar
    },

    computed: {
        getSelectedDoctor(){
            return this.$store.getters.getSelectedDoctor
        },

        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        },
    },

    beforeMount(){
        // this means that current logged in user have no permission to create appointments
        if(this.getRolesAndPermissions.permissions.indexOf('create appointments') == -1){
            this.$router.push('/dashboard');
            return;
        }
    },

    data(){
        return {
            type: '',
            day: '',
        }
    },

    methods: {
        async createAppointment(){
            let doctorId = this.getSelectedDoctor.id
            console.log(this.type)
            console.log(this.day)
            console.log(doctorId) 
            const response = await axios.post('/api/appointments', {
                type: this.type,
                day: this.day,
                doctor_id: doctorId
            });

            if(response.status == 201){
                this.type = '',
                this.day = '',
                this.$store.dispatch('asyncLoadSelectedDoctor', {});
                this.$router.push('/appointments');
            }
        },

        getDoctors(){
            this.$router.push('/doctors');
        },
    },
}
</script>