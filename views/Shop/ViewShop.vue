<template>
    <section class="detailpage">

        <div class="catgloader pageload" v-if="mainloader">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>

        <div class="havenotshop" v-if="hasShop == false">
            <div class="container">
                <br><br>
                <h1>You haven't created your shop</h1>
            </div>
        </div>

		<div class="container" v-else>
			<ol class="breadcrumb">
				<li><strong>Category:</strong> {{shopData.category_name}}</li>
			</ol>

            <div class="brdt0opnew"></div>
			<h1 class="prDname">{{shopData.name}}</h1>

            <div class="row row_18">

				<div class="col-sm-4 imgDcol">
                    
                    <ul class="leftimggal shopImgGallery">
                        <li v-for="(photo, index) in shopData.photos" :key="index">
                            <img v-img:my-group :src="photo.src" >
                        </li>
                    </ul>
                    
				</div>

                <div class="col-sm-5 contDcol">
                    <div class="dropdown dropcs pull-right" v-if="authData.id*1 == shopData.user_id*1 && routeName != 'user-shop'">
                        <a id="dLabel" data-target="#" href="http://example.com" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <img src="assets/images/bullets_ico.png" class="img-responsive">
                        </a>
                        <ul class="dropdown-menu actionmenu" aria-labelledby="dLabel">
                            <li><a href="javascript:void(0);" @click="editShop"><i class="fa fa-pencil"></i> Modify</a></li>
                            <li><a href="javascript:void(0);" @click="deleteShop"><i class="fa fa-trash"></i> Erase</a></li>
                        </ul>							
                    </div>
					<div class="productDinfo">
						
						<div class="clearfix listgpwhite panel-body">							
							<p class="smparaprd paralocatin"><span><img src="assets/images/location.png" class="img-responsive"></span>{{shopData.address}}</p>

							<p class="smparaprd"><span><img src="assets/images/clock.png" class="img-responsive"></span>{{shopData.from_time}}h to {{shopData.to_time}}h.</p>

							<p class="smparaprd"><span><img src="assets/images/phone_orgn.png" class="img-responsive"></span><span class="phontxt">{{shopData.phone}}</span></p>

							<p class="smparaprd"><span><img src="assets/images/briefcase.png" class="img-responsive"></span>Siren N<sup>o</sup> : {{shopData.siren}}</p>

                            <p class="smparaprd" v-if="shopData.website != null">
                                <span><img src="assets/images/briefcase.png" class="img-responsive"></span>
                                 Website : <a :href="shopData.website" target="_blank">{{shopData.website}}</a>
                            </p>
						</div>

						<div class="prDdesk" v-html="shopData.description">
                            
						</div>

						
					</div>	
				</div>

                <div class="col-sm-3 mapDcol">
                    <div class="prDmap">
                        <div id="map"></div>
                    </div>
                </div>

			</div>

            <div class="brdt0opnew"></div>
			
            <all-offer-service v-if="routeName != 'user-shop'"></all-offer-service>
            <all-offer-service-view :userid="routeQuery.u_shp*1" v-else></all-offer-service-view>
            

		</div>
	</section>
    
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import AllOfferService from '@/components/AllOfferService';
import AllOfferServiceView from '@/components/AllOfferServiceView';

export default {
    name: 'ViewShop',
    components: {
        'all-offer-service': AllOfferService,
        'all-offer-service-view': AllOfferServiceView
	},
    created(){
        // console.log(this.$route)

        this.routeName = this.$route.name;
        this.routeQuery = this.$route.query;


        

        if(this.routeName == 'user-shop'){
            this.getPublicShop(this.$route.query.u_shp);
        } else {
            HTTP.get(`checkShop?api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data);
                    if(response.data.shopExist == 1){
                        this.hasShop = true;

                        this.getShop();
                    } else {
                        this.hasShop = false;
                    }

                    setTimeout(() => {
                        this.mainloader = false;
                    }, 1000);
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        }


            

        
    },
    mounted(){
        // 
        // this.initMap()

        // this.positionMap('bally howrah')
    },
    data() {
        return {
            shopData: [],
            ad_image_url: config.shop_images,
            hasShop: true,
            mainloader: true,
            authData: AUTH_DATA,
            routeName: '',
            routeQuery: {}
        }
    },
    methods: {
        initMap(lat, lng) {
            // The location of Uluru
            // var uluru = {lat: 19.0759837, lng: 72.87765590000004};
            var uluru = {lat: lat, lng: lng};
            // The map, centered at Uluru
            var map = new google.maps.Map(
                document.getElementById('map'), {zoom: 4, center: uluru});
            // The marker, positioned at Uluru
            // var marker = new google.maps.Marker({position: uluru, map: map});
        },
        positionMap(mainAddresss){
            HTTP.get(`getLocation?address=${mainAddresss}`)
            .then(response => {
                if(response.data.status == "ZERO_RESULTS"){
                    this.initMap();
                } else {
                    let lat = response.data.results[0].geometry.location.lat;
                    let lng = response.data.results[0].geometry.location.lng;
                    // The location of Uluru
                    var uluru = {lat: lat, lng: lng};;
                    // The map, centered at Uluru
                    var map = new google.maps.Map(
                        document.getElementById('map'), {zoom: 10, center: uluru});
                    // The marker, positioned at Uluru
                    var marker = new google.maps.Marker({position: uluru, map: map});
                }

            })
            .catch(e => {
                console.log(e);
                // alert('Something went wrong!');
            })
        },
        getShop(){
            this.mainloader = true;
            HTTP.get(`shops?api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data);
                    this.shopData = response.data;

                    this.initMap(response.data.lat, response.data.lng);
                    setTimeout(() => {
                        this.positionMap(this.shopData.address);
                    }, 500)
                    
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        getPublicShop(userid){
            this.mainloader = true;
            HTTP.get(`shop-details/${userid}?api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data);
                    this.shopData = response.data;

                    this.initMap(response.data.lat, response.data.lng);
                    setTimeout(() => {
                        this.positionMap(this.shopData.address);
                    }, 500)
                    
                    this.mainloader = false;
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
        },
        editShop(){
            this.$router.push({ path: 'edit-shop', query: { tok_id: TOKEN, shp: this.shopData.id}});
        },
        deleteShop(){
            if(confirm('Want to delete your shop!')){
                HTTP.delete(`shops/${this.shopData.id}?api_token=${TOKEN}`)
                    .then(response => {
                        console.log(response.data);
                        let msg = 'You shop deleted successfully';
                        this.$notify.success({
                            content: msg,
                            transition: 'zoom'
                        });

                        setTimeout(() => {
							this.$router.push('profile');
						}, 1500);
                    })
                    .catch(e => {
                        console.log(e);
                        // alert('Something went wrong!');
                        let msg = 'Something was not right!';
                        this.$notify.error({
                            content: msg,
                            transition: 'zoom'
                        });
                    })
            }
        }
		
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #map {
        height: 444px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
    }
	.colprdinfo.servicedetailspage{
		width: 100%;
	}
</style>
