<template>
    <NavBar></NavBar>
    <h1>New Doctor</h1>
    <form @submit.prevent="addDoctor">
        <div class="d-flex justify-content-center">
            <div>
                <h3>Physician's Details</h3>
                <table>
                    <tr>
                        <td><label for="name">Name:</label></td>
                        <td><input type="text" name="name" v-model="name" id="name"></td>
                    </tr>

                    <tr>
                        <td><label for="address">Address:</label></td>
                        <td><input type="text" name="address" id="address" v-model="address"></td>
                    </tr>

                    <tr>
                        <td><label for="phone_number">Phone Number:</label></td>
                        <td><input type="text" name="phone_number" id="phone_number" v-model="phone_number"></td>
                    </tr>

                    <tr>
                        <td><label for="email">Email:</label></td>
                        <td><input type="email" name="email" id="email" v-model="email"></td>
                    </tr>

                    <tr>
                        <td><label for="gender">Gender:</label></td>
                        <td><select v-model="gender" id="gender">
                                <option disabled value="">Please select one</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select></td>
                    </tr>
                </table>
            </div>

            <div class="">
                <h3>Additional Information</h3>
                <table>
                    <tr>
                        <td><label for="medical_license">Medical License:</label></td>
                        <td><input type="text" name="medical_license" class="w-100" id="medical_license" v-model="medical_license">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="medical_school_graduated">Medical School Graduated:</label></td>
                        <td><input type="text" name="medical_school_graduated" class="w-100" id="medical_school_graduated" v-model="medical_school_graduated"></td>
                    </tr>

                    <tr>
                        <td><label for="year_graduated">Year Graduated:</label></td>
                        <td><input type="date" class="w-100" name="year_graduated" id="year_graduated" v-model="year_graduated"></td>
                    </tr>

                    <tr>
                        <td><label for="specialties">Specialties</label></td>
                        <td><textarea name="specialties" id="specialties" cols="30" rows="5"
                                v-model="specialties"></textarea></td>
                    </tr>

                    <tr>
                        <td><label for="career_summary">Career Summary:</label></td>
                        <td><textarea name="career_summary" id="" cols="30" rows="5"
                                v-model="career_summary"></textarea></td>
                    </tr>
                </table>
            </div>
        </div>

        <div>
            <button class="btn btn-success m-2">Save</button>
            <button @click="back" class="btn btn-secondary">Cancel</button>
        </div>
    </form>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import axios from "@/lib/axios"
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
        async addDoctor() {
            try {
                const response = await axios.post('/api/doctors/', {
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

                if (response.status == 201) {
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
        }
    },
}
</script>

<style scoped>
td {
    padding: 0.5rem;
}
</style>