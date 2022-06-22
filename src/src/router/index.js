import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import bootCampRegister  from '../components/bootCampRegister.vue'

Vue.use(VueRouter)


const router = new VueRouter({


  mode : 'history',

  routes :[

    {
      path: '/',
      name: 'home',
      component: HomeView
    },
{

  path :'/bootCampRegister',
  name : 'bootCampRegister',
  component : bootCampRegister
},



    
  ]


})

export default router
