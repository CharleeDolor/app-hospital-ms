<template>
    <NavBar></NavBar>
    <h1>Edit Doctor's Details</h1>

    <form @submit.prevent="editDoctor">
        <div>
            <label for="name">Name:</label>
            <input type="text" name="name" v-model="name" id="name">
        </div>

        <div>
            <label for="email">Email:</label>
            <input type="email" name="email" id="email" v-model="email">
        </div>

        <div>
            <label for="phone_number">Phone Number:</label>
            <input type="text" name="phone_number" id="phone_number" v-model="phone_number">
        </div>

        <div>
            <label for="medical_license">Medical License:</label>
            <input type="text" name="medical_license" id="medical_license" v-model="medical_license">
        </div>

        <div>
            <label for="gender">Gender:</label>
            <input type="text" name="gender" id="gender" v-model="gender">
        </div>

        <div>
            <label for="medical_school_graduated">Medical School Graduated:</label>
            <input type="text" name="medical_school_graduated" id="medical_school_graduated"
                v-model="medical_school_graduated">
        </div>

        <div>
            <label for="year_graduated">Year Graduated:</label>
            <input type="date" name="year_graduated" id="year_graduated" v-model="year_graduated">
        </div>

        <div>
            <label for="specialties">Specialties</label>
            <input type="text" name="specialties" id="specialties" v-model="specialties">
        </div>

        <div>
            <label for="career_summary">Career Summary:</label>
            <textarea name="career_summary" id="" cols="20" rows="10" v-model="career_summary"></textarea>
        </div>

        <div>
            <button type="submit" class="btn btn-warning m-2">Update</button>
            <button @click="back" class="btn btn-secondary">Cancel</button>
        </div>
    </form>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
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
            name: "",
            email: "",
            address: "",
            phone_number: "",
            medical_license: "",
            gender: "",
            medical_school_graduated: "",
            year_graduated: "",
            specialties: "",
            career_summary: "",
        }
    },

    methods: {
        async editDoctor() {
            try {
                const response = await axios.put('/api/doctors/' + this.$route.params.id, {
                    name: this.name,
                    email: this.email,
                    address: this.address,
                    phone_number: this.phone_number,
                    medical_license: this.medical_license,
                    gender: this.gender,
                    medical_school_graduated: this.medical_school_graduated,
                    year_graduated: this.year_graduated,
                    specialties: this.specialties,
                    career_summary: this.career_summary,
                });

                if (response.status == 200) {
                    alert('Doctor details updated');
                    
                    this.name = '';
                    this.email = '';
                    this.address = '';
                    this.phone_number = '';
                    this.medical_license = '';
                    this.gender = '';
                    this.medical_school_graduated = '';
                    this.year_graduated = '';
                    this.specialties = '';
                    this.career_summary = '';

                    this.$router.push('/doctors');
                }
            } catch (error) {
                console.log(error);
            }

        },

        back() {
            this.$router.push('/doctors');
        },
    },

    async beforeMount() {

        const response = await axios.get('/api/doctors/' + this.$route.params.id);
        let doctor = response.data.doctor;
        this.name = doctor.name;
        this.email = doctor.email;
        this.address = doctor.address;
        this.phone_number = doctor.phone_number;
        this.medical_license = doctor.medical_license;
        this.gender = doctor.gender;
        this.medical_school_graduated = doctor.medical_school_graduated;
        this.year_graduated = doctor.year_graduated;
        this.specialties = doctor.specialties;
        this.career_summary = doctor.career_summary;
    },
}
</script>