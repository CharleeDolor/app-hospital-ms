<template>
    <NavBar></NavBar>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'admin'">Add patient</h1>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'patient'">Add details</h1>
    <form @submit.prevent="addPatient">
        <div>
            <label for="name">Name: &nbsp;</label>
            <input type="text" v-model="name" id="name">
        </div>

        <div>
            <label for="email">Email: &nbsp;</label>
            <input type="email" v-model="email" id="email">
        </div>

        <div>
            <label for="address">Address: &nbsp;</label>
            <textarea name="address" id="address" cols="20" rows="5" v-model="address"></textarea>
        </div>

        <div>
            <label for="birthday">Birthday: &nbsp;</label>
            <input type="date" name="birthday" id="birthday" v-model="birthday">
        </div>

        <div>
            <label for="gender">Gender: &nbsp;</label>
            <input type="text" v-model="gender" id="gender">
        </div>

        <div>
            <label for="marital_status">Marital Status: &nbsp;</label>
            <input type="text" v-model="marital_status" id="marital_status">
        </div>

        <div>
            <label for="contact_number">Contact Number: &nbsp;</label>
            <input type="text" v-model="contact_number" id="contact_number">
        </div>

        <div>
            <label for="blood_type">Blood Type: &nbsp;</label>
            <input type="text" v-model="blood_type" id="blood_type">
        </div>

        <div>
            <label for="weight">Weight in kg: &nbsp;</label>
            <input type="number" v-model="weight" id="weight">
        </div>

        <div>
            <label for="height">Height in cm: &nbsp;</label>
            <input type="number" v-model="height" id="height">
        </div>

        <div>
            <button type="submit" class="btn btn-success m-2">Save</button>
            <button @click="back" class="btn btn-secondary">Cancel</button>
        </div>
    </form>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import axios from "@/lib/axios";
export default {
    components: {
        NavBar
    },

    data() {
        return {
            name: '',
            email: '',
            birthday: '',
            address: '',
            gender: '',
            marital_status: '',
            contact_number: '',
            blood_type: '',
            weight: 0,
            height: 0
        }
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        async addPatient() {
            const response = await axios.post('/api/patients', {
                name: this.name,
                email: this.email,
                birthday: this.birthday,
                address: this.address,
                gender: this.gender,
                marital_status: this.marital_status,
                contact_number: this.contact_number,
                blood_type: this.blood_type,
                weight: this.weight,
                height: this.height,
            });

            if(response.status == 201){
                alert('Patiend details created');
                this.$router.go(-1);
            }
        },

        back(){
            if(this.getRolesAndPermissions.roles[0] == 'patient'){
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/doctors');
            }
        }
    },
}
</script>