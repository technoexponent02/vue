<template>
    <div>
        <div class="catgloader" v-if="loading">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>
        <!-- step one -->
        <div class="boxstep2 stepbxoff" style="display: block;" v-if="$store.state.serviceStep == 1">
            <div class="boxsteptwo">
                <div class="serchbox">
                    <div class="container catgSearchDropdown">
                        <input type="text" v-model="searchText" class="form-control" @keyup="searchCatg(searchText)" placeholder="Demenagement, peinture, fuite, fuite d’eau..." name="">
                        <div class="catgSrchList" v-if="searchedList.length > 0">
                            <ul>
                                <li v-for="searchdata in searchedList" :key="searchdata.id" @click="singleSearch(searchdata)">
                                    {{searchdata.title}}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="greywrp">
                    <div class="radio checkcategory">
                        <div class="btn-block text-center" v-for="catg in serviceCategoryList" :key="catg.id">
                            <label>
                                <input type="button" @click="nextCategoryData(catg.id, 'F')" class="offit openstep3" name="subcategorytype">
                                <div class="catebox">
                                    <p>{{catg.title}}</p>
                                </div>
                            </label>
                        </div>

                    <div class="text-center">
                        <input type="button" value="Back" @click="backToRoot" class="btn btnback backto1st btn-lg btn-warning">
                    </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- step one -->

        <!-- step two -->
        <div class="boxstep3 stepbxoff" style="display: block;" v-if="$store.state.serviceStep == 2">
            <div class="serchbox">
                <div class="container catgSearchDropdown">

                    <input type="text" v-model="searchText" class="form-control" @keyup="searchCatg(searchText)" placeholder="Demenagement, peinture, fuite, fuite d’eau..." name="">
                    <div class="catgSrchList" v-if="searchedList.length > 0">
                        <ul>
                            <li v-for="searchdata in searchedList" :key="searchdata.id" @click="singleSearch(searchdata)">
                                {{searchdata.title}}
                            </li>
                        </ul>
                    </div>

                    <div class="stepmenu stepmenurequest">
                        <ul class="list-inline">
                            <li v-for="bread in breadCrumbList" :key="bread.id">
                                <a class="showmenu" href="javascript:void(0);">
                                    {{bread.title}}
                                    <i class="fa fa-angle-right"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
            <!-- :class="{ 'selected': $store.state.serviceSelectedStep.id == catg.id }" -->

            <div class="greywrp menuboxtoshow1">
                <div class="container">
                    <div class="catmenuList catmenuListrequest">
                        <ul class="list-unstyled menutxt menufirst" id="myulid">
                            <li 
                                v-for="catg in serviceCategoryList" 
                                :key="catg.id" 
                                :class="{ 'selected': selected.includes(catg.id) }"
                                >
                                <a id="s1" href="javascript:void(0);" @click="nextCategoryData(catg.id, 'L', catg)">{{catg.title}}</a>
                            </li>
                        </ul>
                        <input type="button" value="Back" @click="nextCategoryData(backParentId, 'B')" class="btn btn-lg btnback backto2nd btn-warning">
                    </div>
                </div>
            </div>
        </div>
        <!-- step two -->

        <!-- step three -->
        <div class="boxstep4 stepbxoff" style="display: block;" v-if="$store.state.serviceStep == 3">
            <div class="stepfourwrap">
                <div class="boxform">
                    <div class="text-center">
                        <h1 class="stepTitle">De quoi qvez-vous besoin ?</h1>
                    </div>
                    <div class="clearfix">
                        <div class="radio checkcategory pull-left">
                            <label
                                v-for="catg in rootCategoryList" :key="catg.id"
                                :class="{ selectedCatg: catg.id == breadCrumbList[0].id }"
                            >
                                <input type="button" @click="nextCategoryData(catg.id, 'P')" class="offit backto3rd" name="sub2categorytype">
                                <div class="catebox">
                                    <p>{{catg.title}}</p>
                                </div>
                            </label>
                        </div>

                        <div class="rightbxform pull-left">
                            <div class="row">
                                <div class="col-sm-6 form-group">
                                    <select class="form-control" v-model="serviceForm.rate_type">
                                        <option value="">Select Price Type</option>
                                        <option value="H">Hourly Rate</option>
                                        <option value="F">Fixed Price</option>
                                    </select>
                                    <br>
                                    <alert type="danger" v-if="errorObj.rate_type != ''">
                                        {{errorObj.rate_type}}
                                    </alert>
                                </div>
                                <div class="col-sm-6 form-group">
                                    <input type="number" v-model="serviceForm.price" placeholder="Amount" class="form-control">
                                    <br>
                                    <alert type="danger" v-if="errorObj.price != ''">
                                        {{errorObj.price}}
                                    </alert>
                                </div>
                            </div>
                            <div class="form-group">
                                <input type="text" placeholder="Title" v-model="serviceForm.title" class="form-control" name="">
                                <br>
                                <alert type="danger" v-if="errorObj.title != ''">
                                    {{errorObj.title}}
                                </alert>
                            </div>
                            <div class="form-group">
                                <input type="email" placeholder="Email" v-model="serviceForm.contact_email" id="contact_email" class="form-control" name="">
                                <br>
                                <alert type="danger" v-if="errorObj.contact_email != ''">
                                    {{errorObj.contact_email}}
                                </alert>
                            </div>
                            <div class="form-group">
                                <input type="number" placeholder="Enter Phone Number" v-model="serviceForm.contact_phone" id="contact_phone" class="form-control" name="">
                                <br>
                                <alert type="danger" v-if="errorObj.contact_phone != ''">
                                    {{errorObj.contact_phone}}
                                </alert>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 form-group">
                                    <datepicker placeholder="Date From" class="form-control addatepicker" v-model="serviceForm.from_date"></datepicker>
                                    <br>
                                    <alert type="danger" v-if="errorObj.from_date != ''">
                                        {{errorObj.from_date}}
                                    </alert>
                                </div>
                                <div class="col-sm-6 form-group">
                                    <datepicker placeholder="Date To" class="form-control addatepicker" v-model="serviceForm.to_date"></datepicker>
                                    <br>
                                    <alert type="danger" v-if="errorObj.to_date != ''">
                                        {{errorObj.to_date}}
                                    </alert>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-sm-6 form-group" id="frmtimepick">
                                    <!-- <input type="text" placeholder="Time from" class="form-control time" name=""> -->
                                    <!-- <input id="mtimeFrom" placeholder="Time From" class="form-control" value=""> -->
                                    <vue-timepicker class="form-control" format="hh:mm" v-model="timeFrom"></vue-timepicker>
                                </div>
                                <div class="col-sm-6 form-group" id="totimepick">
                                    <!-- <input type="text" placeholder="Time to" class="form-control time" name=""> -->
                                    <!-- <input id="mtimeTo" placeholder="Time To" class="form-control" value=""> -->
                                    <vue-timepicker class="form-control" format="hh:mm" v-model="timeTo"></vue-timepicker>
                                </div>
                            </div>
                            <div class="form-group dropdown localrel">
                                <input type="text" class="form-control" v-model="location" @keyup="getLocation" placeholder="Location" name="">
                                <div class="autosuggest" v-if="locationList.length > 0">
                                    <ul>
                                        <li
                                            v-for="itemlocation in locationList"
                                            @click="selectaddress(itemlocation.description)"
                                            :key="itemlocation.id"
                                        >{{itemlocation.description}}</li>
                                    </ul>
                                </div>
                                <br>
                                <alert type="danger" v-if="errorObj.address != ''">
                                    {{errorObj.address}}
                                </alert>
                            </div>
                            <div class="form-group">
                                <textarea class="form-control" v-model="serviceForm.description" placeholder="Discription" cols="" rows="4"></textarea>
                                <br>
                                <alert type="danger" v-if="errorObj.description != ''">
                                    {{errorObj.description}}
                                </alert>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 form-group">
                                    <input type="button" value="Back" @click="nextCategoryData(backParentId)" class="btn btn-md btnback backto3rd btn-warning full">
                                </div>
                                <div class="col-sm-6">
                                    <input type="button" v-if="submitButton == 'submit'" @click="submitService" value="Request Subject" class="btn btn-md btn-warning full">
                                    <input type="button" v-if="submitButton == 'update'" @click="submitService" value="Update Subject" class="btn btn-md btn-warning full">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <alert title="success!" v-if="success" type="success" :closable="false">
                                        <span v-if="submitButton == 'submit'">
                                            Well done! You successfully post a service
                                        </span>
                                        <span v-else>
                                            Well done! You successfully updated service
                                        </span>
                                    </alert>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- step three -->


    </div>
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../http';
import { config } from '../config';
import store from '../store';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import Datepicker from 'vuejs-datepicker';
import VueTimepicker from 'vue2-timepicker'

export default {
    name: 'CreateAdServiceModal',
    components: {
        VueGoogleAutocomplete,
        Datepicker,
        VueTimepicker
    },
    data () {
        return {
            categoryListStep: [],
            loading: false,
            serviceCategoryList: [],
            breadCrumbList: [],
            backParentId: '',
            rootCategoryList: [],
            searchText: '',
            searchedList: [],
            success: false,
            timeFrom: {
                hh: '',
                mm: '',
            },
            timeTo: {
                hh: '',
                mm: '',
            },
            location: '',
            locationList: [],
            serviceForm: {
                category: '',
                title: '',
                description: '',
                price: '',
                rate_type: '',
                zipcode: '',
                address: '',
                city: '',
                state: '',
                lat: '',
                lng: '',
                contact_email: '',
                contact_phone: '',
                from_date: '',
                from_time: '',
                to_date: '',
                to_time: ''
            },
            errorObj: {
                address: '',
                contact_email: '',
                contact_phone: '',
                description: '',
                from_date: '',
                price: '',
                rate_type: '',
                title: '',
                to_date: ''
            },
            submitButton: 'submit',
            postId: '',
            selected: []
        }
    },
    created() {
        // alert(this.$store.state.serviceModalParentId)
        this.getNextCatg(this.$store.state.serviceModalParentId);
    },
    mounted() {
        if(location.hash.split('#')[1] == 'editservice') {
            // alert(JSON.parse(sessionStorage.getItem('editService')).id)
            this.postId = JSON.parse(sessionStorage.getItem('editService')).id;

            this.submitButton = 'update';
            setTimeout(() => {
                let categoryId = JSON.parse(sessionStorage.getItem('editService')).category;
                this.nextCategoryData(categoryId);
            }, 100)
        } else {
            this.submitButton = 'submit';
        }
    },
    methods: {
        selectaddress($data){
            this.serviceForm.address = $data;
            this.location = $data;
            this.locationList = [];
        },
        getLocation(){
            // console.log(this.location)
            // autocomplete?address=Kolkata
            HTTP.get(`autocomplete?address=${this.location}`)
                .then(response => {
                    this.locationList = response.data.predictions;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        singleSearch($data){
            // console.log($data);

            store.commit('serviceStepper', 3);

            this.serviceCategoryList = $data.categories;
            this.breadCrumbList = $data.breadcrumbs;
            this.backParentId = $data.parent_id*1;

            this.searchedList = [];

            this.nextCategoryData($data.id);
        },
        searchCatg($data){
            HTTP.post(`search-categories?api_token=${TOKEN}`, {searchTxt: $data, type_flag: 'S'})
                .then(response => {
                    // console.log(response.data)
                    this.searchedList = response.data;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        getRootCatg(dataId){
            this.loading = true;
            HTTP.post(`categories?api_token=${TOKEN}&id=${this.postId}`, {parent_id: dataId, type_flag: 'S'})
                .then(response => {
                    this.rootCategoryList = response.data.categories
                    this.selected = response.data.selected
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        nextCategoryData(id, $ev, $fulldata){

            if($ev == 'L'){
                // console.log($fulldata)
                // store.commit('changeServiceSelectedStep', $fulldata)
            }
            if($ev == 'B'){
                // console.log(id)
                // store.commit('changeServiceSelectedStep', [])
                if(id == 0){
                    setTimeout(() => {
                        store.commit('serviceStepper', 1);
                    }, 1000)
                }
                
            }

            this.searchText = '';
            
            this.getNextCatg(id);

            // root categories
            this.getRootCatg(0);
        },
        getNextCatg(dataId){
            this.loading = true;
            HTTP.post(`categories?api_token=${TOKEN}&id=${this.postId}`, {parent_id: dataId, type_flag: 'S'})
                .then(response => {
                    this.serviceCategoryList = response.data.categories;
                    this.breadCrumbList = response.data.breadcrumbs;
                    this.backParentId = response.data.parent_id*1;

                    this.selected = response.data.selected

                    // let data = response.data;
                    this.breadCrumb = response.data.breadcrumbs;
                    if(this.breadCrumb.length == 0){
                        store.commit('serviceStepper', 1);

                        if(location.hash.split('#')[1] == 'editservice') {
                            store.commit('serviceStepper', 3);
                        }

                    } else {
                        store.commit('serviceStepper', 2);


                        this.serviceForm.address = '';
                        this.serviceForm.contact_email = '';
                        this.serviceForm.contact_phone = '';
                        this.serviceForm.description = '';
                        this.serviceForm.from_date = '';
                        this.serviceForm.price = '';
                        this.serviceForm.rate_type = '';
                        this.serviceForm.title = '';
                        this.serviceForm.to_date = ''

                        this.location = '';
                        this.timeFrom = {
                            hh: '',
                            mm: '',
                        };
                        this.timeTo = {
                            hh: '',
                            mm: '',
                        };

                    }
                    if(this.serviceCategoryList.length == 0){
                        store.commit('serviceStepper', 3);

                        if(location.hash.split('#')[1] == 'addservice') {
                            this.serviceForm.contact_email = AUTH_DATA.email;
                            this.serviceForm.contact_phone = AUTH_DATA.phone_number;
                        }
                        if(location.hash.split('#')[1] == 'editservice') {
                            // get the edited data
                            let editData = JSON.parse(sessionStorage.getItem('editService'));
                            
                            // set the value
                            this.serviceForm.category= editData.category;
                            this.serviceForm.title= editData.title;
                            this.serviceForm.description= editData.description;
                            this.serviceForm.price= editData.price;
                            this.serviceForm.rate_type= editData.rate_type;
                            this.serviceForm.zipcode= editData.zipcode;
                            this.serviceForm.address= editData.address;
                            this.location= editData.address;
                            this.serviceForm.city= editData.city;
                            this.serviceForm.state= editData.state;
                            this.serviceForm.lat= editData.lat;
                            this.serviceForm.lng= editData.lng;
                            this.serviceForm.contact_email= editData.contact_email;
                            this.serviceForm.contact_phone= editData.contact_phone;
                            this.serviceForm.from_date= editData.from_date;
                            this.serviceForm.to_date= editData.to_date;

                            this.timeFrom = {
                                hh: editData.from_time.split(':')[0],
                                mm: editData.from_time.split(':')[1],
                            };
                            this.timeTo = {
                                hh: editData.to_time.split(':')[0],
                                mm: editData.to_time.split(':')[1],
                            };
                        }

                    }
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        backToRoot(){
            store.commit('isOpenService', false);
            store.commit('serviceStepper', 0);
        },
        goToSecondStep(){
            store.commit('serviceStepper', 2);
        },
        goToThirdStep(){
            store.commit('serviceStepper', 3);
        },
        getAddressData: function (addressData, placeResultData) {
            // this.address = addressData;
            console.log(addressData, placeResultData)
        },
        submitService(){
            // console.log(this.breadCrumbList)
            const getLastCategory = this.breadCrumbList.slice(-1)[0];
            this.serviceForm.category = getLastCategory.id;
            this.serviceForm.from_date = moment(this.serviceForm.from_date).format('YYYY-MM-DD');
            this.serviceForm.to_date = moment(this.serviceForm.to_date).format('YYYY-MM-DD');
            this.serviceForm.from_time = `${this.timeFrom.hh}:${this.timeFrom.mm}`;
            this.serviceForm.to_time = `${this.timeTo.hh}:${this.timeTo.mm}`;


            if(this.submitButton == 'submit'){
                // console.log(this.serviceForm)

                HTTP.post(`requests?api_token=${TOKEN}`, this.serviceForm)
                    .then(response => {
                        // console.log(response.data);

                        if(response.data.status == 'fail'){
                            this.errorObj.address = response.data.errors.address == undefined ? '' : response.data.errors.address[0];
                            this.errorObj.contact_email = response.data.errors.contact_email == undefined ? '' : response.data.errors.contact_email[0];
                            this.errorObj.contact_phone = response.data.errors.contact_phone == undefined ? '' : response.data.errors.contact_phone[0];
                            this.errorObj.description = response.data.errors.description == undefined ? '' : response.data.errors.description[0];
                            this.errorObj.from_date = response.data.errors.from_date == undefined ? '' : response.data.errors.from_date[0];
                            this.errorObj.price = response.data.errors.price == undefined ? '' : response.data.errors.price[0];
                            this.errorObj.rate_type = response.data.errors.rate_type == undefined ? '' : response.data.errors.rate_type[0];
                            this.errorObj.title = response.data.errors.title == undefined ? '' : response.data.errors.title[0];
                            this.errorObj.to_date = response.data.errors.to_date == undefined ? '' : response.data.errors.to_date[0];
                        } else {
                            this.success = true;
                            this.errorObj.address = ''
                            this.errorObj.contact_email = '';
                            this.errorObj.contact_phone = '';
                            this.errorObj.description = '';
                            this.errorObj.from_date = '';
                            this.errorObj.price = '';
                            this.errorObj.rate_type = '';
                            this.errorObj.title = '';
                            this.errorObj.to_date = '';
                            setTimeout(() => {
                                $('.parentchoosingmodal').find('.close').trigger('click');
                                this.$router.push('my-ad');
                                window.location.href = '/my-ad';
                            }, 2000)
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            } else {

                let id = JSON.parse(sessionStorage.getItem('editService')).id;

                // console.log(this.serviceForm)

                HTTP.put(`requests/${id}?api_token=${TOKEN}`, this.serviceForm)
                    .then(response => {
                        // console.log(response.data);

                        if(response.data.status == 'fail'){
                            this.errorObj.address = response.data.errors.address == undefined ? '' : response.data.errors.address[0];
                            this.errorObj.contact_email = response.data.errors.contact_email == undefined ? '' : response.data.errors.contact_email[0];
                            this.errorObj.contact_phone = response.data.errors.contact_phone == undefined ? '' : response.data.errors.contact_phone[0];
                            this.errorObj.description = response.data.errors.description == undefined ? '' : response.data.errors.description[0];
                            this.errorObj.from_date = response.data.errors.from_date == undefined ? '' : response.data.errors.from_date[0];
                            this.errorObj.price = response.data.errors.price == undefined ? '' : response.data.errors.price[0];
                            this.errorObj.rate_type = response.data.errors.rate_type == undefined ? '' : response.data.errors.rate_type[0];
                            this.errorObj.title = response.data.errors.title == undefined ? '' : response.data.errors.title[0];
                            this.errorObj.to_date = response.data.errors.to_date == undefined ? '' : response.data.errors.to_date[0];
                        } else {
                            this.success = true;
                            this.errorObj.address = ''
                            this.errorObj.contact_email = '';
                            this.errorObj.contact_phone = '';
                            this.errorObj.description = '';
                            this.errorObj.from_date = '';
                            this.errorObj.price = '';
                            this.errorObj.rate_type = '';
                            this.errorObj.title = '';
                            this.errorObj.to_date = '';
                            setTimeout(() => {
                                $('.parentchoosingmodal').find('.close').trigger('click');
                                this.$router.push('my-ad');
                                window.location.reload();
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.catgloader{
    width: 100%;
    height: 100%;
    left: 0;
    position: absolute;
    z-index: 99999;
    background: #eeeeee;
}
.lds-double-ring{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.stepmenurequest li:last-child i{
    display: none;
}
.checkcategory .selectedCatg .catebox {
    box-shadow: 0px 3px 7px rgba(0,0,0,0.37);
    background-color: #fffbef;
}
.catgSrchList{
    position: absolute;
    z-index: 9999;
    width: 100%;
    left: 0;
    font-size: 17px;
    color: #928d8c;
    padding: 20px;
    background: #fff;
    box-shadow: 0 5px 5px #0000001f;
    border: 2px solid #eee;
}
.catgSrchList li{
    line-height: 40px;
    border-bottom: 2px solid #eee;
    cursor: pointer;
}
.catgSrchList li:hover{
    color: #000;
}
.catgSrchList li:last-child{
    border-bottom: 0px;
}
#myulid li.selected a {
    color: #ff621f;
}
</style>
