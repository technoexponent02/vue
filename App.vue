<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/> -->
        <section class="fullpage">
            <!-- header -->
            <app-header/>
            <!-- main view -->
            <router-view/>

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
import Footer from '@/components/layout/Footer'
import Login from './views/Login/Login'

export default {
    components: {
        'app-header': Header,
        'app-footer': Footer,
        'login': Login
    },
    mounted() {
        // console.log(this.$route.path)
    },
    methods: {
    }
}
</script>

<style lang="scss">
</style>
