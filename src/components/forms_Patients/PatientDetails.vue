<template>
    <NavBar></NavBar>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'admin'">Patient details</h1>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'patient'">My Details</h1>
    <div v-if="typeof this.patient == 'object'">
        <p>Name: {{ this.patient.name }}</p>
        <p>Email: {{ this.patient.email }}</p>
        <p>Address: {{ this.patient.address }}</p>
        <p>Birthday: {{ this.patient.birthday }}</p>
        <p>Age: {{ this.patient.age }}</p>
        <p>Gender: {{ this.patient.gender }}</p>
        <p>Marital Status: {{ this.patient.marital_status }}</p>
        <p>Contact Number: {{ this.patient.contact_number }}</p>
        <p>Blood Type: {{ this.patient.weight }}</p>
        <p>Weight: {{ this.patient.weight }} kgs</p>
        <p>Height: {{ this.patient.height }} cm</p>

        <div>
            <button class="btn btn-warning m-2" @click="gotoEdit">Edit</button>
            <!-- <button class="btn btn-danger">Delete</button> -->
            <form @submit.prevent="deletePatient(patient)">
                <button class="btn btn-danger"
                    onclick="return confirm('Are you sure you want to delete this patient?')">Delete</button>
            </form>
            <button class="btn btn-secondary m-2" @click="back">Back</button>
        </div>
    </div>

</template>

<script>
import NavBar from "@/components/NavBar";
import axios from "@/lib/axios";
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
            patient: [],
        }
    },

    methods: {
        back() {
            this.$router.push('/dashboard');
        },

        async deletePatient(patient) {
            const response = await axios.delete('/api/patients/' + patient.id);

            if (response.status == 200) {
                alert('Patient deleted.');

                this.$router.go(-1);
            }
        },

        gotoEdit() {
            this.$router.push({
                name: 'patientsEdit',
                params: { id: this.$route.params.id }
            })
        },
    },

    async created() {
        const response = await axios.get('/api/patients/' + this.$route.params.id);
        this.patient = response.data.patient;
    },
}
</script>