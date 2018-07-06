<template>
    <div>
        <div id="changPass">
            <modal 
                :is-show="isShow" 
                transition="fadeDown" 
                :show-footer="false" 
                @close="isShow=false" 
                :show-ok="false" 
                :show-cancel="false"
                :backdrop-closable="false"
            >
                <div class="">
                    <h3 class="modal_title text-center">Change Password</h3>

                    <form @submit.prevent="validateBeforeSubmit('cp')">
                    <div class="formeditp">
                        <div class="form-group">
                            <label>Current Password</label>
                            <input v-validate="'required'" v-model="changePass.current_password" type="password" class="form-control" placeholder="" name="current password" :class="{'input': true, 'is-danger': errors.has('current password') }">
                            <span v-show="errors.has('current password')" class="help is-danger">{{ errors.first('current password') }}</span>
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input v-validate="'required|min:6'" v-model="changePass.new_password" type="password" class="form-control" placeholder="" name="new password" :class="{'input': true, 'is-danger': errors.has('new password') }">
                            <span v-show="errors.has('new password')" class="help is-danger">{{ errors.first('new password') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" v-validate="'required|min:6|confirmed:new_password'" class="form-control" placeholder="" name="confirm password" :class="{'input': true, 'is-danger': errors.has('confirm password')}">
                            <span v-show="errors.has('confirm password')" class="help is-danger">{{ errors.first('confirm password') }}</span>
                        </div>

                        <div class="text-center">
                            <input type="submit" class="btn btn-warning btn-block btn-lg" value="Save Changes" name="">
                        </div>

                    </div>
                    </form>
                </div>
            </modal>
        </div>

        <section class="profilepage">
            <div class="container">

                <div class="row row_18">
                    <div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
                        
                        <user-profile-card></user-profile-card>

                        <left-aside-nav></left-aside-nav>
                    </div>

                    <div class="col-lg-9 col-md-9 col-sm-8 procolleft">
                        <div class="white-bg">
                            <div class="borderdiv">
                                <!-- <div class="coverphoto clearfix" v-if="tootellaUser.type==2"> -->
                                <profile-cover></profile-cover>

                                <div class="panel-body relative">
                                    <div class="prtopbtn clearfix">
                                        <div class="dropdown pull-left">
                                            <a id="dLabel" @click="seen = !seen" href="javascript:void(0);">
                                                <img src="assets/images/bullets_ico.png" class="img-responsive">
                                            </a>

                                            <ul v-if="seen" class="dropdown-menu" aria-labelledby="dLabel" style="display: block;">
                                                <li>
                                                    <a href="javascript:void(0);" @click="toggle">Change Password</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <h2 class="nameavatar" v-if="tootellaUser.type == 2">
                                            {{tootellaUser.designation == null ? 'No designation' : tootellaUser.designation}} at {{tootellaUser.company_name}}
                                        </h2>
                                        <div class="addresspro">
                                            <p>{{tootellaUser.address}}</p>
                                            <p>

                                                <span v-if="tootellaUser.phone_number != null">
                                                    <img src="assets/images/phone_ico.png" class="img-responsive"> {{tootellaUser.phone_number}}
                                                </span>

                                                <span v-if="tootellaUser.type == 2">
                                                    <img src="assets/images/globe.png" class="img-responsive"> 
                                                    {{tootellaUser.email}}
                                                </span>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <profile-stat></profile-stat>

                        <profile-recent-ad></profile-recent-ad>
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
    import { HTTP } from '../../http';
    import { config } from '../../config';

    import LeftAsideNav from '@/components/LeftAsideNav';
    import UserProfileCard from '@/components/UserProfileCard';
    
    import ProfileCover from '@/components/ProfileCover';
    import ProfileStat from '@/components/ProfileStat';
    import ProfileRecentAd from '@/components/ProfileRecentAd';

    import {
        SweetModal,
        SweetModalTab
    } from 'sweet-modal-vue';
    import VueGoogleAutocomplete from 'vue-google-autocomplete';

    const STATUS_INITIAL = 0,
        STATUS_SAVING = 1,
        STATUS_SUCCESS = 2,
        STATUS_FAILED = 3;

    export default {
        name: 'Profile',
        components: {
            SweetModal,
            SweetModalTab,
            VueGoogleAutocomplete,
            'left-aside-nav': LeftAsideNav,
            'user-profile-card': UserProfileCard,
            'profile-cover' : ProfileCover,
            'profile-stat': ProfileStat,
            'profile-recent-ad': ProfileRecentAd
        },
        data() {
            return {
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'photos',
                changePass: {
                    current_password: '',
                    new_password: ''
                },
                editProfileData: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    company_name: '',
                    designation: '',
                    address: '',
                    profile_picture: '',
                    zipcode: '',
                    city: '',
                },
                seen: false,
                seenEdtPrf: false,
                checkNotLoggedIn: true,
                isShow: false,
                editProfileShow: false,
                tootellaUser: JSON.parse(localStorage.getItem('tootellaUser'))
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        },
        mounted() {
            this.reset();
            this.$data.editProfileData.first_name = this.$data.tootellaUser.first_name;
            this.$data.editProfileData.last_name = this.$data.tootellaUser.last_name;
            this.$data.editProfileData.email = this.$data.tootellaUser.email;
            this.$data.editProfileData.phone_number = this.$data.tootellaUser.phone_number;
            this.$data.editProfileData.company_name = this.$data.tootellaUser.company_name;
            this.$data.editProfileData.designation = this.$data.tootellaUser.designation;
            this.$data.editProfileData.address = this.$data.tootellaUser.address;
            this.$data.editProfileData.zipcode = this.$data.tootellaUser.zipcode;
            this.$data.editProfileData.city = this.$data.tootellaUser.city;
            this.$data.editProfileData.profile_picture = this.$data.tootellaUser.profile_picture;
        },
        methods: {
            reset() {
                // reset form to initial state
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            validateBeforeSubmit(scope) {
                this.$validator.validateAll(scope).then((result) => {
                    if (result) {
                        // eslint-disable-next-line
                        // console.log(`submit ${scope}`, result);
                        //alert(scope);
                        if (scope == 'cp') {
                            this.cpSubmit();
                        } else if (scope == 'ep') {

                            this.editProfileSubmit();
                        }

                        return;
                    }
                });
            },

            editProfileSubmit() {
                // make the filtered object from the form data
                //alert(this.$data.editProfileData.address);
                let reqData = {
                    first_name: this.$data.editProfileData.first_name,
                    last_name: this.$data.editProfileData.last_name,
                    email: this.$data.editProfileData.email,
                    phone_number: this.$data.editProfileData.phone_number,
                    company_name: this.$data.editProfileData.company_name,
                    designation: this.$data.editProfileData.designation,
                    profile_picture: this.$data.editProfileData.profile_picture,
                    address: this.$data.editProfileData.address,
                    zipcode: this.$data.editProfileData.zipcode,
                    city: this.$data.editProfileData.city,
                    api_token: this.$data.tootellaUser.api_token,
                };

                //console.log(reqData);

                // ajax post method call
                HTTP.post(`user/edit`, reqData)
                    .then(response => {
                        let data = response.data;
                        //console.log(data);
                        if (data.status == "success") {
                            let authuser = {};
                            authuser = data.user;
                            // back to home
                            localStorage.setItem('tootellaUser', JSON.stringify(authuser));

                            window.location.reload();
                        } else if (data.status == "fail") {
                            //console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            },
            cpSubmit() {
                // make the filtered object from the form data
                let cpData = {
                    current_password: this.$data.changePass.current_password,
                    new_password: this.$data.changePass.new_password,
                    api_token: this.$data.tootellaUser.api_token,
                }
                // ajax post method call
                HTTP.post(`user/change-password`, cpData)
                    .then(response => {
                        let data = response.data;
                        console.log(data);
                        if (data.status == "success") {
                            let authuser = {};
                            authuser = data.user;
                            // back to home
                            localStorage.setItem('tootellaUser', JSON.stringify(authuser));

                            window.location.reload();
                        } else if (data.status == "fail") {
                            //console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            },
            toggle() {
                this.isShow = !this.isShow;
                this.seen = false;
            },
            toggleEdit() {
                this.editProfileShow = !this.editProfileShow;
                this.seenEdtPrf = false;
            },
            filesChange(fieldName, fileList) {

                // handle file changes
                const formData = new FormData();

                if (!fileList.length) return;

                // append the files to FormData
                Array
                    .from(Array(fileList.length).keys())
                    .map(x => {
                        formData.append('profile_picture', fileList[x], fileList[x].name);
                        formData.append('first_name', this.$data.editProfileData.first_name);
                        formData.append('last_name', this.$data.editProfileData.last_name);
                        formData.append('email', this.$data.editProfileData.email);
                        formData.append('phone_number', this.$data.editProfileData.phone_number);
                        formData.append('company_name', this.$data.editProfileData.company_name);
                        formData.append('designation', this.$data.editProfileData.designation);
                        formData.append('address', this.$data.editProfileData.address);
                        formData.append('zipcode', this.$data.editProfileData.zipcode);
                        formData.append('city', this.$data.editProfileData.city);
                    });

                formData.append('api_token', this.$data.tootellaUser.api_token);

                HTTP.post(`user/save-profile-picture`, formData)
                    .then(response => {
                        let data = response.data;
                        console.log(data);
                        if (data.status == "success") {
                            console.log('success');
                            let userdata = data.user
                            // console.log(userdata)
                            userdata.profile_picture = `${config.profile_upload}${data.user.profile_picture}`
                            // console.log(userdata)

                            localStorage.setItem('tootellaUser', JSON.stringify(userdata));
                            location.reload();
                        } else if (data.status == "fail") {
                            console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })

            },


            getPlace() {
                let input = document.getElementById('autocompleteAddress');
                let options = {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: 'fr'
                    }
                };
                let place = new google.maps.places.Autocomplete(input, options);


                var that = this;

                google.maps.event.addListener(place, 'place_changed', function () {
                    let selected_place = place.getPlace();
                    //console.log(selected_place.formatted_address);
                    that.$data.editProfileData.address = selected_place.formatted_address;
                    // console.log(selected_place.geometry.location.lat());
                    // console.log(selected_place.geometry.location.lng());

                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .help.is-danger {
        width: 100%;
        color: #fff;
    }
</style>