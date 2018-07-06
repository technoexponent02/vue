<template>
    <div class="searchpage togivegap cloffer">

        <div class="catgloader pageload" v-if="loading">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>

        <div class="container">


            <modal
                class="place-ad-modal"
                :width="1200"
                :is-show="isShowPlaceAd"
                :show-footer= false
                transition="fadeDown"
                @close="hidePlaceAd"
            >
                <div v-if="showPopup">
                    <create-ad></create-ad>
                </div>
            </modal>


            <div class="form-inline withnewselect catedrop opencategoryfilter" style="display:none;">
                <div class="form-group">
                    <select class="form-control">
                        <option>Type de logement</option>
                        <option>Lorem</option>
                    </select>
                </div>
                <div class="form-group dropdown">
                    <a id="dLabel" data-target="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" href="javascript:void(0);" class="opencatedrop">Fourchette de prix</a>
                    <div class="dropdown-menu droppricerange">
                        <h4>The average nightly price is ₹4,967.</h4>
                        <input data-addui="slider" data-min="10" data-formatter="usd" data-fontsize="14" data-step="0.05" data-range="true" data-timeout="50000" value="25.50,50.00">

                            <div class="clearfix">
                            <input type="button" class="btn btn-default btncancel" value="Cancel" name="">
                            <input type="button" class="btn btn-warning btnapply pull-right" value="Apply" name="">
                            </div>
                    </div>
                </div>
                <div class="form-group">
                    <select class="form-control">
                        <option>Reservatpn instantanee</option>
                        <option>Lorem</option>
                    </select>
                </div>
                <div class="form-group">
                    <select class="form-control">
                        <option>Plus de filtres</option>
                        <option>Lorem</option>
                    </select>
                </div>
            </div>

            <div class="white-bg borderdiv mrgb25">
                <h2 class="text-center mr0 addtitle">Votre annonce</h2>
                <div class="addbx center-block">
                    <div class="dropdown">

                    <button
                        type="button"
                        class="selectcathed text-center btn-warning"
                        @click="toggleCreateAd"
                        :disabled="loading"
                    >
                        <i class="fa fa-th-large" aria-hidden="true"></i>&nbsp;
                        <!-- <span id="thecatename">
                            {{$store.state.placeAdSelectedCatgStore.title == '' ? 'Selectionnez votre categorie' : $store.state.placeAdSelectedCatgStore.title}}
                        </span> -->

                        <span id="thecatename" v-if="$store.state.placeAdSelectedCatgListViewShow.length == 0">
                            Selectionnez votre categorie
                        </span>
                        <span id="thecatename" v-if="$store.state.placeAdSelectedCatgListViewShow.length > 0">
                            <!-- {{$store.state.placeAdSelectedCatgStore.title == '' ? 'Selectionnez votre categorie' : $store.state.placeAdSelectedCatgStore.title}} -->
                            <span class="btn-bread" v-for="selectedItem in $store.state.placeAdSelectedCatgListViewShow" :key="selectedItem.id">
                                {{selectedItem.title}} <span>-</span>
                            </span>
                        </span>
                        <button type="button" class="editcate" style="display: inline-block;" v-if="$store.state.placeAdSelectedCatgListViewShow.length > 0">
                            <i class="fa fa-pencil"></i>
                        </button>
                    </button>
                    <alert type="danger" v-if="errorObj.category != ''">
                        {{errorObj.category}}
                    </alert>
                </div>

                    <div class="form-group">
                        <input
                            type="text"
                            v-model="adTitle"
                            class="form-control"
                            placeholder="Ad Title *"
                            name="ad title"
                        >
                        <br>
                        <alert type="danger" v-if="errorObj.title != ''">
                            {{errorObj.title}}
                        </alert>
                    </div>
                    <h3 class="ntitel text-center">Type of news *</h3>
                    <div class="row">
                        <label class="col-sm-12  form-group">
                            <input type="radio" checked="" class="hidden" name="addoffer">
                            <div class="radionnw btn-default btn">Offer (you sell a bike)</div>
                        </label>
                    </div>

                    <div class="form-group">
                        <vue-editor
                            v-validate="'required'"
                            v-model="adDetails"
                            name="ad details"
                            :editorToolbar="customToolbar"
                        ></vue-editor>
                        <br>
                        <alert type="danger" v-if="errorObj.description != ''">
                            {{errorObj.description}}
                        </alert>
                    </div>

                    <div class="form-group text-center inputprp">
                            <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                id="exampleInputAmount"
                                placeholder="Amount"
                                v-model="adAmount"
                            >
                            <div class="input-group-addon"><i class="fa fa-eur" aria-hidden="true"></i></div>
                        </div>
                        <br>
                        <alert type="danger" v-if="errorObj.price != ''">
                            {{errorObj.price}}
                        </alert>
                    </div>

                    <p class="adpara">Photos : Une annonce avec photo est 7 fois plus consultée qu'une annonce sans photo</p>

                    <div class="clearfix row_12">

                        <label class="pull-left" v-for="item in adImageHolder" :key="item.id">
                            <input
                                type="file"
                                name="phonetype"
                                :disabled="item.disabled"
                                class="hidden"
                                @change="uploadAdImage($event, item.id)"
                                accept="image/x-png,image/jpeg"
                            >
                            <div class="chekphoto" :id="`adp-${item.id}`" style="position:relative">
                                <div class="adploading">
                                    <img src="../../assets/ad-loading.gif" alt="loading" />
                                </div>
                                <a href="javascript:void(0);" v-if="item.disabled" @click="removeImage(item.id)">
                                    <i class="fa fa-times-circle"></i>
                                </a>
                                <div v-for="(img, index) of item.data" :key="index">
                                    <img :src="`${ad_image_url}${img.save_name}`" class="img-responsive">
                                </div>
                                <div class="brwrap">
                                    <span class="txttt">{{item.id == 1 ? 'Main Photo' : `Photo ${item.id}`}}</span>
                                    <span>
                                        <img src="assets/images/addphoto.png" class="img-responsive">
                                    </span>
                                </div>
                            </div>
                        </label>

                        <label class="pull-left" v-if="moreAdImage">
                            <input type="button" @click="morePhotos" name="phonetype" class="hidden">
                            <div class="chekphoto">
                                <div class="brwrap">
                                    <span class="txttt">Pay to unlock 7 picture more</span>
                                    <span>
                                        <img src="assets/images/addphoto.png" class="img-responsive">
                                    </span>
                                </div>
                            </div>
                        </label>

                    </div>

                    <alert type="danger" v-if="errorObj.ad_image != ''">
                        {{errorObj.ad_image}}
                    </alert>
                </div>
            </div>
            <div class="white-bg borderdiv mrgb25 mapncontwrap">
                <div class="row row_8">
                    <div class="col-sm-6">
                        <div id="map"></div>
                        <br>
                        <alert type="danger" :closable="false" v-if="errorObj.invalidAddress">
                            Cette adresse n'a pas été trouvée, veuillez réessayer avec une autre adresse.
                        </alert>
                    </div>


                    <div class="col-sm-6">
                        <h3 class="ntitel">CITY<sup>*</sup></h3>
                        <div class="form-group withdlbtn">
                            <vue-google-autocomplete
                                id="map2"
                                ref="toAddress"
                                classname="form-control bglocation"
                                placeholder="Start typing"
                                v-on:placechanged="getAddressData"
                                v-on:inputChange="changeCity($event)"
                                types="(cities)"
                                country="in"
                            >
                            </vue-google-autocomplete>
                            <br>
                            <alert type="danger" v-if="errorObj.city != ''">
                                {{errorObj.city}}
                            </alert>
                        </div>


                        <h3 class="ntitel">ADDRESS</h3>
                        <div class="row row_8">
                            <div class="col-sm-8">
                                <div class="form-group withdlbtn">
                                    <input type="text" class="form-control bglocation" @keyup="onChangeAddress($event)" v-model="mainAddresss" placeholder="Bagmundi 32159" name="">
                                    <!-- <a class="deltbtn" href="javascript:void(0);"><img src="assets/images/close_ico.png" class="img-responsive"></a> -->
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <input type="button" @click="positionMap" :disabled="mainAddresss.length <= 0" class="btn btn-warning btn-block btnvaly" value="Validate my address" name="">
                            </div>
                        </div>

                        <p class="adpara" style="color:#666666;">Complete your address and people using the search around you will find your ad easier. 
                        If you do not want to fill in your exact address, enter your street number without giving the number. This information will only be retained for the duration of your advertisement.</p>
                    </div>

                </div>

            </div>

            <div class="white-bg borderdiv mrgb25 clearfix checkdixx">
                <div class="col-sm-3 hidden-xs"></div>
                <div class="col-sm-6 withbordleft">
                    <h3 class="ntitel">Email <sup>*</sup></h3>
                    <p class="adpara form-group">{{authData.email}}</p>

                    <h3 class="ntitel">Phone <sup>*</sup></h3>
                    <div class="form-group">
                        <input type="text" v-model="phone" class="form-control" placeholder="32159 - 852963 - 5648" name="">

                        <br>
                        <alert type="danger" v-if="errorObj.contact_phone != ''">
                            {{errorObj.contact_phone}}
                        </alert>
                    </div>

                    <div class="row">
                            <div class="col-sm-6 form-group">
                                <!-- <datepicker placeholder="Date To"  v-model="dateFrom"></datepicker> -->
                                <datepicker placeholder="Date From" class="form-control addatepicker" v-model="dateFrom"></datepicker>
                                <!-- {{dateFrom}} -->
                                <br>
                                <alert type="danger" v-if="errorObj.from_date != ''">
                                    {{errorObj.from_date}}
                                </alert>
                            </div>
                            <div class="col-sm-6 form-group">
                                <datepicker placeholder="Date To" class="form-control addatepicker"  v-model="dateTo"></datepicker>
                                <!-- {{dateTo}} -->
                                <br>
                                <alert type="danger" v-if="errorObj.to_date != ''">
                                    {{errorObj.to_date}}
                                </alert>
                            </div>
                            <!-- {{dateFrom}} - {{dateTo}} -->
                        </div>

                        <div class="row">
                            <div class="col-sm-6 form-group timetake">
                                <!-- <input type="text" placeholder="Time from" class="form-control time" name=""> -->
                                <!-- <datepicker  v-model="timeFrom" placeholder="Time From" :options="{enableTime: true, enableSeconds: false, noCalendar: true, time_24hr: true}"></datepicker> -->
                                <!-- <vue-timepicker format="HH:mm" v-model="timeFrom"></vue-timepicker> -->
                                <!-- <vue-timepicker v-model="timeFrom" format="HH:mm"></vue-timepicker>
                                {{timeFrom}} -->
                                <input id="timeFrom" placeholder="Time From" class="form-control" value="">
                            </div>
                            <div class="col-sm-6 form-group timetake">
                                <!-- <input type="text" placeholder="Time to" class="form-control time" name=""> -->
                                <!-- <datepicker v-model="timeTo" placeholder="Time To" :options="{enableTime: true, enableSeconds: false, noCalendar: true, time_24hr: true}"></datepicker> -->
                                <!-- <vue-timepicker format="HH:mm" v-model="timeTo"></vue-timepicker>
                                {{timeTo}} -->
                                <input id="timeTo" placeholder="Time To" class="form-control" value="">
                            </div>
                            <!-- {{timeFrom}} - {{timeTo}} -->
                        </div>


                    <label class="adpara">
                        <input type="checkbox" :checked="hidePhone" @change="phoneChange" class="hidden" name="hghgh">

                        <div class="checkico">
                            <i class="fa fa-square-o on" aria-hidden="true"></i>
                            <i class="fa fa-check-square-o toOn" aria-hidden="true"></i>
                        </div>
                        Hide the phone number in the ad.
                    </label>

                    <label class="adpara">
                        <input type="checkbox" :checked="privacy" @change="privacyChange" class="hidden" name="hghgh">

                        <div class="checkico">
                            <i class="fa fa-square-o on" aria-hidden="true"></i>
                            <i class="fa fa-check-square-o toOn" aria-hidden="true"></i>
                        </div>
                            I do not want to be solicited by foreign companies to the site leboncoin.fr
                    </label>
                </div>
            </div>
            <div class="clearfix">
                <div class="col-sm-3 hidden-xs"></div>
                <div class="col-sm-6">
                    <input type="button" value="Place an offer" @click="submitAd" class="btn btn-md btn-warning">
                    <br />
                    <br />
                    <alert title="success!" type="success" v-if="success" :closable="false">
                        Well done! You successfully updated an ad
                    </alert>
                </div>

            </div>
        
        </div>
    </div>
</template>

<script>

import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import CreateAdModal from '@/components/CreateAdModal';
import store from '../../store';
import { VueEditor } from 'vue2-editor';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker'

const moreData = [
    {
        id: 4,
        data: [],
        disabled: false
    },
    {
        id: 5,
        data: [],
        disabled: false
    },
    {
        id: 6,
        data: [],
        disabled: false
    },
    {
        id: 7,
        data: [],
        disabled: false
    },
    {
        id: 8,
        data: [],
        disabled: false
    },
    {
        id: 9,
        data: [],
        disabled: false
    },
    {
        id: 10,
        data: [],
        disabled: false
    }
]

export default {
    name: 'EditAd',
    components: {
        'create-ad': CreateAdModal,
        VueEditor,
        VueGoogleAutocomplete,
        Datepicker,
        VueTimepicker
    },
    data () {
        return {
            isShowPlaceAd: false,
            createAdId: 0,
            categoryData: [],
            showPopup: false,
            loading: true,
            adTitle: '',
            adDetails: '',
            adAmount: '',
            customToolbar: [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
            ],
            moreAdImage: true,
            address: '',
            mainAddresss: '',
            timeFrom: '',
            timeTo: '',
            dateFrom: '',
            dateTo: '',
            phone: '',
            hidePhone: false,
            privacy: true,
            lat: '',
            lng: '',
            contact_email: '',
            success: false,
            ad_image_url: config.ad_images,
            authData: AUTH_DATA,
            adImageHolder: [
                {
                    id: 1,
                    data: [],
                    disabled: false
                },
                {
                    id: 2,
                    data: [],
                    disabled: false
                },
                {
                    id: 3,
                    data: [],
                    disabled: false
                }
            ],
            errorObj: {
                invalidAddress: false,
                ad_image: '',
                city: '',
                contact_phone: '',
                description: '',
                from_date: '',
                lat: '',
                lng: '',
                price: '',
                title: '',
                to_date: '',
                category: ''
            },
            loading: true,
        }
    },
    created() {
        // console.log(this.$route.query.my_ad)
        if(this.$route.query.my_ad == '' || this.$route.query.my_ad == undefined){
            this.$router.push({ path: 'my-ad' })
        } else {
            sessionStorage.removeItem('categorySelected');

            HTTP.post(`categories?api_token=${TOKEN}`, {parent_id: this.createAdId, type_flag: 'O'})
                .then(response => {
                    let data = response.data;
                    // console.log(data.categories);
                    this.categoryData = data.categories;
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })




            HTTP.get(`my-ads/${this.$route.query.my_ad}?api_token=${TOKEN}`)
                .then(response => {
                    this.loading = false;
                    let data = response.data;
                    // console.log(data);

                    // make data available
                    this.adTitle = data.title;
                    this.adDetails = data.description;
                    this.adAmount = data.price;
                    this.mainAddresss = data.address;
                    this.address = data.city;
                    this.phone = data.contact_phone;
                    this.contact_email = data.contact_email;
                    this.dateFrom = data.from_date;
                    this.dateTo = data.to_date;
                    this.timeFrom = data.from_time;
                    this.timeTo = data.to_time;
                    this.lat = data.lat;
                    this.lng = data.lng;

                    let adPhotos = data.photos;

                    if(adPhotos.length > 3){
                        moreData.map(m => this.adImageHolder.push(m));
                        this.moreAdImage = false;
                    }

                    adPhotos.map((m, i) => {
                        this.adImageHolder[i].data.push(m);
                        this.adImageHolder[i].disabled = true;
                    })

                    // console.log(this.adImageHolder)

                    // console.log(this.dateFrom);
                    setTimeout(() => {
                        $('#map2').val(data.city)
                        $('.btnvaly').trigger('click');
                    }, 200);


                    store.commit('placeAdSelectedCatgListView', data.categories);
                    store.commit('placeAdStateChange', 1);
                    let storedata = JSON.stringify(data.category);
                    sessionStorage.setItem('categorySelected', storedata);

                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })

        }
    },
    mounted() {
        this.initMap();

        setTimeout(() => {
            $('#timeFrom').val(this.timeFrom);
            $('#timeTo').val(this.timeTo);
        }, 2000);

        // $('#timeFrom').val(this.timeFrom);
        // $('#timeTo').val(this.timeTo);

        $('#timeFrom').clockpicker({
            autoclose: true
        });
        $('#timeTo').clockpicker({
            autoclose: true
        });
    },
    destroyed() {
        let placeAdPayload = [];
        let placeAdSteppayload = 0;
        let placeAdStepPayload = {title: ''};
        let placeAdSelectedCatgListViewShowPayload = [];

        store.commit('placeAd', placeAdPayload);
        store.commit('placeAdStateChange', placeAdSteppayload);
        store.commit('placeAdSelectedCatg', placeAdStepPayload);
        store.commit('placeAdSelectedCatgListView', placeAdSelectedCatgListViewShowPayload);
    },
    methods: {
        changeCity(event){
            if(event.newVal.length == 0){
                this.address = ''
            }
        },
        initMap() {
            // The location of Uluru
            // {lat: 19.0759837, lng: 72.87765590000004};
            var uluru = {lat: 19.0759837, lng: 72.87765590000004};;
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 4, center: uluru});
            // The marker, positioned at Uluru
            // var marker = new google.maps.Marker({position: uluru, map: map});
        },

        onChangeAddress(event){
            this.errorObj.invalidAddress = false;
            if(event.target.value == ''){
                this.initMap();
            }
        },

        positionMap(){
            HTTP.get(`getLocation?address=${this.mainAddresss}`)
            .then(response => {
                // console.log(response)
                // console.log(response.data.status)

                if(response.data.status == "ZERO_RESULTS"){
                    this.errorObj.invalidAddress = true;
                    this.mainAddresss = ''

                    this.initMap();
                } else {
                    this.errorObj.invalidAddress = false;

                    this.mainAddresss = response.data.results[0].formatted_address;

                    let lat = response.data.results[0].geometry.location.lat;
                    let lng = response.data.results[0].geometry.location.lng;
                    // The location of Uluru
                    var uluru = {lat: lat, lng: lng};;
                    // The map, centered at Uluru
                    var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 8, center: uluru});
                    // The marker, positioned at Uluru
                    var marker = new google.maps.Marker({position: uluru, map: map});
                }

            })
            .catch(e => {
                console.log(e);
                // alert('Something went wrong!');
            })



        },
        phoneChange(){
            this.hidePhone = this.hidePhone != true;
        },
        privacyChange(){
            this.privacy = this.privacy != true;
        },
        removeImage(id){
            this.adImageHolder.filter((m) => {
                if(m.id == id){
                    m.data = []
                    m.disabled = false;
                }
            })
        },
        uploadAdImage(event, id) {
            // console.log(event.target.files[0]);
            let formData = new FormData();
            let File = event.target.files[0];
            formData.append("image", File);

            $(`#adp-${id}`).find('.adploading').addClass('active');


            HTTP.post(`upload-ad-image?api_token=${TOKEN}`, formData)
            .then(response => {
                let data = response.data;

                if(this.adImageHolder[0].data.length == 0){
                    this.adImageHolder[0].data.push(data);
                    this.adImageHolder[0].disabled = true;
                } else {
                    this.adImageHolder.filter((m) => {
                        if(m.id == id){
                            m.data.push(data)
                            m.disabled = true;
                        }
                    })
                }

                $('.adploading').removeClass('active');
            })
            .catch(e => {
                console.log(e);
                alert('Something went wrong!');

                $('.adploading').removeClass('active');
            })

        },
        morePhotos(){
            moreData.map(m => this.adImageHolder.push(m));
            this.moreAdImage = false;
        },
        toggleCreateAd(){
            this.isShowPlaceAd = true;
            const payload = this.categoryData;
            store.commit('placeAd', payload)

            this.showPopup = true;
            store.commit('closePlaceAd', 1);
        },
        hidePlaceAd(){
            this.isShowPlaceAd = false;

            this.showPopup = false;
        },
        getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData.locality;
            this.lat = addressData.latitude;
            this.lng = addressData.longitude;
            // console.log(addressData, placeResultData)
        },
        submitAd() {
            const localObj = {
                category: JSON.parse(sessionStorage.getItem('categorySelected')) == null ? null : JSON.parse(sessionStorage.getItem('categorySelected')).id,
                title: this.adTitle,
                description: this.adDetails,
                price: this.adAmount,
                zipcode: '',
                city: this.address,
                state: '',
                lat: this.lat,
                lng: this.lng,
                address: this.mainAddresss,
                from_time: this.timeFrom,
                to_time: this.timeTo,
                from_date: this.dateFrom,
                to_date: this.dateTo,
                contact_email: this.authData.email,
                contact_phone: this.phone,
                hide_phone: this.hidePhone == true ? 1 : 0,
                solicite_status: this.privacy == true ? 1 : 0,
                ad_image: []
            }

            // console.log(localObj)

            this.adImageHolder.map((m) => {
                m.data.map(p => localObj.ad_image.push(p));
            });

            localObj.from_date = moment(localObj.from_date).format('YYYY-MM-DD');
            localObj.to_date = moment(localObj.to_date).format('YYYY-MM-DD');

            // console.log(localObj)
            

            HTTP.put(`update-ad/${this.$route.query.my_ad}?api_token=${TOKEN}`, localObj)
            .then(response => {
                // console.log(response)

                if(response.data.status == 'fail'){
                    this.errorObj.description = response.data.errors.description == undefined ? '' : response.data.errors.description[0];
                    this.errorObj.category = response.data.errors.category == undefined ? '' : response.data.errors.category[0];
                    this.errorObj.ad_image = response.data.errors.ad_image == undefined ? '' : response.data.errors.ad_image[0];
                    this.errorObj.city = response.data.errors.city == undefined ? '' : response.data.errors.city[0];
                    this.errorObj.contact_phone = response.data.errors.contact_phone == undefined ? '' : response.data.errors.contact_phone[0];
                    this.errorObj.from_date = response.data.errors.from_date == undefined ? '' : response.data.errors.from_date[0];
                    this.errorObj.price = response.data.errors.price == undefined ? '' : response.data.errors.price[0];
                    this.errorObj.title = response.data.errors.title == undefined ? '' : response.data.errors.title[0];
                    this.errorObj.to_date = response.data.errors.to_date == undefined ? '' : response.data.errors.to_date[0];

                    window.scrollTo(0, 0);
                } else {
                    // alert('success')
                    this.success = true;
                    setTimeout(() => {
                        // window.location.href = '/my-ad';
                        this.$router.push('my-ad');
                    }, 2000)
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
    span.help{
        display: block;
        color: #fff;
    }
    .adploading.active{
        display: block;
    }
    .adploading{
        display: none;
        position: absolute;
        top: 0;
        left: 0;
        background: #0000009e;
        width: 100%;
        height: 100%;
    }
    .adploading img{
        width: 40%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #map {
        height: 250px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
    }
    input[type=checkbox]:checked + .checkico .on, .toOn {
        display: none;
    }
</style>
