<template>
    <h1>Create Medical Record</h1>

    <form @submit.prevent="createRecord">
        <label for="diagnosis">Diagnosis: </label>
        <textarea name="diagnosis" id="diagnosis" cols="30" rows="10" v-model="diagnosis"></textarea>

        <label for="recommendations">Recommendations:</label>
        <textarea name="recommendations" id="recommendations" cols="30" rows="10" v-model="recommendations"></textarea>
        
        <button type="submit" class="btn btn-success">Save</button>
    </form>
</template>

<script>
import axios from '@/lib/axios';

export default {
    data(){
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

    beforeMount(){
        // this means that current logged in user have no permission to create doctors
        if(this.getRolesAndPermissions.permissions.indexOf('create doctors') == -1){
            this.$router.push('/dashboard');
            return;
        }
    },

    methods: {
        async createRecord(){
            const response = await axios.post('/api/records', {
                patient_id: this.$route.params.id,
                diagnosis: this.diagnosis,
                recommendations: this.recommendations
            });

            if(response.status == 201){
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