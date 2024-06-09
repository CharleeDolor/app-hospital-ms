<template>
    <NavBar></NavBar>
    <h1>Medical Records</h1>

    <!-- admin panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
        <div v-if="'message' in this.records">
            <h3>Seems empty here!</h3>
        </div>
        <div v-else>
            <h3>All Records</h3>
            <table>
                <thead>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                </thead>

                <tbody>
                    <tr v-for="record in records" :key="record.id">
                        <td>{{ record.patient_id }}</td>
                        <td>{{ record.doctor_id }}</td>
                        <td>{{ record.diagnosis }}</td>
                        <td>{{ record.date_of_consultation }}</td>
                        <td>{{ record.recommendations }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- end admin panel -->

    <!-- patient panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'patient'">
        <div v-if="'message' in this.records">
            <h3>Seems empty here!</h3>
        </div>
        <div v-else>
            <h3>My medical Records</h3>
            <table>
                <thead>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                </thead>

                <tbody>
                    <tr v-for="record in records" :key="record.id">
                        <td>{{ record.patient_id }}</td>
                        <td>{{ record.doctor_id }}</td>
                        <td>{{ record.diagnosis }}</td>
                        <td>{{ record.date_of_consultation }}</td>
                        <td>{{ record.recommendations }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- end patient panel -->

    <!-- doctor panel -->
    <div class="container-fluid" v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">
        <div v-if="'message' in this.records">
            <h3>Seems empty here!</h3>
        </div>
        <div v-else>
            <h3>Patient's medical records</h3>
            <table>
                <thead>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                </thead>

                <tbody>
                    <tr v-for="record in records" :key="record.id">
                        <td>{{ record.patient_id }}</td>
                        <td>{{ record.doctor_id }}</td>
                        <td>{{ record.diagnosis }}</td>
                        <td>{{ record.date_of_consultation }}</td>
                        <td>{{ record.recommendations }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- end doctor panel -->
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import axios from '@/lib/axios'

export default {
    components: {
        NavBar
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    data(){
        return {
            records: [],
        }
    },

    async beforeMount(){
        const response = await axios.get('/api/records');
        this.records = response.data.records;

        if("message" in this.records){
            this.records = response.data;
        } else {
            // this.records = response.data
            console.log(this.records)
        }
    },
}
</script>