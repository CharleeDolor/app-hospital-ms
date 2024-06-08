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
                    <td><p class="m-0">Patients: NaN</p></td>
                    <td><button class="btn btn-primary" @click="getAllPatients">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Doctors: NaN</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Appointments: NaN</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
                <tr>
                    <td><p class="m-0">Medical Records: NaN</p></td>
                    <td><button class="btn btn-primary">View</button></td>
                </tr>
            </table>
        </div>
    </div>
    <!-- end admin panel -->

</template>

<script>
import NavBar from "./NavBar.vue";

export default {
    components: {
        NavBar
    },

    data(){
        return {
            rolesAndPermissions: [],
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