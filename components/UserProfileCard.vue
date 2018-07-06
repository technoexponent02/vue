<template>
    <div>

        <div class="imageupload">
            <sweet-modal ref="upload" overlay-theme="dark">
                <h2>Create Your Account</h2>
                <p>Please choose your account type</p>
                <!-- <div>
                                <img id="image" :src="initImg" style="width:100%">
                            </div> -->
            </sweet-modal>
        </div>

        <div class="dbmenutop">

            <!-- <div>
                                <img id="image" :src="initImg" style="width:100%">
                            </div> -->


            <i class="material-icons checkedico">check_circle</i>
            <figure class="avatardb round center-block">
                <img :src="tootellaUser.profile_picture" class="img-responsive">
            </figure>
            <h2 class="dbavname">{{tootellaUser.first_name+' '+tootellaUser.last_name }}</h2>
            <div class="dropdown text-right">
                <button @click="seenEdtPrf = !seenEdtPrf" class="exoptionbtn">
                    <i class="material-icons">more_horiz</i>
                </button>
                <ul class="dropdown-menu rightshow" v-if="seenEdtPrf" style="display: block;">
                    <li>
                        <a @click="toggleEdit" href="javascript:void(0);">Edit profile</a>
                    </li>
                    <!-- <li>
                        <a @click="$refs.upload.open()" href="javascript:void(0);">Edit image</a>
                    </li> -->
                </ul>

            </div>
            <div class="showdiv sociallinkex">
                <ul class="list-inline">
                    <li>
                        <a :href="`https://api.whatsapp.com/send?phone=${tootellaUser.phone_number}`" target="_blank">
                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a :href="`tel:${tootellaUser.phone_number}`">
                            <i class="fa fa-phone" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:void(0)" v-if="tootellaUser.facebook == ''">
                            <i class="fa fa-facebook"></i>
                        </a>
                        <a :href="tootellaUser.facebook" v-else target="_blank">
                            <i class="fa fa-facebook"></i>
                        </a>
                    </li>
                    <li>
                        <a :href="`mailto:${tootellaUser.email}`">
                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <modal title="Modal!" :width="520" :is-show="isShow2" transition="fadeDown" @close="isShow2=false">
            <div class="cropper">
                <img id="image" :src="initImg" style="width:100%">
            </div>
        </modal>

        <!-- <button @click="openmodal">Click</button> -->

        <div id="editProfile">
            <modal
                :is-show="editProfileShow"
                transition="fadeDown"
                :show-footer="false"
                @close="editProfileShow=false"
                :show-ok="false"
                :show-cancel="false"
                :backdrop-closable="false"
            >

            
                <div class="profilepicmodal">

                    <h3 class="modal_title text-center">Edit Profile</h3>
                    <!-- <pre>{{tootellaUser.profile_picture}}</pre> -->
                    <form @submit.prevent="validateBeforeSubmit('ep')" enctype="multipart/form-data">
                        <!-- <figure class="profileavatar round center-block">
                            <img :src="tootellaUser.profile_picture" class="img-responsive">

                        </figure>
                        <label class="changephto center-block round">
                            <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                accept="image/*" class="hidden input-file">

                            <img src="assets/images/camera_ico.png" class="img-responsive">
                        </label> -->
                        <!-- <pre>{{editProfileData | json}}</pre> -->
                        <input type="file" name="image" accept="image/*"
                            style="font-size: 1.2em; padding: 10px 0;"
                            @change="setImage" />
                        <div class="cropper">
                            <vue-cropper
                                ref='cropper'
                                :guides="true"
                                :view-mode="2"
                                drag-mode="crop"
                                :auto-crop-area="0.5"
                                :min-container-width="350"
                                :min-container-height="250"
                                :background="true"
                                :rotatable="true"
                                :src="initImg"
                                alt="Source Image"
                                :img-style="{ 'width': '400px', 'height': '300px' }">
                            </vue-cropper>
                        </div>
                        <button @click="cropImage" v-if="initImg != ''" style="margin-right: 40px;">Crop</button>

                        <figure class="center-block">

                            <!-- <croppa
                            :zoom-speed="8"
                            :initial-image="initImg"
                            v-model="myCroppa"
                            @image-remove="handleImageRemove"
                            canvas-color="transparent">
                            </croppa> -->

                            <croppa v-model="myCroppa" canvas-color="transparent">
                                <img crossOrigin="anonymous" :src="initImg" slot="initial">
                            </croppa>

                            


                            

                        </figure>
                        <!-- <button @click="generateImage">Generate</button> -->
                        <!-- <br>
                        <img class="output" :src="imgUrl" > -->

                        <div class="formeditp">
                            <div class="form-group">
                                <label>First Name</label>
                                <input v-validate="'required'" v-model="editProfileData.first_name" type="text" class="form-control" placeholder="First Name"
                                    name="First Name" :class="{'input': true, 'is-danger': errors.has('First Name') }">
                                <span v-show="errors.has('First Name')" class="help is-danger">{{ errors.first('First Name') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input v-model="editProfileData.last_name" type="text" class="form-control" placeholder="Last Name" name="">
                            </div>
                            <div class="form-group">
                                <label>Work at</label>
                                <input type="text" v-model="editProfileData.company_name" class="form-control" placeholder="company name" name="">
                            </div>
                            <div class="form-group">
                                <label>Designation</label>
                                <input type="text" v-model="editProfileData.designation" class="form-control" placeholder="Designation" name="">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-validate="'required|email'" v-model="editProfileData.email" class="form-control" placeholder="Email"
                                    name="Email" :class="{'input': true, 'is-danger': errors.has('Email') }">
                                <span v-show="errors.has('Email')" class="help is-danger">{{ errors.first('Email') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Phone No.</label>
                                <input type="number" class="form-control" v-model="editProfileData.phone_number" placeholder="+971 000222665" name="">
                            </div>
                            <div class="form-group">
                                <label>Facebook profile</label>
                                <input type="text" v-validate="'url'" v-model="editProfileData.facebook" class="form-control" :class="{'input': true, 'is-danger': errors.has('facebook') }" placeholder="Facebook profile link (use http:// or https://)" name="facebook">
                                <span v-show="errors.has('facebook')" class="help is-danger">{{ errors.first('facebook') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input id="autocompleteAddress" type="text" class="form-control" v-model="editProfileData.address" placeholder="Enter your address"
                                    name="" @keyup="getPlace">
                            </div>
                            <div class="row row_5">
                                <div class="col-sm-6 form-group">
                                    <label>Zip Code</label>
                                    <input type="text" class="form-control" placeholder="70058" v-model="editProfileData.zipcode" name="">
                                </div>
                                <div class="col-sm-6 form-group">
                                    <label>City</label>
                                    <input type="text" class="form-control" placeholder="" v-model="editProfileData.city" name="">
                                </div>
                            </div>

                            <div class="text-center">
                                <button type="submit" :disabled="btnload" class="btn btn-warning btn-block btn-lg">
                                    <i class="fa fa-spinner fa-spin" v-if="btnload" style="font-size: 24px;"></i>
                                    Save Changes
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </modal>
        </div>
    </div>
</template>

<script>
import { HTTP, AUTH_DATA } from '../http';
import { config } from '../config';

import LeftAsideNav from '@/components/LeftAsideNav';

// import vueCropper from 'vue-cropper'

import VueCropper from 'vue-cropperjs';

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
    name: 'UserProfileCard',
    components: {
        SweetModal,
        SweetModalTab,
        VueGoogleAutocomplete,
        VueCropper,
        'left-aside-nav': LeftAsideNav,
    },
    data() {
        return {
            myCroppa: null,
            imgUrl: '',
            isShow2: false,
            initImg: '',
            cropImage: '',
            cropImg: '',
            uploadedFiles: [],
            uploadError: null,
            currentStatus: null,
            uploadFieldName: 'photos',
            changePass: {
                current_password: '',
                new_password: ''
            },
            editProfileData: {
                has_image: '',
                first_name: '',
                last_name: '',
                email: '',
                facebook: '',
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
            tootellaUser: JSON.parse(localStorage.getItem('tootellaUser')),
            btnload: false,
            cropper: null
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
    created() {
        this.initImg = AUTH_DATA.profile_picture;
    },
    mounted() {
        this.reset();
        this.$data.editProfileData.has_image = this.$data.tootellaUser.has_image;
        this.$data.editProfileData.first_name = this.$data.tootellaUser.first_name;
        this.$data.editProfileData.last_name = this.$data.tootellaUser.last_name;
        this.$data.editProfileData.email = this.$data.tootellaUser.email;
        this.$data.editProfileData.phone_number = this.$data.tootellaUser.phone_number;
        this.$data.editProfileData.facebook = this.$data.tootellaUser.facebook;
        this.$data.editProfileData.company_name = this.$data.tootellaUser.company_name;
        this.$data.editProfileData.designation = this.$data.tootellaUser.designation;
        this.$data.editProfileData.address = this.$data.tootellaUser.address;
        this.$data.editProfileData.zipcode = this.$data.tootellaUser.zipcode;
        this.$data.editProfileData.city = this.$data.tootellaUser.city;
        this.$data.editProfileData.profile_picture = this.$data.tootellaUser.profile_picture;


        // setTimeout(() => {
        //     this.initImg = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABX1BMVEUAAABDVGZDVWZEWmhNuodNuodNuodNu4dHe3NDUGVDVGZDVGZNuodNuodNuodNu4dKl3xDVmdDVGZDVGZDVGZDV2dNuodNuodDVGZDVGZNuodDVGZDVWZNuodNuodDVGZDVGZNuodNuodDVGZDVWZNuodNuodDVGZDVGZNuodNuodDVGZNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodNuodMs4VGbm5DU2ZDVGZNu4dKnH1DWWhNuIZHenJLpoFEXmlIhnZMr4NFZ2xJk3pDVmdMtYVGcW9Kn35EWmhNuYdHfXNLqYFEYGpIindMsYRFaW1KlntNtoZGc3D///80Gyx5AAAAVXRSTlMAAAAAAA8ODg4ODgWby8rKysrKzHUBVO/kMwahBy7h8k18/r4RG8z7aV344gyyQe0Dk5Qp3HT9FsVV9QqqOukCiyPWa/wSvk3zB6Iz5AGDHtBj+ro9K3OttgAAAAFiS0dEdN9tqG0AAAAHdElNRQfhARMHCzcwBtkHAAAB0UlEQVQ4y4WRV1PCQBRGN7BYERTsItgVUbGioIBdQbFBJLGBJTYQC/9/xvttxBrwvrB7z5mzmYGx/8ZSRVNdU1tHUy9hI9XjXFtTDWJh1gabzWZvbHI4HM7mFhNjppZmJ12aGu0EGqystU2mOU4rqqq2d0hms9TRTkclfYx9WyvrtOJwcnpGW7XLZTK5unA6Oz3B3trJeLcbp/MLJDw9ktTjQeDiHFt3N2ec9/YhkcnC6B8Y6AfPZhDo6+WcMT44BFm+RHl4ZGQYv5diNTRInBLeUSSurpHw+RC4vkJg1IsAGWPj4jtvNPVjtBvxheNjglNiwo/77Z2ic+XuFnf/hB4gY3JKJO4fdOHhXgSmJz84JWZmsXnMiYSSe8RtdqYUgDEXQCL/RIbylEcgMPfFyZhfEI8UUCiIBxbmv3FKBEMQnl8U5eUZQij4PUDG4pJIvGraqwgsLf7glAhHsH8rFt/wGwn/DJARXRaJjPgT5OXoL07Gyqr8Oasrfzg9srZe4utr/K/A+MZmSdjcMOCU2NrW+faWUYCMWFwX4jFDTomdXfDdHeMAGYk9CHuJMpyM/QNZPtgvy+mRw6OjQ15eYNySTFoqcEqkUpUC+M5ERW4w71W/kp5XGaMqAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTAxLTE5VDA3OjExOjU1KzAxOjAwY8TQSgAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wMS0xOVQwNzoxMTo1NSswMTowMBKZaPYAAABXelRYdFJhdyBwcm9maWxlIHR5cGUgaXB0YwAAeJzj8gwIcVYoKMpPy8xJ5VIAAyMLLmMLEyMTS5MUAxMgRIA0w2QDI7NUIMvY1MjEzMQcxAfLgEigSi4A6hcRdPJCNZUAAAAASUVORK5CYII=';
        //     console.log(this.initImg)
        // }, 1000);

        // const image = document.getElementById('image');
        // this.cropper = new Cropper(image, {
        //     aspectRatio: 16 / 9,
        //     crop(event) {
        //         console.log(event.detail.x);
        //         console.log(event.detail.y);
        //         console.log(event.detail.width);
        //         console.log(event.detail.height);
        //         console.log(event.detail.rotate);
        //         console.log(event.detail.scaleX);
        //         console.log(event.detail.scaleY);
        //     },
        // });

        // var $image = $('#image');

        // $image.cropper({
        // aspectRatio: 16 / 9,
        // crop: function(event) {
        //     console.log(event.detail.x);
        //     console.log(event.detail.y);
        //     console.log(event.detail.width);
        //     console.log(event.detail.height);
        //     console.log(event.detail.rotate);
        //     console.log(event.detail.scaleX);
        //     console.log(event.detail.scaleY);
        // }
        // });

        // // Get the Cropper.js instance after initialized
        // var cropper = $image.data('cropper');

    },
    methods: {
        openmodal(){
            this.isShow2 = true
        },
        setImage(e) {
            const file = e.target.files[0];
            if (!file.type.includes('image/')) {
                alert('Please select an image file');
                return;
            }
            if (typeof FileReader === 'function') {
                const reader = new FileReader();
                reader.onload = (event) => {
                    this.initImg = event.target.result;
                    // rebuild cropperjs with the updated source
                    this.$refs.cropper.replace(event.target.result);
                };
                reader.readAsDataURL(file);
            } else {
                alert('Sorry, FileReader API not supported');
            }
        },
        cropImage() {
            // get image data for post processing, e.g. upload or setting image src
            this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();

            console.log(this.cropImg)
        },
        handleImageRemove(){
            this.imgUrl = '';
        },
        generateImage() {
            let url = this.myCroppa.generateDataUrl()
            if (!url) {
                // alert('no image')
                // return
                this.imgUrl = ''
            }
            this.imgUrl = url
        },
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
            this.btnload = true;

            this.generateImage();

            let reqData = {
                first_name: this.$data.editProfileData.first_name,
                last_name: this.$data.editProfileData.last_name,
                email: this.$data.editProfileData.email,
                phone_number: this.$data.editProfileData.phone_number,
                facebook: this.$data.editProfileData.facebook,
                company_name: this.$data.editProfileData.company_name,
                designation: this.$data.editProfileData.designation,
                // profile_picture: this.$data.editProfileData.profile_picture,
                profile_picture: this.imgUrl,
                address: this.$data.editProfileData.address,
                zipcode: this.$data.editProfileData.zipcode,
                city: this.$data.editProfileData.city,
                api_token: this.$data.tootellaUser.api_token,
            };

            // console.log(reqData);

            // ajax post method call
            HTTP.post(`user/edit`, reqData)
                .then(response => {
                    let data = response.data;
                    //console.log(data);
                    if (data.status == "success") {
                        let authuser = {};
                        authuser = data.user;
                        // console.log(authuser)
                        // back to home
                        localStorage.setItem('tootellaUser', JSON.stringify(authuser));
                        
                        this.btnload = false;

                        window.location.reload();
                    } else if (data.status == "fail") {
                        this.btnload = false;
                        //console.log(data.errors);
                        //alert(data.errors.email[0]);
                    }
                })
                .catch(e => {
                    console.log(e);
                    this.btnload = false;
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

                        // window.location.reload();
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
                    formData.append('facebook', this.$data.editProfileData.facebook);
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
                        // location.reload();
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
<style scoped lang="scss">
    .help.is-danger {
        width: 100%;
        color: #fff;
    }
</style>
