<template>
    <ul class="nav">
        <li class="nav-item">
            <a class="nav-link active" href="/dashboard">Home</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
            <a class="nav-link" href="/patients">Patients</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
            <a class="nav-link" href="/doctors">Doctors</a>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'patient'">
            <button class="nav-link" @click="gotoPatientDetails">My Details</button>
        </li>
        <li class="nav-item" v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">
            <button class="nav-link" @click="gotoDoctorDetails">Personal Information</button>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/appointments">Appointments</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/records">Medical Records</a>
        </li>
        <li class="nav-item">
            <button @click="showLogoutDialog = true" class="btn-logout">Logout</button>
        </li>
    </ul>

    <div v-if="showLogoutDialog" class="modal fade show" tabindex="-1" role="dialog" style="display: block;">
        <div class="modal-dialog modal-sm d-flex justify-content-center align-items-center" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Confirm Logout</h5>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to log out?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn-cancel btn-secondary" @click="showLogoutDialog = false">Cancel</button>
                    <button type="button" class="btn-logout btn-danger" @click="logout">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showLogoutDialog" class="modal-backdrop fade show"></div>
</template>

<script>
import axios from "@/lib/axios";

export default {
    data() {
        return {
            showLogoutDialog: false
        };
    },
    computed: {
        getRolesAndPermissions() {
            return this.$store.getters.getRolesAndPermissions;
        }
    },
    methods: {
        async gotoPatientDetails() {
            try {
                const response = await axios.get('/api/user/information');
                if (response.data.account.details_id == null) {
                    this.$router.push('/patients/create');
                } else {
                    this.$router.push({
                        name: 'patientsShow',
                        params: { id: response.data.account.details_id }
                    });
                }
            } catch (error) {
                console.log(error);
            }
        },
        async gotoDoctorDetails() {
            const response = await axios.get('/api/user/information');
            this.$router.push({
                name: 'doctorsShow',
                params: { id: response.data.account.details_id }
            });
        },
        async logout() {
            try {
                const response = await axios.post('/api/logout');
                if (response.status == 200) {
                    localStorage.clear();
                    this.$router.push('/');
                }
            } catch (error) {
                console.log(error);
            } finally {
                this.showLogoutDialog = false;
            }
        }
    }
}
</script>

<style scoped>
.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.modal-dialog {
  display: flex;
  align-items: center;
  min-height: calc(100% - 1rem);
}

.modal-backdrop {
    z-index: 1040;
}

.modal {
    z-index: 1050;
}

.btn-logout,
.btn-cancel {
    width: 100px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease;
}

.btn-logout {
    padding: 5px;
    border-radius: 15px;
    box-shadow: rgba(45, 35, 66, 0.5) 0 1px 2px, rgba(45, 35, 66, 0.5) 0 5px 10px -1px, #D6D6E7 0 -2px 0 inset;
    background-color: #e0231c;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-cancel {
    padding: 5px;
    border-radius: 15px;
    box-shadow: rgba(45, 35, 66, 0.5) 0 1px 2px, rgba(45, 35, 66, 0.5) 0 5px 10px -1px, #D6D6E7 0 -2px 0 inset;
    background-color: #6a6767;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-logout:hover {
    background: linear-gradient(to bottom, #ff0000, white);
    color: black;
    transform: scale(1.02);
}

.btn-cancel:hover {
    background: linear-gradient(to bottom, #6a6767, white);
    color: black;
    transform: scale(1.02);
}
</style>
