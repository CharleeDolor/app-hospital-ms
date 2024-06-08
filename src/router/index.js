import DashboardPage from '@/components/DashboardPage.vue'
import LoginPage from '@/components/LoginPage.vue'
import PatientsPage from '@/components/PatientsPage.vue'
import EditPatient from '@/components/forms_Patients/EditPatient.vue'
import PatientDetails from '@/components/forms_Patients/PatientDetails.vue'
import AddPatient from '@/components/forms_Patients/AddPatient.vue'
import DoctorsPage from '@/components/DoctorsPage.vue'
import DoctorDetails from '@/components/forms_Doctors/DoctorDetails.vue'
import EditDoctor from '@/components/forms_Doctors/EditDoctor.vue'
import AddDoctor from '@/components/forms_Doctors/AddDoctor.vue'
import MedicalRecords from '@/components/MedicalRecords.vue'
import RegisterPatient from '@/components/RegisterPatient.vue'
import AppointmentsPage from '@/components/AppointmentsPage.vue'
import CreateAppointment from '@/components/forms_Appointments/CreateAppointment.vue';
import EditAppointment from '@/components/forms_Appointments/EditAppointment.vue'
import ConsultationOngoing from '@/components/forms_Records/ConsultationOngoing.vue'
import CreateRecord from '@/components/forms_Records/CreateRecord.vue'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: LoginPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: DashboardPage
  },
  {
    path: '/patients',
    name: 'patients',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: PatientsPage
  },
  {
    path: '/patients/create',
    name: 'patientsAdd',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: AddPatient
  },
  {
    path: '/patients/show/:id',
    name: 'patientsShow',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: PatientDetails
  },
  {
    path: '/patients/edit/:id',
    name: 'patientsEdit',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: EditPatient
  },
  {
    path: '/doctors',
    name: 'doctors',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: DoctorsPage
  },
  {
    path: '/doctors/show/:id',
    name: 'doctorsShow',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: DoctorDetails
  },
  {
    path: '/doctors/edit/:id',
    name: 'doctorsEdit',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: EditDoctor
  },
  {
    path: '/doctors/create/',
    name: 'doctorsAdd',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: AddDoctor
  },
  {
    path: '/records',
    name: 'records',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: MedicalRecords
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPatient
  },
  {
    path: '/appointments',
    name: 'appointments',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: AppointmentsPage
  },
  {
    path: '/appointments/create',
    name: 'appointmentsCreate',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: CreateAppointment
  },
  {
    path: '/appointments/edit/:id',
    name: 'appointmentsEdit',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: EditAppointment
  },
  {
    path: '/records/consultation/:id',
    name: 'recordsConsultation',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: ConsultationOngoing
  },
  {
    path: '/records/create/:id',
    name: 'recordsCreate',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: CreateRecord
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
