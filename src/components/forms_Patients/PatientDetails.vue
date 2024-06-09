<template>
    <NavBar></NavBar>
    <div class="profile-container">
      <div class="profile-card">
        <div class="profile-picture-container">
          <img :src="defaultProfilePicture" alt="Profile Picture" class="profile-picture">
        </div>
        <div class="profile-info">
          <div class="profile-header">
            <h2>{{ patient.name }}</h2>
            <span class="status-badge">Active</span>
          </div>
          <div class="profile-details">
            <table>
              <tbody>
                <tr>
                  <td><strong>Role:</strong></td>
                  <td>Patient</td>
                  <td><strong>Birthday:</strong></td>
                  <td>{{ patient.birthday }}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{{ patient.email }}</td>
                  <td><strong>Status:</strong></td>
                  <td>{{ patient.marital_status }}</td>
                </tr>
                <tr>
                  <td><strong>Phone:</strong></td>
                  <td>{{ patient.contact_number }}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{{ patient.address }}</td>
                </tr>
                <tr>
                  <td><strong>Age:</strong></td>
                  <td>{{ patient.age }}</td>
                  <td><strong>Gender:</strong></td>
                  <td>{{ patient.gender }}</td>
                </tr>
                <tr>
                  <td><strong>Blood Type:</strong></td>
                  <td>{{ patient.blood_type }}</td>
                  <td><strong>Weight:</strong></td>
                  <td>{{ patient.weight }} kgs</td>
                </tr>
                <tr>
                  <td><strong>Height:</strong></td>
                  <td>{{ patient.height }} cm</td>
                </tr>
                <tr>
                  <td>
                    <button class="btn btn-warning m-2" @click="gotoEdit" v-if="this.getRolesAndPermissions.roles[0] != 'patient'">Edit</button>
                  </td>
                  <td>
                    <button class="btn btn-secondary m-2" @click="back">Back</button>
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
  import NavBar from "@/components/NavBar";
  import axios from "@/lib/axios";
  import defaultProfilePicture from "@/assets/defaultPNG.png";
  
  export default {
    components: {
      NavBar
    },
    computed: {
      getRolesAndPermissions() {
        return this.$store.getters.getRolesAndPermissions;
      }
    },
    data() {
      return {
        patient: {},
        defaultProfilePicture
      };
    },
    methods: {
      back() {
        if(this.getRolesAndPermissions.roles[0] == "patient"){
          this.$router.push('/dashboard');
        } else {
          this.$router.push('/patients');
        }
      },
      async deletePatient(patient) {
        const response = await axios.delete('/api/patients/' + patient.id);
        if (response.status === 200) {
          alert('Patient deleted.');
          this.$router.go(-1);
        }
      },
      gotoEdit() {
        this.$router.push({
          name: 'patientsEdit',
          params: { id: this.$route.params.id }
        });
      }
    },
    async created() {
      const response = await axios.get('/api/patients/' + this.$route.params.id);
      this.patient = response.data.patient;
    }
  };
  </script>
  
  <style scoped>
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
    max-width: 800px;
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
  