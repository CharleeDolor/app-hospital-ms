<template>
    <NavBar></NavBar>
    <h1>Dashboard</h1>

    <!-- admin panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
        <h1>Welcome Admin</h1>
        <div class="d-flex align-items-center justify-content-center flex-column gap-3">
            <h3>Statistics</h3>
            <table>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Patients: {{ this.count.patients }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllPatients">View</button></td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Doctors: {{ this.count.doctors }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllDoctors">View</button></td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Appointments: {{ this.count.appointments }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllAppointments">View</button>
                    </td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Medical Records: {{ this.count.records }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllRecords">View</button></td>
                </tr>
            </table>
        </div>
    </div>
    <!-- end admin panel -->

    <!-- patient panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'patient'">
        <div class="d-flex align-items-center justify-content-center flex-column gap-3">
            <table>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Available Doctors: {{ this.count.doctors }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllDoctors">View</button></td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">My Appointments: {{ this.count.appointments }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllAppointments">View</button>
                    </td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">My Medical Records: {{ this.count.records }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllRecords">View</button></td>
                </tr>
            </table>
        </div>
    </div>
    <!-- end patient panel -->

    <!-- doctor panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">
        <div class="d-flex align-items-center justify-content-center flex-column gap-3">
            <table>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">My Appointments: {{ this.count.appointments }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllAppointments">View</button>
                    </td>
                </tr>
                <tr>
                    <td class="w-50 text-end p-3">
                        <p class="m-0">Patients Medical Records: {{ this.count.records }}</p>
                    </td>
                    <td class="text-start"><button class="btn btn-primary" @click="getAllRecords">View</button></td>
                </tr>
            </table>
        </div>
    </div>
    <!-- end doctor panel -->

</template>

<script>
import NavBar from "./NavBar.vue";
import axios from "@/lib/axios";

export default {
    components: {
        NavBar
    },

    data() {
        return {
            rolesAndPermissions: [],
            count: [],
        }
    },

    async beforeMount() {
        const response = await axios.get('/api/count');
        this.count = response.data.count;
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        getAllPatients() {
            this.$router.push('/patients');
        },

        getAllDoctors() {
            this.$router.push('/doctors');
        },

        getAllAppointments() {
            this.$router.push('/appointments');
        },

        getAllRecords() {
            this.$router.push('records');
        }
    }

}
</script>