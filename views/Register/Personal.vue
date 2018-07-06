<template>
    <div class="register per">

        <section class="creatAccountCont">
            <a href="/" class="accountLogo">
                <img src="assets/images/logo-orange.png" alt="">
            </a>
            <h2>Create your account</h2>

            <form autocomplete="off" @submit.prevent="validateBeforeSubmit">
                <div class="form-group">
                    <label class="fldTl inline">Civility</label>
                    <label class="rdoLi">
                        <input type="radio" name="Civility" value="M" v-model="register.gender">
                        <span class="ico"></span>
                        Mr
                    </label>
                    <label class="rdoLi">
                        <input type="radio" name="Civility" value="F" v-model="register.gender">
                        <span class="ico"></span>
                        Mrs
                    </label>
                </div>
                <div class="formGroup">
                    <input type="text" name="firstname" v-validate="'required'" v-model="register.firstname" :class="{'input': true, 'is-danger': errors.has('firstname') }"  placeholder="First Name" class="field">
                    <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                </div>

                <div class="formGroup">
                    <input type="text" name="lastname" v-validate="'required'" v-model="register.lastname" :class="{'input': true, 'is-danger': errors.has('lastname') }" placeholder="Last Name" class="field">
                    <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                </div>

               <div class="formGroup">
                    <input type="text" name="email" v-validate="'required|email'" v-model="register.email" :class="{'input': true, 'is-danger': errors.has('email') }" placeholder="E-mail Address" class="field">
                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                </div> 

                <div class="formGroup">
                    <input type="password" name="password" v-validate="'required|min:6'" v-model="register.password" :class="{'input': true, 'is-danger': errors.has('password') }" placeholder="Password" class="field">
                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                </div>

                <div class="formGroup">
                    <input type="password" name="confirm password" v-validate="'required|min:6|confirmed:password'" v-model="register.cpassword" :class="{'input': true, 'is-danger': errors.has('confirm password') }" placeholder="Confirm Password" class="field">
                    <span v-show="errors.has('confirm password')" class="help is-danger">{{ errors.first('confirm password') }}</span>
                </div>

                <div class="formGroup">
                    <div class="checkboxList">
                        <label class="chkBox">
                            <input type="checkbox" name="terms">
                            <i class="fa fa-square-o"></i> I would like to receive offers from partners of the site leboncoin likely to interest me
                        </label>
                    </div>
                    <!-- <span class="help is-danger" v-show="errors.has('terms')">{{ errors.first('terms') }}</span> -->

                    <div class="checkboxList">
                        <label class="chkBox">
                            <input type="checkbox" name="cond" v-validate="'required'">
                            <i class="fa fa-square-o"></i> I accept the <a href="">General Conditiond of sale</a>
                        </label>
                    </div>
                    <span class="help is-danger" v-show="errors.has('cond')">{{ errors.first('cond') }}</span>

                </div>
                <div class="formGroup align-center">
                    <input type="submit" value="Create Now" class="btn btn-warning btn-md lg">
                </div>
                <div class="formGroup align-center">
                    <p class="formTxt"><i class="fa fa-lock"></i> 100% Secure and Private</p>
                </div>
                <div class="formGroup align-center">
                    <p class="formTxt">If you are using Facebook or Google to connect to Tootella you will need to get your Password Here</p>
                </div>
                <div class="formGroup align-center">
                    <p class="formTxt light">lorem ipsum © Info. site name</p>
                </div>
            </form>


        </section>

    </div>
</template>

<script>
import {HTTP} from '../../http';

export default {
    name: 'Personal',
    components: {
        // register component
    },
    data () {
        return {
            register: {
                gender: 'M',
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                cpassword: ''
            }
        }
    },
    mounted() {
        // console.log(this.$route.path)
        if(this.$route.path == '/register-personal'){
            $('body').addClass('removeHeaderFooter');
        }
    },
    destroyed(){
        $('body').removeClass('removeHeaderFooter');
    },
    methods: {
        // register submit if form is valid
        validateBeforeSubmit() {
            this.$validator.validateAll().then((result) => {
                if (result) {
                    // eslint-disable-next-line
                    this.personalRegister();
                    
                    return;
                }
                
                alert('Correct them errors!');
                
            });
        },

        // form ajax call
        personalRegister(){
            // make the filtered object from the form data
            let personalData = {
                first_name: this.$data.register.firstname,
                last_name: this.$data.register.lastname,
                email: this.$data.register.email,
                password: this.$data.register.password,
                gender: this.$data.register.gender,
                type: 1
            }
            // ajax post method call
            HTTP.post(`register`, personalData)
            .then(response => {
                // console.log(response);
                let data = response.data;
                if(data.status == "success"){
                    alert('Please login now')
                    // back to home
                    window.location.href = '/'
                }
                if(data.status == "fail"){
                    alert(data.errors.email[0]);
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
.chkBox input:checked + .fa:before{
    color: #fff;
}
.rdoLi .ico{
    border-color: #fff;
}
.rdoLi .ico:before{
    background-color: #fff;
}
.help.is-danger{
    width: 100%;
    color: #fff;
}
</style>
