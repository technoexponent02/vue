<template>
    <div class="forgetcom">
        <form @submit.prevent="validateBeforeSubmitForget">
            <div class="formGroup">
                <input v-validate="'required|email'" v-model="forget.email" :class="{'input': true, 'is-danger': errors.has('email') }" type="text" name="email" placeholder="E-mail Address" class="field" />
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </div>
            <div class="formGroup align-center">
                <input type="submit" value="Submit Now" class="btn btn-warning btn-md lg" />
            </div>
        </form>
    </div>
</template>

<script>
import {HTTP} from '../../http';

export default {
  name: 'Forget',
  data () {
    return {
        forget: {
            email: ''
        },
    }
  },
  methods: {
    // forget form submit
    validateBeforeSubmitForget(){
        this.$validator.validateAll().then((result) => {
        if (result) {
            // eslint-disable-next-line
            this.forgetSubmit();
            
            return;
        }
        
        alert('Correct them errors!');
        
        });
    },
    // login form validate and submit
    forgetSubmit(){

        HTTP.post(`password/email-token`, this.$data.forget)
        .then(response => {
            // console.log(response);
            let data = response.data;
            if(data.status == "success"){
                alert(data.message)
            }
            if(data.status == "fail"){
                if(data.errors.email[0]){
                    alert(data.errors.email[0]);
                }
                
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
.help.is-danger{
    width: 100%;
}
</style>
