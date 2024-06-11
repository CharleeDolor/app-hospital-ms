<template>
    <NavBar></NavBar>
    <div class="form-container">
        <h1>Edit Patient</h1>

        <form @submit.prevent="editPatient">
            <table class="form-table">
                <tbody>
                    <tr>
                        <td><label for="name">Name:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('name')" class="error m-0">{{ this.messages['name'][0] }}</p>
                            <input type="text" v-model="name" id="name" class="form-control"></td>
                        <td>
                            <label for="email">Email:</label>
                        </td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('email')" class="error m-0">{{ this.messages['email'][0] }}</p>
                            <input type="email" v-model="email" id="email" class="form-control" readonly></td>
                    </tr>
                    <tr>
                        <td><label for="birthday">Birthday:</label></td>
                        <td><input type="date" v-model="birthday" id="birthday" class="form-control"></td>
                        <td><label for="gender">Gender:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('gender')" class="error m-0">{{ this.messages['gender'][0] }}</p>
                            <select v-model="gender" id="gender" class="form-control">
                                <option disabled value="">Please select one</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select></td>
                    </tr>

                    <tr>
                        <td><label for="marital_status">Marital Status:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('marital_status')" class="error m-0">{{ this.messages['marital_status'][0] }}</p>
                            <select v-model="marital_status" id="marital_status" class="form-control">
                                <option disabled value="">Please select one</option>
                                <option>Single</option>
                                <option>Married</option>
                                <option>Widowed</option>

                            </select>
                        </td>
                        <td><label for="contact_number">Contact Number:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('contact_number')" class="error m-0">{{ this.messages['name'][0] }}</p>
                            <input type="text" v-model="contact_number" id="contact_number" class="form-control"></td>
                    </tr>

                    <tr>
                        <td><label for="blood_type">Blood Type:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('blood_type')" class="error m-0">{{ this.messages['blood_type'][0] }}</p>
                            <select v-model="blood_type" id="blood_type" class="form-control">
                                <option disabled value="">Please select one</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </select>
                        </td>
                        <td><label for="address">Address:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('address')" class="error m-0">{{ this.messages['address'][0] }}</p>
                            <textarea v-model="address" id="address" cols="20" rows="5" class="form-control"></textarea>
                        </td>
                    </tr>

                    <tr>
                        <td><label for="weight">Weight in kg:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('weight')" class="error m-0">{{ this.messages['weight'][0] }}</p>
                            <input type="number" v-model="weight" id="weight" class="form-control"></td>
                        <td><label for="height">Height in cm:</label></td>
                        <td>
                            <p v-if="this.messages.hasOwnProperty('height')" class="error m-0">{{ this.messages['height'][0] }}</p>
                            <input type="number" v-model="height" id="height" class="form-control"></td>
                    </tr>
                </tbody>
            </table>
            <table>
                <tr>
                    <td>
                        <button type="submit" class="btn btn-warning">Update</button>
                    </td>
                    <td>
                        <button @click="back" class="btn btn-secondary">Cancel</button>
                    </td>
                </tr>
            </table>
        </form>
    </div>
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
            height: 0,
            messages: []
        };
    },

    methods: {
        async editPatient() {
            try {
                const response = await axios.put('/api/patients/' + this.$route.params.id, {
                    name: this.name,
                    birthday: this.birthday,
                    address: this.address,
                    gender: this.gender,
                    marital_status: this.marital_status,
                    contact_number: this.contact_number,
                    blood_type: this.blood_type,
                    weight: this.weight,
                    height: this.height,
                });

                if ('errors' in response.data) {
                    this.messages = response.data.message
                } else {
                    alert('Patient details updated');
                    this.$router.push('/patients');
                }
            } catch (error) {
                console.error(error);
            }
        },

        async back() {
            const response = await axios.get('/api/user/information');
            const route = response.data.account.type == "3" ? '/dashboard' : '/patients';
            this.$router.push(route);
        },
    },

    async beforeMount() {
        const response = await axios.get('/api/patients/' + this.$route.params.id);
        const patient = response.data.patient;
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

<style scoped>
.error{
    color: red;
}

.form-container {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
    padding: 20px;
    margin: 20px;
    background-color: white;
    border-radius: 8px;
}

.form-table {
    width: 100%;
    border-collapse: collapse;
}

.form-table td {
    padding: 5px;
    vertical-align: top;
    text-align: justify;
    /* border: 1px solid #ddd; Light gray border for better separation */
}

.form-control {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    /* Includes padding in the width calculation */
}

.btn {
    padding: 10px 15px;
    border: none;
    cursor: pointer;
}

.btn-warning {
    background-color: #ffc107;
    color: white;
}

.btn-secondary {
    background-color: #6c757d;
    color: white;
}

.form-buttons {
    text-align: right;
}
</style>
