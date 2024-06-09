<template>
    <NavBar></NavBar>
    <h1>Appointments</h1>

    <div class="container-fluid"
        v-if="this.appointments.length == 0 && this.getRolesAndPermissions.roles[0] == 'patient'">
        <h3>Seems empty here.</h3>
        <button class="btn btn-success" @click="gotoCreateAppointment">Click here to create an appointment</button>
    </div>

    <div v-if="this.appointments.length == 0 && this.getRolesAndPermissions.roles[0] == 'doctor'">
        <h4>Seems empty here. Let's wait for the patients to create an appointment</h4>
    </div>

    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'patient' || this.getRolesAndPermissions.roles[0] == 'doctor'">
        <table v-if="this.appointments.length != 0">
            <thead>
                <th>Type</th>
                <th>Queue Number</th>
                <th>Day</th>
                <th v-if="this.getRolesAndPermissions.roles[0] == 'patient'">Doctor's Name</th>
                <th v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">Patient's Name</th>
                <th>Action</th>
            </thead>

            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                    <td>{{ appointment.type }}</td>
                    <td>{{ appointment.queue_number }}</td>
                    <td>{{ appointment.day }}</td>
                    <td v-if="this.getRolesAndPermissions.roles[0] == 'patient'">{{ appointment.doctors_name }}</td>
                    <td v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">{{ appointment.patients_name }}</td>
                    <td>
                        <div class="d-flex gap-2">
                            <button class="btn btn-success" v-if="this.getRolesAndPermissions.roles[0] == 'doctor'"
                                @click="consult(appointment.patient_id)">Start Consultation</button>
                            <form @submit.prevent="deleteAppointment(appointment)">
                                <button class="btn btn-danger"
                                    onclick="return confirm('Are you sure you want to cancel your appointment?')" v-if="this.getRolesAndPermissions.roles[0] == 'patient'
                                        || this.getRolesAndPermissions.roles[0] == 'doctor'">Cancel</button>
                            </form>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <!-- admin panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
        <table v-if="this.appointments.length != 0">
            <thead>
                <th>Type</th>
                <th>Day</th>
                <th>Doctor's Name</th>
                <th>Patient's Name</th>
            </thead>

            <tbody>
                <tr v-for="appointment in appointments" :key="appointment.id">
                    <td>{{ appointment.type }}</td>
                    <td>{{ appointment.day }}</td>
                    <td>{{ appointment.doctors_name }}</td>
                    <td>{{ appointment.patients_name }}</td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- end admin panel -->

</template>

<script>
import axios from '@/lib/axios'
import NavBar from '@/components/NavBar.vue'
export default {
    components: {
        NavBar
    },

    data() {
        return {
            appointments: []
        }
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    async beforeMount() {
        try {
            const account = await axios.get('/api/user/information');
            if (account.data.account.details_id == null && account.data.account.type == "3") {
                alert('Please fill up your details before making an appointment')
                this.$router.push('/patients/create');
            }

            const response = await axios.get('/api/appointments');

            this.appointments = response.data.appointments;
        } catch (error) {
            console.log(error)
        }
    },

    methods: {
        gotoCreateAppointment() {
            this.$router.push('/appointments/create');
        },

        edit(appointmentId) {
            this.$router.push({
                name: 'appointmentsEdit',
                params: { id: appointmentId }
            })
        },

        async deleteAppointment(appointment) {
            const response = await axios.delete('/api/appointments/' + appointment.id);

            if (response.status == 200) {
                alert('Appointment deleted deleted.');

                // refersh list
                const response = await axios.get('/api/appointments');
                if (response.status == 200) {
                    this.appointments = response.data.appointments;
                }
            }
        },

        consult(patientId) {
            this.$router.push({
                name: 'recordsConsultation',
                params: { id: patientId }
            })
        }
    }
}
</script>