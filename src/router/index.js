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
import ForbiddenPage from '@/components/ForbiddenPage.vue';

import { createRouter, createWebHistory } from 'vue-router'

function routeGuard(to, from, next, permission){
  if (localStorage.getItem('token')) {
    if( localStorage.getItem('vuex').indexOf(permission) == -1){
      next('/forbidden');
    }
    next();
  } else {
    next('/');
  }
}

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
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'view patients'),
    component: PatientsPage
  },
  {
    path: '/patients/create',
    name: 'patientsAdd',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'create patients'),
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
},
  {
    path: '/patients/edit/:id',
    name: 'patientsEdit',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'edit patients'),
    component: EditPatient
  },
  {
    path: '/doctors',
    name: 'doctors',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'view doctors'),
    component: DoctorsPage
  },
  {
    path: '/doctors/show/:id',
    name: 'doctorsShow',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'view doctors'),
    component: DoctorDetails
  },
  {
    path: '/doctors/edit/:id',
    name: 'doctorsEdit',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'edit doctors'),
    component: EditDoctor
  },
  {
    path: '/doctors/create/',
    name: 'doctorsAdd',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'create doctors'),
    component: AddDoctor
  },
  {
    path: '/records',
    name: 'records',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'view records'),
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
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'view appointments'),
    component: AppointmentsPage
  },
  {
    path: '/appointments/create',
    name: 'appointmentsCreate',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'create appointments'),
    component: CreateAppointment
  },
  {
    path: '/appointments/edit/:id',
    name: 'appointmentsEdit',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'edit appointments'),
    component: EditAppointment
  },
  {
    path: '/records/consultation/:id',
    name: 'recordsConsultation',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'create records'),
    component: ConsultationOngoing
  },
  {
    path: '/records/create/:id',
    name: 'recordsCreate',
    beforeEnter: (to, from, next) => routeGuard(to, from, next, 'create records'),
    component: CreateRecord
  },

  {
    path: '/forbidden',
    name: 'forbidden',
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next();
      } else {
        next('/');
      }
    },
    component: ForbiddenPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
