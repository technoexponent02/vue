<template>
    <div class="register prof">

        <div class="brdt0op"></div>
        <div class="creatYourAcCont">
            <div class="container">
                <div class="creatAcForm">
                    <h2>Create Your Account</h2>
                    <h3>Your contact details</h3>

                    <form autocomplete="off" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group">
                            <label class="fldTl inline">Civility</label>
                            <label class="rdoLi">
                                <input type="radio" name="Civility" value="M" v-model="register.gender">
                                <span class="ico"></span> Mr
                            </label>
                            <label class="rdoLi">
                                <input type="radio" name="Civility" value="F" v-model="register.gender">
                                <span class="ico"></span> Mrs
                            </label>
                        </div>
                        <div class="row">

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">First name<em>*</em></label>
                                    <input type="text" class="form-control" name="firstname" v-validate="'required'" v-model="register.firstname" :class="{'input': true, 'is-danger': errors.has('firstname') }">
                                    <span v-show="errors.has('firstname')" class="help is-danger">{{ errors.first('firstname') }}</span>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Last name<em>*</em></label>
                                    <input type="text" class="form-control" name="lastname" v-validate="'required'" v-model="register.lastname" :class="{'input': true, 'is-danger': errors.has('lastname') }">
                                    <span v-show="errors.has('lastname')" class="help is-danger">{{ errors.first('lastname') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row">

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Company Name<em>*</em></label>
                                    <input type="text" class="form-control" name="companyname" v-validate="'required'" v-model="register.companyname" :class="{'input': true, 'is-danger': errors.has('companyname') }">
                                    <span v-show="errors.has('companyname')" class="help is-danger">{{ errors.first('companyname') }}</span>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Siret<em>*</em></label>
                                    <input type="text" class="form-control" v-model="register.siret" name="siret" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('siret') }">
                                    <span v-show="errors.has('siret')" class="help is-danger">{{ errors.first('siret') }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="fldTl">Section<em>*</em></label>
                            <select class="form-control error" v-model="register.section" name="section" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('section') }">
                                <option value="">Select your category</option>
                                <option :value="category.id" v-for="category in categoryList" :key="category.id">{{category.title}}</option>
                            </select>
                            <span v-show="errors.has('section')" class="help is-danger">{{ errors.first('section') }}</span>
                        </div>

                        <div class="form-group">
                            <label class="fldTl">Address</label>
                            <!-- <input type="text" class="form-control" name="address" v-validate="'required'" v-model="register.address" :class="{'input': true, 'is-danger': errors.has('address') }">
                            <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>-->
                            <!-- <vue-google-autocomplete
                                id="map"
                                classname="form-control"
                                placeholder="Please type your address"
                                v-on:placechanged="getAddressData"
                            >
                            </vue-google-autocomplete> -->

                            
                            <input id="autocomplete" placeholder="Enter your address"
                                    class="form-control"
                                    name="address" 
                                    v-validate="'required'" 
                                    v-model="register.address" 
                                    :class="{'input': true, 'is-danger': errors.has('address') }"
                                    @keyup="getPlace" type="text"></input>
                            <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>



                        </div>

                        <div class="row">

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">City or ZIP code<em>*</em></label>
                                    <input type="text" class="form-control" name="city" :disabled="cityDisabled" v-validate="'required'" v-model="register.city" :class="{'input': true, 'is-danger': errors.has('city') }">
                                    <span v-show="errors.has('city')" class="help is-danger">{{ errors.first('city') }}</span>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Phone<em>*</em></label>
                                    <input type="text" class="form-control" name="phone" v-validate="'required|numeric'" v-model="register.phone" :class="{'input': true, 'is-danger': errors.has('phone') }">
                                    <span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
                                </div>
                            </div>

                        </div>
                        <h3>Your email and password</h3>
                        <div class="form-group">
                            <label class="fldTl">E-mail Adress<em>*</em></label>
                            <input type="text" class="form-control" name="email" v-validate="'required|email'" v-model="register.email" :class="{'input': true, 'is-danger': errors.has('email') }">
                            <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                        </div>

                        <div class="row">

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Password<em>*</em></label>
                                    <input type="password" class="form-control" name="password" v-validate="'required|min:6'" v-model="register.password" :class="{'input': true, 'is-danger': errors.has('password') }">
                                    <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                                </div>
                            </div>

                            <div class="col-sm-6">
                                <div class="form-group">
                                    <label class="fldTl">Confirm Password<em>*</em></label>
                                    <input type="password" class="form-control" name="confirm password" v-validate="'required|min:6|confirmed:password'" v-model="register.cpassword" :class="{'input': true, 'is-danger': errors.has('confirm password') }">
                                    <span v-show="errors.has('confirm password')" class="help is-danger">{{ errors.first('confirm password') }}</span>
                                </div>
                            </div>

                        </div>

                        <div class="form-group">
                            <div class="checkboxList">
                                <label class="chkBox">
                                    <input type="checkbox" name="terms" v-validate="'required'">
                                    <i class="fa fa-square-o"></i> I accept the <a href="">General Conditiond of sale</a>
                                </label>
                            </div>
                            <span class="help is-danger" v-show="errors.has('terms')">{{ errors.first('terms') }}</span>
                        </div>

                        <div class="form-group">
                            <input type="submit" value="Create My Account" class="btn btn-md btn-warning full">
                        </div>
                    </form>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {HTTP} from '../../http';
import VueGoogleAutocomplete from 'vue-google-autocomplete';

export default {
  name: 'Professional',
  components: {
      VueGoogleAutocomplete
  },
  data () {
    return {
        register: {
            gender: 'M',
            firstname: '',
            lastname: '',
            companyname: '',
            section: '',
            siret: '',
            address: '',
            city: '',
            gcity:'',
            gzip: '',
            phone: '',
            email: '',
            password: '',
            cpassword: ''
        },
        categoryList: '',
        categoryParentId: '',
        cityDisabled: false
    }
  },
  created(){
    //  category list fetching
    HTTP.get(`categories-all`)
    .then(response => {
        // if(response.data.status == "success"){
            // console.log(response.data)
            this.$data.categoryList = response.data
        // }
    })
    .catch(e => {
       console.log(e);
       alert('Something went wrong when fetching category list!'); 
    })
  },
  methods: {
    // register submit if form is valid
    validateBeforeSubmit() {
        this.$validator.validateAll().then((result) => {
            if (result) {
                // eslint-disable-next-line
                this.professionalRegister();
                // alert('submitted')
                
                return;
            }
            
            alert('Correct them errors!');
            
        });
    },

    // form ajax call
    professionalRegister(){
        // make the filtered object from the form data
        let professionalData = {
            first_name: this.$data.register.firstname,
            last_name: this.$data.register.lastname,
            company_name: this.$data.register.companyname,
            siret: this.$data.register.siret,
            category: this.$data.register.section,
            email: this.$data.register.email,
            password: this.$data.register.password,
            gender: this.$data.register.gender,
            type: 2,
            phone_number: this.$data.register.phone,
            address: this.$data.register.address,
            zipcode: this.$data.register.city
        }

        // ajax post method call
        HTTP.post(`register`, professionalData)
        .then(response => {
            // console.log(response);
            
            let data = response.data;
            // console.log(data)
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
    },



    // get place data
    getPlace() {
        let input = document.getElementById('autocomplete');
        let options = {
            types: ['geocode'],
            componentRestrictions: {country: 'fr'}
        };
        let place = new google.maps.places.Autocomplete(input, options);

        var that = this;

        // console.log(place)
        google.maps.event.addListener(place, 'place_changed', function()
        {
            let selected_place = place.getPlace();
            // console.log(selected_place.formatted_address);

            that.$data.register.address = selected_place.formatted_address;
            
            // console.log(selected_place.geometry.location.lat());
            // console.log(selected_place.geometry.location.lng());  
            
            
            let componentForm = {
                /*street_number: 'short_name',
                route: 'long_name',*/
                locality: 'long_name',
                administrative_area_level_1: 'long_name',
                /*country: 'long_name',*/
                postal_code: 'short_name'
            };
            for (let i = 0; i < selected_place.address_components.length; i++) {
                let addressType = selected_place.address_components[i].types[0];
                if (componentForm[addressType]) {
                    if(addressType == 'locality')
                    {
                        let autocomplete_suburb_val = selected_place.address_components[i][componentForm[addressType]];  
                        // this.user_suburb = autocomplete_suburb_val;    
                        
                        // console.log(autocomplete_suburb_val)
                        that.$data.register.gcity = autocomplete_suburb_val;


                    }
                    if(addressType == 'administrative_area_level_1')
                    {
                        let autocomplete_state_val = selected_place.address_components[i][componentForm[addressType]];  
                        // this.user_state = autocomplete_state_val;
                        //  console.log(autocomplete_state_val)        
                    }
                    if(addressType == 'postal_code')
                    {
                        let autocomplete_postcode_val = selected_place.address_components[i][componentForm[addressType]];
                        // this.user_postcode = autocomplete_postcode_val; 
                        // console.log(autocomplete_postcode_val) 
                        that.$data.register.gzip = autocomplete_postcode_val; 
                    }
                }
            }
            // make city zip
            if(that.$data.register.gcity == '' || that.$data.register.gzip == ''){
                that.$data.register.city = ''
            } else {
                that.$data.register.city = `${that.$data.register.gcity} - ${that.$data.register.gzip}`;
                that.cityDisabled = true;
            }


        });
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
    color: #fff;
}
</style>
