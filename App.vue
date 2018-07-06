<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
        <section class="fullpage">
            <!-- header -->
            <auth-header v-if="isAuth" />
            <app-header v-else />
            <!-- main view -->
            <div class="topgap">
                <!-- <loading-page v-if="$root.loading"></loading-page> -->
                <router-view></router-view>
            </div>

        </section>

        <!-- footer -->
        <app-footer/>

        <!-- scroll top -->
        <a class="scrollup" style="display:none;">Scroll</a>

        <!-- login -->
        <login></login>
    </div>
</template>


<script>
import Header from '@/components/layout/Header'
import AuthHeader from '@/components/layout/AuthHeader'
import Footer from '@/components/layout/Footer'
// import LoadingPage from '@/components/LoadingPage'
import Login from './views/Login/Login'
import {TOKEN} from './http';
// require('vue-image-lightbox/dist/vue-image-lightbox.min.css')

export default {
    components: {
        'app-header': Header,
        'auth-header': AuthHeader,
        'app-footer': Footer,
        'login': Login,
        // 'loading-page': LoadingPage
    },
    data() {
        return {
            isAuth: false
        }
    },
    mounted() {
        // console.log(this.$route.path)
        if(TOKEN == undefined){
            this.isAuth = false;
        } else {
            this.isAuth = true;
        }
        // console.log(TOKEN)
        setTimeout(() => {
            if(location.hash.split('#')[1] == 'editservice' || location.hash.split('#')[1] == 'addservice'){
                location.hash = '';
                if(sessionStorage.getItem('editService') != null){
                    sessionStorage.removeItem('editService')
                }
            }
        }, 1000)
    },
    methods: {
    }
}
</script>

<style lang="scss">
</style>
