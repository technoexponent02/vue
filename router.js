import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'


// const AboutLazy = r => require.ensure([], () => r(require('../components/About')))
// const UsersLazy = r => require.ensure([], () => r(require('../components/Users')))

// register
const RegisterProLazy = r => require.ensure([], () => r(require('./views/Register/Professional')))
const RegisterPerLazy = r => require.ensure([], () => r(require('./views/Register/Personal')))
const ResetLazy = r => require.ensure([], () => r(require('./views/ForgetAndReset/Reset')))

const ProfileLazy = r => require.ensure([], () => r(require('./views/User/Profile')))

const CreateAdLazy = r => require.ensure([], () => r(require('./views/Ad/CreateAd')))


Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: AboutLazy
    // },
    // {
    //   path: '/users',name:
    //   'users',
    //   component: UsersLazy
    // },
    // register
    {
      path: '/register-proffessional',
      name: 'professional',
      component: RegisterProLazy
    },
    {
      path: '/register-personal',
      name: 'personal',
      component: RegisterPerLazy
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetLazy
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileLazy
    },
    {
      path: '/place-ad',
      name: 'place-ad',
      component: CreateAdLazy
    }
  ]
})
