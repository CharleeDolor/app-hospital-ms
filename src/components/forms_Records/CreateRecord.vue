<template>

    <form @submit.prevent="createRecord">
        <h1>Create Medical Record</h1>
        <div class=" d-flex align-items-center justify-content-center">
            <div class="container-fluid d-flex align-items-center justify-content-center flex-column">
                <div class="mb-3">
                    <label for="diagnosis" class="form-label">Diagnosis</label>
                    <textarea class="form-control" id="diagnosis" rows="3" v-model="diagnosis"></textarea>
                </div>

                <div class="mb-3">
                    <label for="recommendations" class="form-label">Recommendations</label>
                    <textarea class="form-control" id="recommendations" rows="3" v-model="recommendations"></textarea>
                </div>

                <button type="submit" class="btn btn-success">Save</button>
            </div>
        </div>
    </form>
</template>

<script>
import axios from '@/lib/axios';

export default {
    data() {
        return {
            diagnosis: '',
            recommendations: ''
        }
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        async createRecord() {
            const response = await axios.post('/api/records', {
                patient_id: this.$route.params.id,
                diagnosis: this.diagnosis,
                recommendations: this.recommendations
            });

            if (response.status == 201) {
                console.log(response.data)
                this.diagnosis = '';
                this.recommendations = '';
                alert('New medical record is created.');
                this.$router.push('/appointments');
            }
        }
    }
}
</script>

<style>

</style>