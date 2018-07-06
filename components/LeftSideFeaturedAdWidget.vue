<template>
    <div>

        <div class="mainload" v-if="load" style="padding: 20px 0;">
            <h1>
                <img src="assets/images/paginate-load.gif" alt="image" style="width:40px;">
                Loading ...
            </h1>
        </div>

        <div class="prodesk"  v-if="myAdList.length == 0 && !load">
            There is no featured ads yet.
        </div>

        <div class="prodesk" v-for="myAd in myAdList" :key="myAd.id">
            <figure>
                <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                    <img :src="imgUrl + myAd.photos[0].save_name" v-if="myAd.photos.length > 0" class="img-responsive">
                    <img :src="myAd.category_image" v-else class="img-responsive">
                </router-link>
            </figure>

            <div class="clearfix padlr10">
                <h5 class="protitel pull-left">
                    <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                        {{myAd.title}}
                    </router-link>
                </h5>
                <h4 class="proprice pull-right">{{myAd.price}}€</h4>
            </div>

            <!-- <div class="threetxt">
                <span>199 859 Km</span>
                <span>10/1995</span>
                <span>Hybrid</span>
            </div> -->
            <div class="padlr10">
                <p class="smalltxt">{{myAd.address}}</p>
                <div class="clearfix mrt10">
                    <p class="smalltxt pull-left">{{myAd.user_name}}, {{myAd.from_time}}</p>
                    <a href="javascript:void(0);" v-if="myAd.user_type == 2" class="mr0 probtn pull-right">Pro</a>							        
                </div>
            </div>
            <a href="javascript:void(0);" class="categoryname text-center">
                <img src="assets/images/car.png">{{myAd.category_name}}
            </a>
        </div>
    </div>
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../http';
import { config } from '../config';

export default {
    name: 'LeftSideFeaturedAdWidget',
    props: {
        msg: String
    },
    data () {
        return {
            myAdList: [],
            imgUrl: config.ad_images,
            load: true
        }
    },
    created() {
        this.getFeAd();
    },
    mounted() {

    },
    methods: {
        getFeAd(){
            HTTP.get(`fetured-ads`)
                .then(response => {
                    this.myAdList = response.data.data;
                    this.load = false;
                    // console.log(this.myAdList)
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                    // this.load = false;
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
