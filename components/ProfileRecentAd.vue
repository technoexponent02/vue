<template>
    <div class="white-bg">
        <div class="panel-body borderdiv">
            <ul class="listOffer list-unstyled">

                <li v-for="myAd in myAdList" :key="myAd.id">
                    <div class="row">
                        <figure class="col-sm-3">
                            <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                                <img :src="imgUrl + myAd.photos[0].save_name" v-if="myAd.photos.length > 0" class="img-responsive">
                                <img :src="myAd.category_image" v-else class="img-responsive">
                            </router-link>
                            <span class="coutfig" v-if="myAd.photos.length > 0">{{myAd.photos.length}}</span>
                        </figure>
                        <div class="cont col-sm-9 clearfix">
                            <h3 class="loftitle">
                                <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                                    <strong>{{myAd.title}}</strong>
                                </router-link>
                            </h3>
                            <div class="pull-left leftcont">
                                <span class="addate block">
                                    <i class="fa fa-map-marker" aria-hidden="true"></i>{{myAd.address}}</span>
                                <span class="text-muted txt12 block">{{myAd.category_name}}</span>
                            </div>
                            <div class="clearfix twobtnsec">
                                <!-- <a class="whishlistof pull-right" href="javascript:void(0);">
                                    <i class="fa fa-heart"></i>
                                </a> -->
                                <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                            </div>
                            <div class="clearfix"></div>
                            <span class="pricebig block">
                                <strong>{{myAd.price}}€</strong>
                            </span>
                            <span class="oftime text-muted">{{myAd.created_at | moment("MMM Do YY")}}</span>
                            <span class="textwcicon text-muted">
                                <img src="assets/images/eye-md.png">&nbsp;&nbsp;{{myAd.visit_count | kFormatter}} total view</span>
                            <span class="textwcicon text-muted">
                                <img src="assets/images/phone-md.png">&nbsp;&nbsp;{{myAd.contact_visit_count | kFormatter}} view</span>
                            <span class="withbadge_ico relative">
                                <sup>
                                    <span class="badge">{{myAd.email_visit_count | kFormatter}}</span>
                                </sup>
                                <img src="assets/images/envelope_md.png">
                            </span>

                            <router-link :to="`/edit-ad?my_ad=${myAd.id}`" v-if="myAd.type == 1" class="btnnewedit pull-right">
                                <i class="fa fa-pencil"></i>
                            </router-link>
                            <a href="javascript:void(0);" class="btnnewedit pull-right" v-else @click="editService(myAd)">
                                <i class="fa fa-pencil"></i>
                            </a>

                            <div class="clearfix"></div>
                        </div>
                    </div>
                </li>

            </ul>

        </div>

        </div>
</template>

<script>
import { HTTP, TOKEN, AUTH_DATA } from '../http';
import { config } from '../config';
import store from '../store';

export default {
    name: 'ProfileRecentAd',
    props: {
        msg: String
    },
    data() {
        return {
            myAdList: [],
            imgUrl: config.ad_images,
        }
    },
    created(){
        this.getMyAd()
    },
    mounted(){

    },
    methods: {

        getMyAd(){
            HTTP.get(`my-ads?page=1&api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data.data)

                    this.myAdList = response.data.data

                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },

        editService($data){

            sessionStorage.setItem('editService', JSON.stringify($data));

            $('#placeAnAD')[0].click();
            location.hash = 'editservice';

            store.commit('isOpenService', true);
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
