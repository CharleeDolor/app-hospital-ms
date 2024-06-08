<template>
    <NavBar></NavBar>
    <h1>Doctor Details</h1>
    <div>
        <p>Name: {{ doctor.name }}</p>
        <p>Email: {{ doctor.email }}</p>
        <p>Gender: {{ doctor.gender }}</p>
        <p>Address: {{ doctor.address }}</p>
        <p>Phone Number: {{ doctor.phone_number }}</p>
        <p>Medical License: {{ doctor.medical_license }}</p>
        <p>Medical School Graduated:{{ doctor.medical_school_graduated }}</p>
        <p>Year Graduated: {{ doctor.year_graduated }}</p>
        <p>Specialties: {{ doctor.specialties }}</p>
        <p>Career Summary: {{ doctor.career_summary }}</p>
        <div>
            <button class="btn btn-warning m-2" @click="gotoEditDoctor(doctor.id)">Edit</button>
            <form @submit.prevent="deleteDoctor(this.doctor)">
                <button class="btn btn-danger"
                    onclick="return confirm('Are you sure you want to delete this doctor?')">Delete</button>
            </form>
            <button class="btn btn-secondary m-2" @click="back">Back</button>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import axios from "@/lib/axios"

export default {
    components: {
        NavBar
    },

    data() {
        return {
            doctor: []
        }
    },

    methods: {
        gotoEditDoctor(doctorId){
            this.$router.push({
                name: 'doctorsEdit',
                params: { id: doctorId }
            });
        },

        back() {
            this.$router.push('/dashboard');
        },

        async deleteDoctor(doctor) {
            const response = await axios.delete('/api/doctors/' + doctor.id);

            if (response.status == 200) {
                alert("Doctor's details deleted.");
                this.$router.push('/dashboard');
            }
        },
    },

    async beforeMount() {
        const response = await axios.get('/api/doctors/' + this.$route.params.id);
        this.doctor = response.data.doctor;
    },
}
</script>
