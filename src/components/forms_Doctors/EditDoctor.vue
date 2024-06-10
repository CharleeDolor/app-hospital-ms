<template>
    <NavBar></NavBar>
    <h1 class="p-4">Edit Doctor's Details</h1>

    <form @submit.prevent="editDoctor">
        <div class="d-flex justify-content-center gap-5">
            <div class="p-4 border border-2 rounded">
                <h3>Physician's Personal Details</h3>
                <table>
                    <tr>
                        <td><label for="name">Name:</label></td>
                        <td><input type="text" name="name" v-model="name" id="name" class="form-control mb-2"></td>
                    </tr>

                    <tr>
                        <td><label for="address">Address:</label></td>
                        <td><input type="text" name="address" id="address" v-model="address" class="form-control mb-2"></td>
                    </tr>

                    <tr>
                        <td><label for="phone_number">Phone Number:</label></td>
                        <td><input type="text" name="phone_number" id="phone_number" v-model="phone_number" class="form-control mb-2"></td>
                    </tr>

                    <tr>
                        <td><label for="email">Email:</label></td>
                        <td><input type="email" name="email" id="email" v-model="email" class="form-control mb-2"></td>
                    </tr>

                    <tr>
                        <td><label for="gender">Gender:</label></td>
                        <td><select v-model="gender" id="gender" class="form-control mb-2">
                                <option disabled value="">Please select one</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select></td>
                    </tr>
                </table>
            </div>

            <div class="pt-4 border border-2 rounded p-4">
                <h3>Additional Information</h3>
                <table>
                    <tr>
                        <td><label for="medical_license">Medical License:</label></td>
                        <td><input type="text" name="medical_license" class="w-100 form-control mb-2" id="medical_license" v-model="medical_license">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="medical_school_graduated">Medical School Graduated:</label></td>
                        <td><input type="text" name="medical_school_graduated" class="w-100 form-control mb-2" id="medical_school_graduated" v-model="medical_school_graduated"></td>
                    </tr>

                    <tr>
                        <td><label for="year_graduated">Year Graduated:</label></td>
                        <td><input type="date" class="w-100 form-control mb-2" name="year_graduated" id="year_graduated" v-model="year_graduated"></td>
                    </tr>

                    <tr>
                        <td><label for="specialties">Specialties</label></td>
                        <td><textarea name="specialties" id="specialties" cols="30" rows="5"
                                v-model="specialties" class="form-control mb-2"></textarea></td>
                    </tr>

                    <tr>
                        <td><label for="career_summary">Career Summary:</label></td>
                        <td><textarea name="career_summary" id="" cols="30" rows="5"
                                v-model="career_summary" class="form-control"></textarea></td>
                    </tr>
                </table>
            </div>
        </div>

        <div>
            <button class="btn btn-warning m-2">Update</button>
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
            if(this.getRolesAndPermissions[0] == "admin"){
                this.$router.push('/doctors');
                return;
            }

            this.$router.push('/dashboard');
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