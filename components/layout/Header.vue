<template>
  <div id="mainheader">
    <!-- register choose popup -->
    <div class="registerpop">
        <sweet-modal ref="register" overlay-theme="dark">
            <h2>Create Your Account</h2>
            <p>Please choose your account type</p>
            <div class="choosebtn">
                <a href="/register-personal">Personal Account</a>
                <a href="/register-proffessional">Professional Account</a>
            </div>
        </sweet-modal>
    </div>
    <!-- register choose popup -->

    <header>
        <div class="container clearfix">
            <div class="logo pull-left">
                <div class="vcenter">
                    <a href="/">
                        <img src="assets/images/logo.png" class="img-responsive">
                    </a>
                </div>
            </div>
            <button class="slidemeubtn"><i class="fa fa-bars"></i></button>

            <div class="overlay"></div>

            <ul class="nav navbar-nav navbar-right loginmenu" v-if="checkNotLoggedIn">
                <li>
                    <a href="javascript:void(0);" id="register-trigg" @click="$refs.register.open()">
                        <span class="ico">
                            <img src="assets/images/user.png" class="img-responsive onvxs">
                            <img src="assets/images/user-white.png" class="img-responsive oflg">
                        </span>
                        Sign Up
                    </a>
                </li>
                <li><a href="javascript:void(0);" id="loginclick"><span class="ico"><img src="assets/images/key.png" class="img-responsive onvxs"><img src="assets/images/key-white.png" class="img-responsive oflg"></span>Log In</a></li>
            </ul>

            <ul class="nav navbar-nav navbar-right loginmenu" v-else>
                <li><a href="javascript:void(0);" id="logout" @click="logout">Log out</a></li>
            </ul>

            

            <div class="mainmenu clearfix">
                <ul class="nav navbar-nav pull-right">
                    <li>
                        <router-link to="/">Home</router-link>
                    </li>
                    <li>
                        <router-link to="/place-ad">Place an ad</router-link>
                    </li>
                    <li><a href="#">Deals </a></li>
                    <li><a href="#">Requests</a></li>
                    <li><a href="#">My Favourites</a></li>
                    <li><a href="#">Shops</a></li>
                </ul>
            </div>

        </div>
    </header>

  </div>
</template>

<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'

export default {
    name: 'Header',
    components: {
        SweetModal,
		SweetModalTab
    },
    data () {
        return {
            checkNotLoggedIn: true
        }
    },
    created() {

        if(localStorage.getItem('tootellaUser') == null){
            this.checkNotLoggedIn = true
        } 
        else {
            this.checkNotLoggedIn = false
        }

        // if(window.location.pathname == "/tootella/public/register-personal"){
        //     alert(true)
        // }else{
        //     alert(false)
        // }

    },
    methods: {
        // open the login form
        openRegister(){
            // alert()
            this.$refs.register.open();
        },

        logout(){
            localStorage.removeItem('tootellaUser');
            window.location.href = '/';
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
