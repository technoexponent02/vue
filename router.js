import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
// import About from './views/About.vue'

import {TOKEN, AUTH_DATA} from './http';


// const AboutLazy = r => require.ensure([], () => r(require('../components/About')))
// const UsersLazy = r => require.ensure([], () => r(require('../components/Users')))

// register
const RegisterProLazy = r => require.ensure([], () => r(require('./views/Register/Professional')))
const RegisterPerLazy = r => require.ensure([], () => r(require('./views/Register/Personal')))
const ResetLazy = r => require.ensure([], () => r(require('./views/ForgetAndReset/Reset')))

const ProfileLazy = r => require.ensure([], () => r(require('./views/User/Profile')))

const CreateAdLazy = r => require.ensure([], () => r(require('./views/Ad/CreateAd')))
const EditAdLazy = r => require.ensure([], () => r(require('./views/Ad/EditAd')))
const MyAdLazy = r => require.ensure([], () => r(require('./views/Ad/MyAd')))
const AdDetailsLazy = r => require.ensure([], () => r(require('./views/Ad/AdDetails')))
const MyFovouriteLazy = r => require.ensure([], () => r(require('./views/Ad/MyFovourite')))
const MySavedLazy = r => require.ensure([], () => r(require('./views/Ad/MySaved')))

const ClassifiedSearchLazy = r => require.ensure([], () => r(require('./views/Search/ClassifiedSearch')))

const CreateShopLazy = r => require.ensure([], () => r(require('./views/Shop/CreateShop')))
const ViewShopLazy = r => require.ensure([], () => r(require('./views/Shop/ViewShop')))
const ShopsLazy = r => require.ensure([], () => r(require('./views/Shop/Shops')))


Vue.use(Router)

// routing auth guard
const routerGuard = (to, from, next) => {
  // $('.topsrcatgsl').html('toutes catégories');

  // console.log(to, from)
  if(to.name == 'deals' && from.name == 'requests' || to.name == 'deals' && from.name == 'search'){
    setTimeout(() => {
        window.location.reload()
    }, 100);
  } else if(to.name == 'requests' && from.name == 'deals' || to.name == 'requests' && from.name == 'search'){
    setTimeout(() => {
        window.location.reload()
    }, 100);
  }
  
  // removing search
  if(window.location.pathname != 'search'){
    setTimeout(() => {
      $('#mainsearch').val('');
      $('.searchcatg').prop('checked', false);
    }, 500)
  }

  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 100);

  if (TOKEN != undefined) {
    next()
  } else {
    // alert('Please Login!')
    sessionStorage.setItem('tooNotLoggedIn', 1)
    window.location.href = '/'
    next(false)
  }
};

// routing auth guard
const routerProGuard = (to, from, next) => {
  // $('.topsrcatgsl').html('toutes catégories');
  // console.log(to, from)

  if(from.name == 'edit-shop' && to.name == 'create-shop'){
    window.location.reload()
  }

  // removing search
  if(window.location.pathname != 'search'){
    setTimeout(() => {
      $('#mainsearch').val('');
      $('.searchcatg').prop('checked', false);
    }, 500)
  }

  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 100);

  if (TOKEN != undefined) {
    if(AUTH_DATA.type == 1){
      alert('You are not a pro member!')
      window.location.href = '/profile'
    } else {
      next()
    }
  } else {
    // alert('Please Login!')
    window.location.href = '/'
    next(false)
  }
};


// routing public guard
const routerPublicGuard = (to, from, next) => {

  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 100);

  if (TOKEN == undefined) {
    next()
  } else {
    // alert('You are logged in!')
    window.location.href = '/profile'
    next(false)
  }
};



export default new Router({
  mode: 'history',
  linkActiveClass: 'link-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: routerPublicGuard
    },
    {
      path: '/register-proffessional',
      name: 'professional',
      component: RegisterProLazy,
      beforeEnter: routerPublicGuard
    },
    {
      path: '/register-personal',
      name: 'personal',
      component: RegisterPerLazy,
      beforeEnter: routerPublicGuard
    },
    {
      path: '/reset',
      name: 'reset',
      component: ResetLazy,
      beforeEnter: routerPublicGuard
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/place-ad',
      name: 'place-ad',
      component: CreateAdLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/my-ad',
      name: 'my-ad',
      component: MyAdLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/ad-details',
      name: 'ad-details',
      component: AdDetailsLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/edit-ad',
      name: 'edit-ad',
      component: EditAdLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/my-fovourite',
      name: 'my-fovourite',
      component: MyFovouriteLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/my-saved',
      name: 'my-saved',
      component: MySavedLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/search',
      name: 'search',
      component: ClassifiedSearchLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/deals',
      name: 'deals',
      component: ClassifiedSearchLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/requests',
      name: 'requests',
      component: ClassifiedSearchLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/create-shop',
      name: 'create-shop',
      component: CreateShopLazy,
      beforeEnter: routerProGuard
    },
    {
      path: '/edit-shop',
      name: 'edit-shop',
      component: CreateShopLazy,
      beforeEnter: routerProGuard
    },
    {
      path: '/view-shop',
      name: 'view-shop',
      component: ViewShopLazy,
      beforeEnter: routerProGuard
    },
    {
      path: '/user-shop',
      name: 'user-shop',
      component: ViewShopLazy,
      beforeEnter: routerGuard
    },
    {
      path: '/shops',
      name: 'shops',
      component: ShopsLazy,
      beforeEnter: routerGuard
    },
  ]
})
