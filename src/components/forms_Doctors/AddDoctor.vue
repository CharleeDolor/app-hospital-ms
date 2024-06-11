<template>
    <NavBar></NavBar>
    <h1>New Doctor</h1>
    <form @submit.prevent="addDoctor">
        <div class="d-flex justify-content-center gap-5">
            <div class="p-4 border border-2 rounded">
                <h3>Physician's Details</h3>
                <table>
                    <tr>
                        <td><label for="name">Name:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('name')" class="error m-0">{{ this.messages['name'][0]
                                }}</p>
                            <input type="text" name="name" v-model="name" id="name" class="form-control mb-2">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="address">Address:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('address')" class="error m-0">{{
                                this.messages['address'][0] }}</p>
                            <input type="text" name="address" id="address" v-model="address" class="form-control mb-2">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="phone_number">Phone Number:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('phone_number')" class="error m-0">{{
                                this.messages['phone_number'][0] }}</p>
                            <input type="text" name="phone_number" id="phone_number" v-model="phone_number"
                                class="form-control mb-2">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="email">Email:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('email')" class="error m-0">{{
                                this.messages['email'][0] }}</p>
                            <input type="email" name="email" id="email" v-model="email" class="form-control mb-2">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="gender">Gender:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('gender')" class="error m-0">{{
                                this.messages['gender'][0] }}</p>
                            <select v-model="gender" id="gender" class="form-control mb-2">
                                <option disabled value="">Please select one</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                        </td>
                    </tr>
                </table>
            </div>

            <div class="pt-4 border border-2 rounded p-4">
                <h3>Additional Information</h3>
                <table>
                    <tr>
                        <td><label for="medical_license">Medical License:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('medical_license')" class="error m-0">{{
                                this.messages['medical_license'][0] }}</p>
                            <input type="text" name="medical_license" class="w-100 form-control mb-2"
                                id="medical_license" v-model="medical_license">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="medical_school_graduated">Medical School Graduated:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('medical_school_graduated')" class="error m-0">{{
                                this.messages['medical_school_graduated'][0] }}</p>
                            <input type="text" name="medical_school_graduated" class="w-100 form-control mb-2"
                                id="medical_school_graduated" v-model="medical_school_graduated">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="year_graduated">Year Graduated:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('year_graduated')" class="error m-0">{{
                                this.messages['year_graduated'][0] }}</p>
                            <input class="form-control w-100" type="number" id="year_graduated" v-model="year_graduated">
                        </td>
                    </tr>

                    <tr>
                        <td><label for="specialties">Specialization/s:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('specialties')" class="error m-0">{{
                                this.messages['specialties'][0] }}</p>
                            <textarea name="specialties" id="specialties" cols="30" rows="5" v-model="specialties"
                                class="form-control mb-2"></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td><label for="career_summary">Career Summary:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('career_summary')" class="error m-0">{{
                                this.messages['career_summary'][0] }}</p>
                            <textarea name="career_summary" id="" cols="30" rows="5" v-model="career_summary"
                                class="form-control mb-2"></textarea>
                        </td>
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
            messages: []
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
                    alert('Doctor details added');

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
                } else {
                    this.messages = response.data.message;
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
.error {
    color: red;
}

.ui-datepicker-calendar {
    display: none;
}
</style>