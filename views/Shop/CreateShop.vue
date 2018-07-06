<template>

    <div class="container">

        <div class="catgloader pageload" v-if="mainloader">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>

        <div class="white-bg borderdiv mrgb25" v-if="hasShop">
            <h2 class="text-center mr0 addtitle">You had a Shop</h2>
            <br>
            <router-link to="/view-shop">Go to your shop</router-link>
        </div>

        <div v-else class="white-bg borderdiv mrgb25" >
            <h2 class="text-center mr0 addtitle">Créer un magasin</h2>
            <div class="addbx center-block">

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Shop Name *" name="" v-model="name">
                    <br>
                    <alert type="danger" v-if="errorObj.name != ''">
                        {{errorObj.name}}
                    </alert>
                </div>

                <div class="form-group">
                    <label>Select category</label>
                    <select v-model="selectedCatg" class="form-control">
                        <option value="">Select a category</option>
                        <option :value="catg.id" v-for="catg in listCatg" :key="catg.id">{{catg.title}}</option>
                    </select>
                    <br>
                    <alert type="danger" v-if="errorObj.category != ''">
                        {{errorObj.category}}
                    </alert>
                </div>

                <div class="form-group">
                    <label>Shop details:</label>
                    <vue-editor
                        v-model="description"
                        name="Shop Description"
                        :editorToolbar="customToolbar"
                    ></vue-editor>
                    <br>
                    <alert type="danger" v-if="errorObj.description != ''">
                        {{errorObj.description}}
                    </alert>
                </div>

                <p class="adpara">Photos : Upload shop images</p>

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

                </div>

                <br />
                <alert type="danger" v-if="errorObj.images != ''">
                    {{errorObj.images}}
                </alert>

                <br />

                <div class="form-group">
                    <!-- <input type="text" class="form-control" placeholder="Address" name="" v-model="address"> -->
                    <vue-google-autocomplete
                        id="map2"
                        ref="toAddress"
                        classname="form-control"
                        placeholder="Start typing your address"
                        v-on:placechanged="getAddressData"
                        v-on:inputChange="changeCity($event)"
                        country="in"
                    >
                    </vue-google-autocomplete>
                    
                    <br />
                    <alert type="danger" v-if="errorObj.address != ''">
                        {{errorObj.address}}
                    </alert>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Telephone No." name="" v-model="phone">

                    <br />
                    <alert type="danger" v-if="errorObj.phone != ''">
                        {{errorObj.phone}}
                    </alert>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Siren" name="" v-model="siren">

                    <br />
                    <alert type="danger" v-if="errorObj.siren != ''">
                        {{errorObj.siren}}
                    </alert>
                </div>

                <div class="form-group">
                    <div class="row">
                        <div class="col-md-6">
                            <label>From timing:</label>
                            <vue-timepicker class="form-control" format="hh:mm" v-model="from_time"></vue-timepicker>

                            <br />
                            <alert type="danger" v-if="errorObj.from_time != ''">
                                {{errorObj.from_time}}
                            </alert>
                        </div>
                        <div class="col-md-6">
                            <label>To timing:</label>
                            <vue-timepicker class="form-control" format="hh:mm" v-model="to_time"></vue-timepicker>
                            
                            <br />
                            <alert type="danger" v-if="errorObj.to_time != ''">
                                {{errorObj.to_time}}
                            </alert>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <input type="text" class="form-control" placeholder="Put valid url wil http:// or https://" name="" v-model="website">

                    <br />
                    <alert type="danger" v-if="errorObj.website != ''">
                        {{errorObj.website}}
                    </alert>
                </div>

                <div class="clearfix">
                    <div>
                        <input type="button" value="Update Shop" v-if="updateBtn" @click="updateShop" class="btn btn-md btn-warning">
                        <input type="button" value="Create Shop" v-else @click="createShop" class="btn btn-md btn-warning">
                        <br /><br />
                        <alert title="success!" type="success" v-if="success" :closable="false">
                            Well done! You successfully created your own shop
                        </alert>
                        <alert title="success!" type="success" v-if="esuccess" :closable="false">
                            Well done! You successfully updated your own shop
                        </alert>
                    </div>
                </div>
                

            </div>
        </div>
    </div>
    
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import { VueEditor } from 'vue2-editor';
import VueGoogleAutocomplete from 'vue-google-autocomplete';
import VueTimepicker from 'vue2-timepicker';

export default {
    name: 'CreateShop',
    components: {
        VueEditor,
        VueGoogleAutocomplete,
        VueTimepicker
    },
    data () {
        return {
            'name': '',
            'description': '',
            'address': '',
            'phone': '',
            'siren': '',
            'from_time': {
                hh: '',
                mm: '',
            },
            'to_time': {
                hh: '',
                mm: '',
            },
            'website': '',
            'ad_image_url': config.shop_images,
            'success': false,
            'esuccess': false,
            'customToolbar': [
                ['bold', 'italic', 'underline'],
                [{ 'list': 'ordered'}, { 'list': 'bullet' }]
            ],
            'adImageHolder': [
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
                'name': '',
                'description': '',
                'images': '',
                'address': '',
                'phone': '',
                'siren': '',
                'from_time': '',
                'to_time': '',
                'category': '',
                'website': ''
            },
            mainloader: true,
            hasShop: false,
            selectedCatg: '',
            listCatg: [],
            updateBtn: false
        }
    },
    created() {
        if(location.pathname.split('/')[1] == 'edit-shop'){
            this.mainloader = true;
            this.catgList();
            this.getEditValues();
        } else {
            HTTP.get(`checkShop?api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data);
                    if(response.data.shopExist == 1){
                        // this.hasShop = true;
                        this.$router.push('view-shop');
                    } else {
                        this.hasShop = false;
                        this.catgList();
                    }

                    this.mainloader = false;
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        }
    },
    methods: {
        removeImage(id){
            this.adImageHolder.filter((m) => {
                if(m.id == id){
                    m.data = []
                    m.disabled = false;
                }
            })
        },
        getEditValues(){
            let token = this.$route.query.tok_id;
            this.updateBtn = true;

            HTTP.get(`shops?api_token=${token}`)
                .then(response => {
                    // console.log(response.data);
                    // this.shopData = response.data;
                    this.name = response.data.name;
                    this.selectedCatg = response.data.category*1;
                    this.description = response.data.description;
                    this.address = response.data.address;
                    setTimeout(() => {
                        $('#map2').val(this.address)
                    }, 500);
                    this.phone = response.data.phone;
                    this.siren = response.data.siren;
                    this.website = response.data.website;
                    this.from_time = {
                        hh: response.data.from_time.split(':')[0],
                        mm: response.data.from_time.split(':')[1]
                    }
                    this.to_time = {
                        hh: response.data.to_time.split(':')[0],
                        mm: response.data.to_time.split(':')[1]
                    }
                    
                    let adPhotos = response.data.photos;

                    // console.log(adPhotos)

                    adPhotos.map((m, i) => {
                        this.adImageHolder[i].data.push(m);
                        this.adImageHolder[i].disabled = true;
                    });

                    this.mainloader = false;


                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        uploadAdImage(event, id) {
            // console.log(event.target.files[0]);
            let formData = new FormData();
            let File = event.target.files[0];
            formData.append("image", File);

            $(`#adp-${id}`).find('.adploading').addClass('active');


            HTTP.post(`upload-shop-image?api_token=${TOKEN}`, formData)
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

        getAddressData: function (addressData, placeResultData, id) {
            this.address = placeResultData.formatted_address;
            // this.lat = addressData.latitude;
            // this.lng = addressData.longitude;
            // console.log(addressData, placeResultData)
        },
        changeCity(event){
            if(event.newVal.length == 0){
                this.address = ''
            }
        },
        createShop(){
            const shopData = {
                'name': this.name,
                'description': this.description,
                'address': this.address,
                'phone': this.phone,
                'siren': this.siren,
                'from_time': '',
                'to_time': '',
                'website': this.website,
                'images': [],
                'category': this.selectedCatg
            }

            this.adImageHolder.map((m) => {
                m.data.map(p => shopData.images.push(p));
            });

            shopData.from_time = `${this.from_time.hh}:${this.from_time.mm}`;
            shopData.to_time = `${this.to_time.hh}:${this.to_time.mm}`;

            // console.log(shopData)

            //  submit value
            HTTP.post(`shops?api_token=${TOKEN}`, shopData)
                .then(response => {
                    // console.log(response.data);

                    if(response.data.status == 'fail'){
                        this.errorObj.name = response.data.errors.name == undefined ? '' : response.data.errors.name[0];
                        this.errorObj.description = response.data.errors.description == undefined ? '' : response.data.errors.description[0];
                        this.errorObj.address = response.data.errors.address == undefined ? '' : response.data.errors.address[0];
                        this.errorObj.phone = response.data.errors.phone == undefined ? '' : response.data.errors.phone[0];
                        this.errorObj.siren = response.data.errors.siren == undefined ? '' : response.data.errors.siren[0];
                        this.errorObj.from_time = response.data.errors.from_time == undefined ? '' : response.data.errors.from_time[0];
                        this.errorObj.to_time = response.data.errors.to_time == undefined ? '' : response.data.errors.to_time[0];
                        this.errorObj.images = response.data.errors.images == undefined ? '' : response.data.errors.images[0];
                        this.errorObj.category = response.data.errors.category == undefined ? '' : response.data.errors.category[0];
                        this.errorObj.website = response.data.errors.website == undefined ? '' : response.data.errors.website[0];
                    
                        window.scrollTo(0, 0);
                    } else {
                        this.errorObj.name = '';
                        this.errorObj.description = '';
                        this.errorObj.address = '';
                        this.errorObj.phone = '';
                        this.errorObj.siren = '';
                        this.errorObj.from_time = '';
                        this.errorObj.to_time = '';
                        this.errorObj.images = '';
                        this.errorObj.category = '';
                        this.errorObj.website = '';

                        this.success = true;
                        setTimeout(() => {
                            this.$router.push('view-shop');
                        }, 2000)
                    }

                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })


        },
        updateShop(){
            const shopData = {
                'name': this.name,
                'description': this.description,
                'address': this.address,
                'phone': this.phone,
                'siren': this.siren,
                'from_time': '',
                'to_time': '',
                'website': this.website,
                'images': [],
                'category': this.selectedCatg
            }

            this.adImageHolder.map((m) => {
                m.data.map(p => shopData.images.push(p));
            });

            shopData.from_time = `${this.from_time.hh}:${this.from_time.mm}`;
            shopData.to_time = `${this.to_time.hh}:${this.to_time.mm}`;

            // console.log(shopData)

            //  submit value
            HTTP.put(`shops/${this.$route.query.shp}?api_token=${TOKEN}`, shopData)
                .then(response => {
                    // console.log(response.data);

                    if(response.data.status == 'fail'){
                        this.errorObj.name = response.data.errors.name == undefined ? '' : response.data.errors.name[0];
                        this.errorObj.description = response.data.errors.description == undefined ? '' : response.data.errors.description[0];
                        this.errorObj.address = response.data.errors.address == undefined ? '' : response.data.errors.address[0];
                        this.errorObj.phone = response.data.errors.phone == undefined ? '' : response.data.errors.phone[0];
                        this.errorObj.siren = response.data.errors.siren == undefined ? '' : response.data.errors.siren[0];
                        this.errorObj.from_time = response.data.errors.from_time == undefined ? '' : response.data.errors.from_time[0];
                        this.errorObj.to_time = response.data.errors.to_time == undefined ? '' : response.data.errors.to_time[0];
                        this.errorObj.images = response.data.errors.images == undefined ? '' : response.data.errors.images[0];
                        this.errorObj.category = response.data.errors.category == undefined ? '' : response.data.errors.category[0];
                        window.scrollTo(0, 0);
                    } else {
                        this.errorObj.name = '';
                        this.errorObj.description = '';
                        this.errorObj.address = '';
                        this.errorObj.phone = '';
                        this.errorObj.siren = '';
                        this.errorObj.from_time = '';
                        this.errorObj.to_time = '';
                        this.errorObj.images = '';
                        this.errorObj.category = '';

                        this.esuccess = true;
                        setTimeout(() => {
                            this.$router.push('view-shop');
                        }, 2000)
                    }

                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        catgList(){
            HTTP.post(`categories?api_token=${TOKEN}`, {parent_id: 0})
                .then(response => {
                    this.listCatg = response.data.categories
                    // console.log(response.data.categories)
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
