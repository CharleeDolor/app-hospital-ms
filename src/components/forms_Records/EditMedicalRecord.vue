<template>
    <div class="background-image">
      <div class="wrapper">
        <div class="header">
          <div class="logo">
            <img :src="require('@/assets/medicrecord.jpg')" alt="Medical record" class="imglog">
          </div>
         <!--Doctor: Can update patient medical records.-->
          <div class="name">Edit Medical Record</div>  
        </div>
        <NavBar></NavBar>
        <form @submit.prevent="updateMedicalRecord">
          <div class="form-group">
            <label for="patient_name">Patient Name:</label>
            <input type="text" name="patient_name" v-model="patient_name" id="patient_name">
          </div>
  
          <div class="form-group">
            <label for="doctor_name">Doctor Name:</label>
            <input type="text" name="doctor_name" v-model="doctor_name" id="doctor_name">
          </div>
  
          <div class="form-group">
            <label for="diagnosis">Diagnosis:</label>
            <input type="text" name="diagnosis" id="diagnosis" v-model="diagnosis">
          </div>
  
          <div class="form-group">
            <label for="date_of_consultation">Date of Consultation:</label>
            <input type="date" name="date_of_consultation" id="date_of_consultation" v-model="date_of_consultation">
          </div>
  
          <div class="form-group">
            <label for="recommendations">Recommendations:</label>
            <textarea name="recommendations" id="recommendations" cols="20" rows="5" v-model="recommendations"></textarea>
          </div>
  
          <div>
            <button type="submit" class="btn btn-warning m-2">Update</button>
            <button @click="cancel" class="btn btn-secondary">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import axios from '@/lib/axios';
  
  export default {
    components: {
      NavBar
    },
  
    data() {
      return {
        patient_name: "",
        doctor_name: "",
        diagnosis: "",
        date_of_consultation: "",
        recommendations: ""
      }
    },
  
    methods: {
      async updateMedicalRecord() {
        try {
          const response = await axios.put('/api/records/' + this.$route.params.id, {
            patient_name: this.patient_name,
            doctor_name: this.doctor_name,
            diagnosis: this.diagnosis,
            date_of_consultation: this.date_of_consultation,
            recommendations: this.recommendations
          });
  
          if (response.status == 200) {
            alert('Medical record updated successfully');
            this.$router.push('/records');
          }
        } catch (error) {
          console.error("Error updating medical record:", error);
        }
      },
  
      cancel() {
        this.$router.push('/records');
      },
  
      async fetchMedicalRecord() {
        try {
          const response = await axios.get('/api/records/' + this.$route.params.id);
          const record = response.data.record;
          this.patient_name = record.patient_name;
          this.doctor_name = record.doctor_name;
          this.diagnosis = record.diagnosis;
          this.date_of_consultation = record.date_of_consultation;
          this.recommendations = record.recommendations;
        } catch (error) {
          console.error("Error fetching medical record details:", error);
        }
      }
    },
  
    async created() {
      await this.fetchMedicalRecord();
    }
  }
  </script>
  
  <style scoped>
.background-image {
  width: 100%;
  min-height: 100vh; 
  background-image: url('https://assets.materialup.com/uploads/6102cce0-dc3c-42a3-ba0e-84d25f8a7cd3/preview.gif');
  background-size: cover; 
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
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
  
  .form-group {
    margin-bottom: 20px;
  }
  
  .form-group label {
    font-weight: bold;
    margin-bottom: 5px;
    display: block;
  }
  
  input[type="text"],
  input[type="date"],
  textarea {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    font-size: 16px;
  }
  
  button {
    width: auto;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  
  .btn-warning {
    background-color: #ffc107;
    color: #333;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: #fff;
  }
  
  .btn-warning:hover,
  .btn-secondary:hover {
    opacity: 0.8;
  }
  
  </style>
  