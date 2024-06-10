<template>
    <NavBar></NavBar>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'admin'">Add patient</h1>
    <h1 v-if="this.getRolesAndPermissions.roles[0] == 'patient'">Add details</h1>
    <div class="form-container">
        <form @submit.prevent="addPatient">
            <table class="form-table">
                    <tbody>
                        <tr>
                            <td><label for="name">Name:</label></td>
                            <td><input type="text" v-model="name" id="name" class="form-control"></td>
                            <td>
                                <label for="email">Email:</label></td>
                            <td><input type="email" v-model="email" id="email" class="form-control"></td>
                        </tr>
                        <tr>
                            <td><label for="birthday">Birthday:</label></td>
                            <td><input type="date" v-model="birthday" id="birthday" class="form-control"></td>
                            <td><label for="gender">Gender:</label></td>
                            <td><select v-model="gender" id="gender" class="form-control">
                                    <option disabled value="">Please select one</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select></td>
                        </tr>

                        <tr>
                            <td><label for="marital_status">Marital Status:</label></td>
                            <td>
                                <select v-model="marital_status" id="marital_status" class="form-control">
                                    <option disabled value="">Please select one</option>
                                    <option>Single</option>
                                    <option>Married</option>
                                    <option>Widowed</option>
                                    
                                </select>
                            </td>
                            <td><label for="contact_number">Contact Number:</label></td>
                            <td><input type="text" v-model="contact_number" id="contact_number" class="form-control"></td>
                        </tr>

                        <tr>
                            
                        </tr>

                        <tr>
                            <td><label for="blood_type">Blood Type:</label></td>
                            <td>
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
                            <td><textarea v-model="address" id="address" cols="20" rows="5" class="form-control"></textarea></td>
                        </tr>

                        <tr>
                            <td><label for="weight">Weight in kg:</label></td>
                            <td><input type="number" v-model="weight" id="weight" class="form-control"></td>
                            <td><label for="height">Height in cm:</label></td>
                            <td><input type="number" v-model="height" id="height" class="form-control"></td>
                        </tr>
                    </tbody>
                </table>

        <div>
            <button type="submit" class="btn btn-success m-2">Save</button>
            <button @click="back" class="btn btn-secondary">Cancel</button>
        </div>
    </form>

</div>
     
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

    async beforeMount(){
        const response = await axios.get('/api/user/information');
        console.log(response.data);
        if(response.data.account.type == "3"){
            this.name = response.data.account.name;
            this.email = response.data.account.email;
            document.getElementById('email').readOnly = true;
            document.getElementById('name').readOnly = true;
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

<style scoped>
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
    box-sizing: border-box; /* Includes padding in the width calculation */
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
