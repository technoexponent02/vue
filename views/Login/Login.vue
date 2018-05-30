<template>

    <diV>


        <!-- register choose popup -->
        <div class="registerpop">
            <sweet-modal ref="register" overlay-theme="dark">
                <h2>Create Your Account</h2>
                <p>Please choose your account type</p>
                <div class="choosebtn">
                    <a href="/tootella/public/register-personal">Personal Account</a>
                    <a href="/tootella/public/register-proffessional">Professional Account</a>
                </div>
            </sweet-modal>
        </div>
        <!-- register choose popup -->

        <div id="loginModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <a href="javascript:void(0);" id="loginClose" @click="loginModalClose">X</a>


                    <!-- login -->
                    <section class="creatAccountCont" v-if="notforget">
                        <a href="/tootella/public/" class="accountLogo">
                            <img src="assets/images/logo-orange.png" alt="" />
                        </a>
                        <h2>Login your account</h2>
                        <form @submit.prevent="validateBeforeSubmit">
                            <div class="formGroup">
                                <input v-validate="'required|email'" v-model="login.email" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" name="email" placeholder="E-mail Address" class="field" />
                                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                            </div>
                            <div class="formGroup">
                                <input type="password" name="password" v-validate="'required'" v-model="login.password" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password" class="field" />
                                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                            </div>
                            <div class="formGroup align-center">
                                <input type="submit" value="Login Now" class="btn btn-warning btn-md lg" />
                            </div>
                            <div class="formGroup align-center">
                                <a href="javascript:void(0);" id="forgetpass" @click="forgetPassToggle">Forget Password</a>
                            </div>
                            <div class="formGroup align-center">
                                <p class="formTxt">You do not have an account?</p>
                                <input type="button" value="Create an account" class="btn btn-wh-border btn-md lg" @click="openRegister" />
                            </div>
                        </form>
                    </section>

                    <!-- forget -->
                    <section class="forgetPass" v-else>
                        <a href="/tootella/public/" class="accountLogo">
                            <img src="assets/images/logo-orange.png" alt="" />
                        </a>
                        <h2>Forget password</h2>
                        <forget></forget>
                        <a href="javascript:void(0);" id="" @click="backtoLogin">Back to login</a>
                    </section>

                </div>
            </div>
        </div>


    </diV>

</template>

<script>

import {HTTP} from '../../http';
import { SweetModal, SweetModalTab } from 'sweet-modal-vue';
import Forget from '../ForgetAndReset/Forget'

export default {
  name: 'Login',
  components: {
    SweetModal,
	SweetModalTab,
    'forget': Forget
  },
  data () {
    return {
        login: {
            email: '',
            password: ''
        },
        notforget: true
    }
  },
  created() {
  },
  methods: {
    //   login form validation
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          // eslint-disable-next-line
          this.loginSubmit();
          
          return;
        }
        
        alert('Correct them errors!');
        
      });
    },
    // login form validate and submit
    loginSubmit(){

        HTTP.post(`login`, this.$data.login)
        .then(response => {

            // console.log(response);
            let data = response.data;
            if(data.status == "success"){
                // alert('successfully logged in')
                let authuser = {
                    token: '',
                    email: ''
                }
                authuser= data.user;
                /*authuser.token = data.user.api_token;
                authuser.email = data.user.email;
                authuser.first_name = data.user.first_name;
                authuser.last_name = data.user.last_name;
                authuser.type = data.user.type;
                authuser.gender = data.user.gender;*/

                
                localStorage.setItem('tootellaUser', JSON.stringify(authuser));

                //location.reload();
                window.location.href = '/profile'

            }
            if(data.status == "fail"){
                alert(data.error_message);
            }

        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        })

    },
    // open register form from login popup
    openRegister(){
        this.$refs.register.open();
    },
    // forget pass word view toggle
    forgetPassToggle(){
        this.notforget = false;
    },
    // forget pass to back to login view
    backtoLogin(){
        this.notforget = true;
    },
    // login popup close
    loginModalClose(){
        if(this.notforget == false){
            this.notforget = true; 
        }
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#loginClose{
    position: absolute;
    top: 5px;
    right: 15px;
    color: #fff;
    text-decoration: none;
    outline: none;
    font-size: 23px;
    font-weight: bold;
}
.help.is-danger{
    width: 100%;
}
#forgetpass{
    color: #fff;
    font-weight: bold;
    text-decoration: none;
    border-bottom: 1px dotted #fff;
}
.forgetPass{
    text-align: center;
    padding: 0 15%;
}
.forgetPass h2{
    font-size: 25px;
    color: #fff;
    line-height: 70px;
}

</style>
