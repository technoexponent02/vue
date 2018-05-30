<template>
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
                    <i class="fa fa-th-large" aria-hidden="true"></i>&nbsp;<span id="thecatename">
                        {{$store.state.placeAdSelectedCatgStore.title == '' ? 'Selectionnez votre categorie' : $store.state.placeAdSelectedCatgStore.title}}
                    </span>
                </button>
            </div>

                <div class="form-group">
                    <input
                        type="text"
                        v-model="adTitle"
                        class="form-control"
                        placeholder="Ad Title *"
                        name="ad title"
                    >
                    <span v-show="errors.has('ad title')" class="help is-danger">{{ errors.first('ad title') }}</span>
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
                    <span v-show="errors.has('ad details')" class="help is-danger">{{ errors.first('ad details') }}</span>
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
                </div>

                <p class="adpara">Photos : Une annonce avec photo est 7 fois plus consultée qu'une annonce sans photo</p>

                <div class="clearfix row_12">

                    <label class="pull-left">
                        <input type="radio" name="phonetype" class="hidden">
                        <div class="chekphoto">
                            <div class="brwrap">
                                <span class="txttt">Main Photo</span>
                                <span>
                                    <img src="assets/images/addphoto.png" class="img-responsive">
                                </span>
                            </div>
                        </div>
                    </label>

                    <label class="pull-left">
                        <input type="radio" name="phonetype" class="hidden">
                        <div class="chekphoto">
                            <div class="brwrap">
                                <span class="txttt">Photo 2</span>
                                <span>
                                    <img src="assets/images/addphoto.png" class="img-responsive">
                                </span>
                            </div>
                        </div>
                    </label>

                    <label class="pull-left">
                        <input type="radio" name="phonetype" class="hidden">
                        <div class="chekphoto">
                            <div class="brwrap">
                                <span class="txttt">Photo 3</span>
                                <span>
                                    <img src="assets/images/addphoto.png" class="img-responsive">
                                </span>
                            </div>
                        </div>
                    </label>

                    <label class="pull-left">
                        <input type="radio" checked="" name="phonetype" class="hidden">
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
            </div>
        </div>
        <div class="white-bg borderdiv mrgb25 mapncontwrap">
            <div class="row row_8">
                <div class="col-sm-6">
                    <div class="mapadd">
                        <div class="maptxtnbtn">
                            <div class="clearfix paddwrap">
                                <p class="pull-left">Lorem Ipsum is simply dummy text of the 
                                printing and typesetting industry.</p>

                                <div class="btnwrpaddm pull-right">
                                    <a href="javascript:void(0);" class="licatonmapbtn btn btn-warning"><span class="v_center"><img src="assets/images/locatnbg.png" class="img-responsive"></span></a>
                                    <a href="javascript:void(0);" class="btnwhite btn btn-warning"><span class="v_center"><img src="assets/images/btndd.png" class="img-responsive"></span></a>
                                </div>
                            </div>
                        </div>
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2620.0706489178983!2d2.3033567508375055!3d48.952140601954056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e668b8c8ac9623%3A0x8462da593b69714!2s20+Rue+du+Port%2C+93800+%C3%89pinay-sur-Seine%2C+France!5e0!3m2!1sen!2sin!4v1508919685670" width="600" height="450" frameborder="0" style="border:0" allowfullscreen=""></iframe>
                    </div>
                </div>


                <div class="col-sm-6">
                    <h3 class="ntitel">CITY OR ZIP CODE<sup>*</sup></h3>
                    <div class="form-group withdlbtn">
                        <input type="text" class="form-control bglocation" placeholder="Bagmundi 32159" name="">
                        <a class="deltbtn" href="javascript:void(0);"><img src="assets/images/close_ico.png" class="img-responsive"></a>
                    </div>


                    <h3 class="ntitel">ADDRESS</h3>
                    <div class="row row_8">
                        <div class="col-sm-8">
                            <div class="form-group withdlbtn">
                                <input type="text" class="form-control bglocation" placeholder="Bagmundi 32159" name="">
                                <a class="deltbtn" href="javascript:void(0);"><img src="assets/images/close_ico.png" class="img-responsive"></a>
                            </div>
                        </div>
                        <div class="col-sm-4">
                            <input type="button" class="btn btn-warning btn-block btnvaly" value="Validate my address" name="">
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
                <p class="adpara form-group">levaletservices@gmail.com</p>

                <h3 class="ntitel">Phone <sup>*</sup></h3>
                <div class="form-group">
                    <input type="text" class="form-control" placeholder="32159 - 852963 - 5648" name="">
                </div>

                <div class="row">
                        <div class="col-sm-6 form-group">
                            <select class="form-control">
                                <option selected="">Day from</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                        <div class="col-sm-6 form-group">
                            <select class="form-control">
                                <option selected="">Day to</option>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                            </select>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-sm-6 form-group">
                            <input type="text" placeholder="Time from" class="form-control time" name="">
                        </div>
                        <div class="col-sm-6 form-group">
                            <input type="text" placeholder="Time to" class="form-control time" name="">
                        </div>
                    </div>


                <label class="adpara">
                    <input type="checkbox" class="hidden" name="hghgh">

                    <div class="checkico">
                        <i class="fa fa-square-o on" aria-hidden="true"></i>
                        <i class="fa fa-check-square-o toOn" aria-hidden="true"></i>
                    </div>
                    Hide the phone number in the ad.
                </label>

                <label class="adpara">
                    <input type="checkbox" class="hidden" name="hghgh">

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
                <input type="button" value="Place an offer" class="btn btn-md btn-warning">
            </div>
        </div>
    </div>
</template>

<script>

import {HTTP} from '../../http';
import CreateAdModal from '@/components/CreateAdModal';
import store from '../../store'
import { VueEditor } from 'vue2-editor'

export default {
    name: 'CreateAd',
    components: {
        'create-ad': CreateAdModal,
        VueEditor
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
            ]
        }
    },
    created() {
        sessionStorage.removeItem('categorySelected');
        HTTP.post(`categories`, {parent_id: this.createAdId})
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
    },
    methods: {
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
</style>
