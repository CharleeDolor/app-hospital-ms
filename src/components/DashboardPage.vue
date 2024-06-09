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
                    <td><p class="m-0">Patients: {{ this.count.patients }}</p></td>
                    <td><button class="btn btn-primary" @click="getAllPatients">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Doctors: {{ this.count.doctors }}</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Appointments: {{ this.count.appointments }}</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Medical Records: {{ this.count.records }}</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
            </table>
        </div>
    </div>
    <!-- end admin panel -->

</template>

<script>
import NavBar from "./NavBar.vue";
import axios from "@/lib/axios";

export default {
    components: {
        NavBar
    },

    data(){
        return {
            rolesAndPermissions: [],
            count: [],
        }
    },

    async beforeMount(){
        if( this.getRolesAndPermissions.roles[0] == 'admin' ){
            const response = await axios.get('/api/count');
            this.count = response.data.count;
        }
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        getAllPatients(){
            this.$router.push('/patients');
        }
    }

}
</script>