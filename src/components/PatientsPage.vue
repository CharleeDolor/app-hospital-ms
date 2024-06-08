<template>
    <NavBar></NavBar>
    <h1>Patients</h1>

    <!-- admin panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
        <h3>All patients</h3>

        <button class="btn btn-success" @click="gotoAddPatient">Add Patient</button>
        <table class="table table-bordered" v-if="patients.length > 0">
            <thead class="">
                <th>Name</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Action</th>
            </thead>

            <tbody>
                <tr v-for="patient in patients" :key="patient.id">
                    <td>{{ patient.name }}</td>
                    <td>{{ patient.email }}</td>
                    <td>{{ patient.contact_number }}</td>
                    <td>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <button class="btn btn-primary" @click="show(patient.id)">View</button>
                            <button class="btn btn-warning" @click="gotoEditPatient(patient.id)">Edit</button>
                            <form @submit.prevent="deletePatient(patient)">
                                <button class="btn btn-danger"
                                    onclick="return confirm('Are you sure you want to delete this patient?')">Delete</button>
                            </form>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <h3 v-else>Seems empty here!</h3>
    </div>
    <!-- end admin panel -->
</template>

<script>
import axios from "@/lib/axios";
import NavBar from "./NavBar.vue";

export default {
    components: {
        NavBar
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    data() {
        return {
            patients: [],
        }
    },

    methods: {
        show(patientId) {
            this.$router.push({
                name: 'patientsShow',
                params: { id: patientId }
            });
        },

        async deletePatient(patient) {
            const response = await axios.delete('/api/patients/' + patient.id);

            if (response.status == 200) {
                alert('Patient deleted.');

                // refersh list
                const response = await axios.get('/api/patients');
                if (response.status == 200) {
                    this.patients = response.data.patients;
                }
            }
        },

        gotoAddPatient() {
            this.$router.push('/patients/create');
        },

        gotoEditPatient(patientId) {
            this.$router.push({
                name: 'patientsEdit',
                params: { id: patientId }
            });
        },
    },

    async beforeMount() {
        try {
            const response = await axios.get('/api/patients');

            if (response.status == 200) {
                this.patients = response.data.patients;
            }
        } catch (error) {
            console.log(error)
        }

    }
}

</script>