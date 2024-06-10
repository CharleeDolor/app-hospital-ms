<template>
    <NavBar></NavBar>
    <h1>Create Appointment</h1>
    <div class="container-fluid">
        <form @submit.prevent="createAppointment">
            <div class="container d-flex align-items-center justify-content-center flex-column">
                <table>
                    <tr>
                        <td class="text-end w-50"><button class="btn btn-primary" @click="getDoctors">Select Doctor</button>
                        </td>
                        <td class="text-start">
                            <h3>Doctor selected: {{ this.getSelectedDoctor.name }}</h3>
                        </td>
                    </tr>

                    <tr>
                        <td class="text-end">
                            <label for="type">Type:</label>
                        </td>
                        <td class="text-start"><select name="type" id="type" v-model="type">
                                <option value="">Select Type</option>
                                <option value="checkup">Checkup</option>
                                <option value="follow-up">Follow-up checkup</option>
                            </select></td>
                    </tr>

                    <tr>
                        <td class="text-end"><label for="day">Date of appointment:</label></td>
                        <td class="text-start"><input type="date" name="day" id="day" v-model="day"></td>
                    </tr>

                    <tr class="d-flex align-items-center justify-content-center"></tr>
                </table>

                <div class="">
                    <button type="submit" class="btn btn-success">Make an appointment</button>
                </div>
                
            </div>

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
        getSelectedDoctor() {
            return this.$store.getters.getSelectedDoctor
        },

        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        },
    },

    data() {
        return {
            type: '',
            day: '',
        }
    },

    methods: {
        async createAppointment() {
            let doctorId = this.getSelectedDoctor.id
            const response = await axios.post('/api/appointments', {
                type: this.type,
                day: this.day,
                doctor_id: doctorId
            });

            if (response.status == 201) {
                this.type = '',
                    this.day = '',
                    this.$store.dispatch('asyncLoadSelectedDoctor', {});
                this.$router.push('/appointments');
            }
        },

        getDoctors() {
            this.$router.push('/doctors');
        },
    },
}
</script>

<style scoped>

td {
    padding: 0.5rem;
}
</style>