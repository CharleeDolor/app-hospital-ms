<template>
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link active" href="/dashboard">Home</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
            <a class="nav-link" href="/patients">Patients</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
            <a class="nav-link" href="/doctors">Doctors</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'patient'">
            <button class="nav-link" @click="gotoPatientDetails">My Details</button>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/appointments">Appointments</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/records">Medical Records</a>
        </li>
        <li class="nav-item">
            <button @click="logout" class="btn btn-danger">Logout</button>
        </li>
    </ul>
</template>

<script>
import axios from "@/lib/axios";

export default {
    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        async gotoPatientDetails() {
            try {
                const response = await axios.get('/api/user/information');

                if(response.data.account.details_id == null){
                    this.$router.push('/patients/create');
                } else {
                    this.$router.push({
                        name: 'patientsShow',
                        params: {id: response.data.account.details_id}
                    });
                }
            } catch (error) {
                console.log(error);
            }

        },
        async logout() {
            const response = await axios.post('/api/logout');

            if (response.status == 200) {
                localStorage.clear();

                this.$router.push('/');
            }
        },
    }
}
</script>