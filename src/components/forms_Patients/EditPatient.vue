<template>
    <NavBar></NavBar>
    <h1>Edit Patient</h1>

    <form @submit.prevent="editPatient">
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
            <button type="submit" class="btn btn-warning m-2">Update</button>
            <button @click="back" class="btn btn-secondary">Cancel</button>
        </div>
    </form>
</template>

<script>

import axios from "@/lib/axios";
import NavBar from '@/components/NavBar';
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

    methods: {
        async editPatient() {
            try {
                const response = await axios.put('/api/patients/' + this.$route.params.id, {
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

                if (response.status == 200) {
                    alert('Patient details updated');
                    this.name = ''
                    this.email = ''
                    this.birthday = ''
                    this.address = ''
                    this.gender = ''
                    this.marital_status = ''
                    this.contact_number = ''
                    this.blood_type = ''
                    this.weight = ''
                    this.height = ''
                    this.$router.push('/patients');
                }
            } catch (error) {
                console.log(error);
            }

        },

        async back() {
            const response = await axios.get('/api/user/information');
            if(response.data.account.type == "3"){
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/patients');
            }
        },
    },

    async beforeMount() {
        // this means that current logged in user have no permission to edit patients
        if(this.getRolesAndPermissions.permissions.indexOf('edit patients') == -1){
            this.$router.push('/dashboard');
            return;
        }
        const response = await axios.get('/api/patients/' + this.$route.params.id);
        let patient = response.data.patient;
        this.name = patient.name;
        this.email = patient.email;
        this.birthday = patient.birthday;
        this.address = patient.address;
        this.gender = patient.gender;
        this.marital_status = patient.marital_status;
        this.contact_number = patient.contact_number;
        this.blood_type = patient.blood_type;
        this.weight = patient.weight;
        this.height = patient.height;
    },
}
</script>