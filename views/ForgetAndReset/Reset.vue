<template>
    <div class="register per">

        <section class="creatAccountCont">
            <a href="/tootella/public/" class="accountLogo">
                <img src="assets/images/logo-orange.png" alt="">
            </a>
            <h3 style="color: #fff; line-height: 50px;">Set New Password</h3>

            <form autocomplete="off" @submit.prevent="validateBeforeSubmit">


                <div class="formGroup">
                    <input type="password" name="password" v-validate="'required|min:6'" v-model="reset.password" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="New Password" class="field">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>

                <div class="formGroup">
                    <input type="password" name="confirm password" v-validate="'required|min:6|confirmed:password'" v-model="reset.cpassword" :class="{'input': true, 'is-danger': errors.has('confirm password') }" placeholder="Confirm Password" class="field">
                    <span v-show="errors.has('confirm password')" class="help is-danger">{{ errors.first('confirm password') }}</span>
                </div>

                <div class="formGroup align-center">
                    <input type="submit" value="Submit" class="btn btn-warning btn-md lg">
                </div>
                
            </form>


        </section>

    </div>
</template>

<script>
import {HTTP} from '../../http';

export default {
  name: 'Reset',
  components: {
  },
  data () {
    return {
        reset: {
            password: '',
            cpassword: '',
            token: ''
        }
    }
  },
  created(){
  },
  mounted(){
    // console.log(this.$route.query.token)
    // assign the token data to the reset object
    this.$data.reset.token = this.$route.query.token;

    if(this.$route.path == '/reset'){
        $('body').addClass('removeHeaderFooter');
    }
  },
  destroyed(){
    $('body').removeClass('removeHeaderFooter');
  },
  methods: {
    // reset password submit if form is valid
    validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                // eslint-disable-next-line
                this.resetPass();
                // alert('submitted')
                
                return;
            }
            
            alert('Correct them errors!');
            
        });
    },

    // form ajax call
    resetPass(){
        // make the filtered object from the form data
        let resetPassData = {
            reset_token: this.$data.reset.token,
            password: this.$data.reset.password
        }

        // ajax post method call
        HTTP.post(`password/reset`, resetPassData)
        .then(response => {
            // console.log(response);
            
            let data = response.data;
            // console.log(data)
            if(data.status == "success"){
                // alert('Please login now')
                // back to home
                window.location.href = '/tootella/public/'
            }
            if(data.status == "fail"){
                alert(data.errors.password[0]);
            }
        })
        .catch(e => {
            console.log(e);
            alert('Something went wrong!');
        })
    }



  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.register.prof{
    background-color: #eef1f5;
}
.help.is-danger{
    width: 100%;
}
</style>
