<template>
    <NavBar></NavBar>
    <h1>Doctors</h1>

    <!-- admin panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles == 'admin'">
        <h3>All Doctors</h3>
        <router-link to="/doctors/create" class="btn btn-success">Add Doctor</router-link>
        <div class="container">
            <table class="table-bordered" v-if="this.doctors.length != 0">
                <thead class="">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Specialties</th>
                    <th>Action</th>
                </thead>

                <tbody>
                    <tr v-for="doctor in doctors" :key="doctor.id">
                        <td>{{ doctor.name }}</td>
                        <td>{{ doctor.email }}</td>
                        <td>{{ doctor.phone_number }}</td>
                        <td>{{ doctor.specialties }}</td>

                        <td>
                            <div class="d-flex justify-content-center align-items-center gap-2">
                                <button class="btn btn-primary" @click="show(doctor.id)">View</button>
                                <button class="btn btn-warning" @click="edit(doctor.id)">Edit</button>
                                <form @submit.prevent="deleteDoctor(doctor)">
                                    <button class="btn btn-danger"
                                        onclick="return confirm('Are you sure you want to delete this doctor?')">Delete</button>
                                </form>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-else>
                <h3>Seems empty here.</h3>
            </div>
        </div>
    </div>
    <!-- end admin panel -->

    <!-- patient panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles == 'patient'">
        <h3>All Doctors</h3>
        <table class="table-bordered">
            <thead class="">
                <th>Name</th>
                <th>Specialties</th>
                <th>Action</th>
            </thead>

            <tbody>
                <tr v-for="doctor in doctors" :key="doctor.id">
                    <td>{{ doctor.name }}</td>
                    <td>{{ doctor.specialties }}</td>

                    <td>
                        <div class="d-flex justify-content-center align-items-center gap-2">
                            <button class="btn btn-success" @click="getDoctorId(doctor)">Set Appointment</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- end patient panel -->
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import axios from '@/lib/axios';

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
            doctors: [],
        }
    },

    methods: {
        show(doctorId) {
            this.$router.push({
                name: 'doctorsShow',
                params: { id: doctorId }
            });
        },

        edit(doctorId) {
            this.$router.push({
                name: 'doctorsEdit',
                params: { id: doctorId }
            });
        },

        async deleteDoctor(doctor) {
            const response = await axios.delete('/api/doctors/' + doctor.id);

            if (response.status == 200) {
                alert("Doctor's details deleted.");

                // refersh list
                const response = await axios.get('/api/doctors');

                if (response.status == 200) {
                    this.doctors = response.data.doctors;
                }
            }
        },

        getDoctorId(doctor) {
            this.$store.dispatch('asyncLoadSelectedDoctor', { id: doctor.id, name: doctor.name });
            this.$router.go(-1);
        }
    },

    async beforeMount() {
        const response = await axios.get('/api/doctors');

        if (response.status == 200) {
            this.doctors = response.data.doctors;
        }
    }
}
</script>