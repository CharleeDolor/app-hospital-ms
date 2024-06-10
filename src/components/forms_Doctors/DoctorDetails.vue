<template>
    <NavBar></NavBar>

    <div class="profile-container">
        <div class="profile-card">
            <div class="profile-picture-container">
                <img :src="defaultProfilePicture" alt="Profile Picture" class="profile-picture" height="100"
                    width="100">
            </div>
            <div class="profile-info">
                <div class="profile-header">
                    <h2>{{ doctor.name }}</h2>
                    <span class="status-badge">Active</span>
                </div>
                <div class="profile-details">
                    <table>
                        <tbody>
                            <tr>
                                <td><strong>Role:</strong></td>
                                <td>Doctor</td>
                                <td><strong>Specialization:</strong></td>
                                <td>{{ doctor.specialties }}</td>
                            </tr>
                            <tr>
                                <td><strong>Email:</strong></td>
                                <td>{{ doctor.email }}</td>
                                <td><strong>Medical License #:</strong></td>
                                <td>{{ doctor.medical_license }}</td>
                            </tr>
                            <tr>
                                <td><strong>Phone:</strong></td>
                                <td>{{ doctor.phone_number }}</td>
                                <td><strong>Medical School:</strong></td>
                                <td>{{ doctor.medical_school_graduated }}</td>
                            </tr>
                            <tr>
                                <td><strong>Address:</strong></td>
                                <td>{{ doctor.address }}</td>
                                <td rowspan="3">
                                    <label for="career_summary">
                                        <strong>Career summary:</strong>
                                    </label>
                                </td>
                                <td rowspan="3">
                                    <textarea name="career_summary" id="career_summary" cols="30" rows="10"
                                        v-model="career_summary" readonly class=" border-0"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td><strong>Gender:</strong></td>
                                <td>{{ doctor.gender }}</td>

                            </tr>
                            <tr>
                                <td><strong>Year Graduated:</strong></td>
                                <td>{{ doctor.year_graduated }}</td>

                            </tr>
                            <tr>
                                <td>
                                    <button class="btn btn-secondary m-2" @click="back">Back</button>
                                </td>
                                <td>
                                    <button class="btn btn-warning m-2" @click="gotoEditDoctor(doctor.id)">Edit</button>
                                </td>
                                <td>
                                    <button class="btn btn-danger"
                                        onclick="return confirm('Are you sure you want to delete this doctor?')"
                                        v-if="this.getRolesAndPermissions.roles[0] == 'admin'">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue"
import axios from "@/lib/axios"
import defaultProfilePicture from '@/assets/doctor_icon.png';

export default {
    components: {
        NavBar,
    },

    data() {
        return {
            doctor: [],
            defaultProfilePicture,
            career_summary: '',
        }
    },

    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions
        }
    },

    methods: {
        gotoEditDoctor(doctorId) {
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

        this.career_summary = this.doctor.career_summary;
    },
}
</script>

<style scoped>
tr:hover {
    background-color: white;
}

.profile-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f8f9fa;
}

.profile-card {
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    padding: 20px;
    max-width: 1000px;
    width: 100%;
    margin-top: 20px;
}

.profile-picture-container {
    flex-shrink: 0;
    margin-right: 20px;
}

.profile-picture {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
}

.profile-info {
    flex-grow: 1;
}

.profile-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.status-badge {
    background-color: #4caf50;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
}

.profile-details {
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
}

td {
    padding: 8px 5px;
    text-align: justify;
}

td:nth-child(1),
td:nth-child(3) {
    font-weight: bold;
}

td:nth-child(2),
td:nth-child(4) {
    width: 20%;
}
</style>
