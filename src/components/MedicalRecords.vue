<template>
    <div class="background-image">
      <div class="wrapper">
        <div class="header">
          <div class="logo">
            <img :src="require('@/assets/medicrecord.jpg')" alt="Medical record" class="imglog">
          </div>
          <div class="name">Medical Records</div>
        </div>
        <NavBar></NavBar>
        <div class="panel">
          <!-- admin panel -->
          <div v-if="this.getRolesAndPermissions.roles[0] == 'admin'">
            <div v-if="'message' in this.records">
              <h3>Seems empty here!</h3>
            </div>
            <div v-else>
              <h3>All Records</h3>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in records" :key="record.id">
                    <td>{{ record.patient_name }}</td>
                    <td>{{ record.doctor_name }}</td>
                    <td>{{ record.diagnosis }}</td>
                    <td>{{ record.date_of_consultation }}</td>
                    <td>{{ record.recommendations }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end admin panel -->
  
          <!-- patient panel -->
          <div v-if="this.getRolesAndPermissions.roles[0] == 'patient'">
            <div v-if="'message' in this.records">
              <h3>Seems empty here!</h3>
            </div>
            <div v-else>
              <h3>My Medical Records</h3>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in records" :key="record.id">
                    <td>{{ record.patient_name }}</td>
                    <td>{{ record.doctor_name }}</td>
                    <td>{{ record.diagnosis }}</td>
                    <td>{{ record.date_of_consultation }}</td>
                    <td>{{ record.recommendations }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <!-- end patient panel -->
  
          <!-- doctor panel -->
          <div v-if="this.getRolesAndPermissions.roles[0] == 'doctor'">
            <div v-if="'message' in this.records">
              <h3>Seems empty here!</h3>
            </div>
            <div v-else>
              <h3>Patient's Medical Records</h3>
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Name of Doctor</th>
                    <th>Diagnosis</th>
                    <th>Date of Consultation</th>
                    <th>Recommendations</th>
                    <th>Action</th> <!-- Add this column for edit action -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="record in records" :key="record.id">
                    <td>{{ record.patient_name }}</td>
                    <td>{{ record.doctor_name }}</td>
                    <td>{{ record.diagnosis }}</td>
                    <td>{{ record.date_of_consultation }}</td>
                    <td>{{ record.recommendations }}</td>
                    <td>
                        <router-link :to="'/records/edit/' + record.id" class="btn-edit"><i class="fa-regular fa-pen-to-square"></i></router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
                 
            </div>
          </div>
          <!-- end doctor panel -->
        </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue'
  import axios from '@/lib/axios'
  
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
        records: [],
      }
    },
  
    async beforeMount() {
      try {
        const response = await axios.get('/api/records');
        this.records = response.data;
  
        if ("message" in this.records) {
          this.records = response.data;
        } else {
          console.log(this.records)
        }
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    },
  }
  </script>
  
  <style scoped>
  .background-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    background-image: url('https://assets.materialup.com/uploads/6102cce0-dc3c-42a3-ba0e-84d25f8a7cd3/preview.gif');
    background-size: cover;
    background-position: center;
    overflow: hidden;
    justify-content: center;
  }
  
  .wrapper {
    width: 90%;
    max-width: 1200px;
    padding: 40px 30px 30px 30px;
    background-color: #ecf0f3;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .header {
    width: 100%;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .logo {
    width: 100px;
    margin-right: 20px;
  }
  
  .logo img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    box-shadow: 0px 0px 3px #5f5f5f,
                0px 0px 0px 5px #ecf0f3,
                8px 8px 15px #a7aaa7,
                -8px -8px 15px #fff;
  }
  
  .name {
    font-weight: 600;
    font-size: 1.8rem;
    letter-spacing: 1.3px;
    color: #555;
    text-align: center;
  }
  
  .panel {
    width: 100%;
    background-color: #fff;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 13px 13px 20px #cbced1;
  }
  
  h3 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  thead {
    background-color: #f4f4f4;
  }
  
  thead th {
    padding: 10px;
    text-align: left;
    border-bottom: 2px solid #ccc;
    font-size: 1rem;
  }
  
  tbody tr {
    transition: background-color 0.2s;
  }
  
  tbody tr:hover {
    background-color: #f1f1f1;
  }
  
  tbody td {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 0.9rem;
  }
  
  .wrapper .btn-edit {
    align-items: center;
    font-size: 18px;
    padding: 10px;
    border-radius: 15px;
    box-shadow: rgba(45, 35, 66, 0.5) 0 1px 2px, rgba(45, 35, 66, 0.5) 0 5px 10px -1px, #D6D6E7 0 -2px 0 inset;
    background-color: #e7b11b;
    border: none;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .wrapper .btn-edit:hover {
    background: linear-gradient(to bottom, #e7b11b, white);
    color: black;
    transform: scale(1.02);
  }
  
  .wrapper a {
    text-decoration: none;
    font-size: 1rem;
    color: rgb(5, 99, 193);
  }
  
  .wrapper a:hover {
    text-decoration: underline;
    transform: scale(1.1);
    color: #039BE5;
  }
  
  @media(max-width: 768px) {
    .wrapper {
      padding: 20px;
    }
  
    .panel {
      padding: 15px;
    }
  
    .name {
      font-size: 1.5rem;
    }
  
    table {
      font-size: 0.9rem;
    }
  }
  
  @media(max-width: 768px) {
    .wrapper {
      padding: 20px;
    }
  
    .panel {
      padding: 15px;
    }
  
    .name {
      font-size: 1.5rem;
    }
  
    table {
      font-size: 0.9rem;
    }
  }
  @media(max-width: 480px) {
    .logo img {
      width: 80px;
      height: 80px;
    }
  
    .name {
      font-size: 1.2rem;
    }
  
    table {
      font-size: 0.8rem;
    }
  
    .btn {
      font-size: 16px;
    }
  }
  </style>
  