<template>
    <section class="productdetail">

		<modal
			title="Report about this ad"
			:width="520"
			:is-show="isShowRprtPop"
			transition="fadeDown"
			:show-footer="false"
			@close="closeReportPop"
			:show-ok="false"
			:show-cancel="false"
			:backdrop-closable="false"
		>
			<textarea class="form-control" rows="6" placeholder="Write your report" v-model="reportData">
			</textarea>
			<br />
			<button :disabled="reportLoad" @click="reportAd" class="btn btn-default radd30 btnevnt pull-right">
				Send
			</button>
		</modal>

		<div class="catgloader pageload" v-if="loading">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>

		<div class="container">
			<ol class="breadcrumb">
				<li v-for="(cat, i) in ad_details.categories" :key="i">{{cat.title}}</li>
			</ol>


			<div class="row">

				<div class="col-sm-3 colprdgal" :class="{ 'hasoneimg': ad_details.image_count == 1 }" id="hasptdzoomer" v-if="ad_details.type == 1">
					
					<!-- <ProductZoomer
						:base-images="images"
						:base-zoomer-options="zoomerOptions"
					/> -->

					<ul class="leftimggal pdtImgGallery">
                        <li v-for="(photo, index) in images.large_size" :key="index">
                            <img v-img:my-group :src="photo.url" >
                        </li>
                    </ul>

					<p class="smparaprd"><span><img src="assets/images/calender.png" class="img-responsive"></span>Posted on {{ad_details.updated_at | moment("MMMM Do YYYY, h:mm a")}}</p>
				</div>

				<div class="col-sm-3 requestDetails" v-if="ad_details.type == 2">
					<div class="prodct_ico" style="background-color:#6d67e5; ">
						<div class="vcenter">
							<img :src="ad_details.category_image" class="img-responsive">
						</div>
					</div>
				</div>

				

				<div :class="{ 'col-sm-9': ad_details.type == 2, 'col-sm-7 colprdinfo': ad_details.type == 1}">
					<div class="productDinfo">
						<h1 class="prDname pull-left">{{ad_details.title}}</h1>
						<div class="dropdown dropcs pull-right" v-if="user_id == ad_details.user_id*1">
							<a id="dLabel" data-target="#" href="http://example.com" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
								<img src="assets/images/bullets_ico.png" class="img-responsive">
							</a>
							<ul class="dropdown-menu actionmenu" aria-labelledby="dLabel">
								<li><a href="javascript:void(0);" @click="editPost(ad_details.type, ad_details.id, ad_details)"><i class="fa fa-pencil"></i> Modify</a></li>
								<li><a href="javascript:void(0);" @click="deleteAd(ad_details.id)"><i class="fa fa-trash"></i> Erase</a></li>
							</ul>
						</div>
						<div class="clearfix"></div>
						<span class="pricebig block"><strong> {{ad_details.price}}€</strong></span>
						<div class="clearfix">
							<a href="javascript:void(0);" @click="contactCount(ad_details.id, 2)" class="btn btn-default btnprD chatbtn"><span><img src="assets/images/ico_bubble.png" class="img-responsive"></span>Envoyer un message</a>
							<a :href="`tel:${ad_details.contact_phone}`" @click="contactCount(ad_details.id, 3)" class="btn btn-default btnprD callbtn" v-if="ad_details.hide_phone == 0">
								<span><img src="assets/images/phone_ico_new.png" class="img-responsive"></span>
								Numéro de téléphone
							</a>
						</div>

						<p class="smparaprd paralocatin"><span><img src="assets/images/location.png" class="img-responsive"></span>{{ad_details.address}}</p>

						<p class="smparaprd"><span><img src="assets/images/clock.png" class="img-responsive"></span>{{ad_details.from_date | moment("MMMM Do YY")}} to {{ad_details.to_date | moment("MMMM Do YY")}} from {{ad_details.from_time}}h to {{ad_details.to_time}}h.</p>
						<p class="smparaprd">
							<span><img src="assets/images/briefcase.png" class="img-responsive"></span>{{ad_details.user_type == 2 ? 'Pro' : ''}} Services <strong>{{ad_details.user_name}}</strong> 
							number: <span v-if="ad_details.hide_phone == 0">{{ad_details.contact_phone}}</span>
							<span v-else>Phone number is confidencial</span>
						</p>

						<div class="prDmap">
                            <div id="map"></div>
						</div>
						<p class="smparaprd" v-if="ad_details.type == 2"><span><img src="assets/images/calender.png" class="img-responsive"></span>Posted on {{ad_details.updated_at | moment("MMMM Do YYYY, h:mm a")}}</p>
					</div>	
				</div>

			</div>

			<div class="row row_10">
				<div class="col-sm-9">
					<ul class="nav nav-tabs prDtabmenu" role="tablist">
   						<li role="presentation" class="active"><a href="#tab-1" aria-controls="tab-1" role="tab" data-toggle="tab">Description</a></li>
   					</ul>
   					<div class="tab-content prDtabcont">
    					<div role="tabpanel" class="tab-pane active" id="tab-1">
    						<div class="prDdesk" v-html="ad_details.description">
	    					</div>

							<ul class="list-inline threeicolist">
								<li>
									<a class="addwhistlist" :class="{'active': ad_details.save_ad == 1}" @click="saveAd(ad_details.save_ad)" href="javascript:void(0);">
										<i class="fa fa-heart text-orange"></i>&nbsp;&nbsp;&nbsp;Save Ad
									</a>
								</li>
								<li><a href="javascript:void(0);" @click="reportPop"><i class="fa fa-info-circle text-orange"></i>&nbsp;&nbsp;&nbsp;Report about this  Ad</a></li>
								<li id="shareClick">
									<a href="javascript:void(0)" @click="toggleShare">
										<i class="fa fa-share-alt text-orange"></i>&nbsp;&nbsp;&nbsp;Share this ad
									</a>
									<social-sharing :url="shareUrl" v-if="displayShare" inline-template>
										<div class="socialShare">
											<network network="facebook">
												<i class="fa fa-fw fa-facebook"></i>
											</network>
											<network network="googleplus">
												<i class="fa fa-fw fa-google-plus"></i>
											</network>
											<network network="linkedin">
												<i class="fa fa-fw fa-linkedin"></i>
											</network>
											<network network="pinterest">
												<i class="fa fa-fw fa-pinterest"></i>
											</network>
											<network network="reddit">
												<i class="fa fa-fw fa-reddit"></i>
											</network>
											<network network="twitter">
												<i class="fa fa-fw fa-twitter"></i>
											</network>
											<network network="whatsapp">
												<i class="fa fa-fw fa-whatsapp"></i>
											</network>
										</div>
									</social-sharing>

								</li>
								
							</ul>

    					</div>
    				</div>

    				<div class="row row_24">
    					<div class="col-sm-6 prdoAddcol">
    						<div class="prdAdd">
    							<h3>Professionals ...</h3>
    							<p>... if you see this local advertising, your customers too!</p>
    							<a class="text-orange" href="javascript:void(0);"><i class="fa fa-share-alt"></i>&nbsp;tootella.fr</a>
    						</div>
    					</div>
    					
    					<div class="col-sm-6 prdoAddcol">
    						<div class="prdAdd">
    							<h3>Professionals ...</h3>
    							<p>... if you see this local advertising, your customers too!</p>
    							<a class="text-orange" href="javascript:void(0);"><i class="fa fa-share-alt"></i>&nbsp;tootella.fr</a>
    						</div>
    					</div>

    				</div>

				</div>
                <div class="col-sm-3">
					<div class="rightprDpanel">
						<img src="assets/images/add_photo.jpg" class="img-responsive">
					</div>
				</div>
			</div>

		</div>

	</section>
</template>

<script>
import { HTTP, TOKEN, AUTH_DATA } from '../../http';
import { config } from '../../config';
import store from '../../store';
import ProductZoomer from 'vue-product-zoomer';

export default {
    name: 'AdDetails',
    components: {
		ProductZoomer
	},
    created(){
        // get the ad id from query params
        this.ad_id = this.$route.query.my_ad;
        // fetch ad
		this.fetchAddetails(this.ad_id);
		
		// made share url
		this.shareUrl = window.location.href;
    },
    mounted(){
		// 
    },
    data() {
        return {
			ad_id: '',
			user_id: AUTH_DATA.id,
			ad_details: [],
			loading: true,
			shareUrl: '',
			isShowRprtPop: false,
			reportData: '',
			reportLoad: false,
			displayShare: false,
			images: {},
			zoomerOptions: {
				'zoomFactor': 3,
				'pane': 'pane',
				'hoverDelay': 300,
				'namespace': 'zoomer',
				'move_by_click':false,
				'scroll_items': 7,
				'choosed_thumb_border_color': "#ff8c3a"
			}
        }
    },
    methods: {
		contactCount(id, type){
			HTTP.post(`ad-contact?api_token=${TOKEN}`, {ad_id: id, view_type: type})
                .then(response => {
					// 
                })
                .catch(e => {
                    console.log(e);
                    // alert('Something went wrong!');
                })
		},
        fetchAddetails(ad_id){
            HTTP.get(`ad-details/${ad_id}?api_token=${TOKEN}`)
                .then(response => {
                    let data = response.data;
					this.ad_details = data;
					
					this.images = data.images;
                    
                    this.initMap(data.lat, data.lng);
                    setTimeout(() => {
                        this.positionMap(data.address);
					}, 500)
					
					this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        initMap(lat, lng) {
            // The location of Uluru
            // {lat: 19.0759837, lng: 72.87765590000004};
            var uluru = {lat: lat, lng: lng};;
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
		editPost($type, $id, $data){
			if($type == 1){
				this.$router.push({ path: 'edit-ad', query: { my_ad: $id*1 }})
			} else {
				sessionStorage.setItem('editService', JSON.stringify($data));

				$('#placeAnAD')[0].click();
				location.hash = 'editservice';

				store.commit('isOpenService', true);
			}
		},
		deleteAd(id) {
            if(confirm('Want to delete this Ad?')){
                HTTP.delete(`my-ads/${id}?api_token=${TOKEN}`)
                    .then(response => {
                        let msg = 'Ad deleted successfully';
                        this.$notify.success({
                            content: msg,
                            transition: 'zoom'
                        });

						setTimeout(() => {
							this.$router.push('my-ad');
						}, 1500);
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            }
		},
		toggleShare(){
			this.displayShare = this.displayShare == true ? false : true;
		},
		reportPop(){
			if(this.user_id == this.ad_details.user_id*1){
				let msg = "You can't report your own post !";
				this.$notify.success({
					content: msg,
					transition: 'zoom'
				});
			} else {
				this.isShowRprtPop = true;
			}
		},
		closeReportPop(){
			this.isShowRprtPop = false;
			this.reportData = '';
		},
		saveAd($data){
			if(this.user_id == this.ad_details.user_id*1){
				let msg = "You can't save your own post !";
				this.$notify.success({
					content: msg,
					transition: 'zoom'
				});
			} else {
				let localData = {
					ad_id: this.ad_details.id,
					type: $data == 0 ? 'S' : 'D'
				}
				HTTP.post(`save-ad?api_token=${TOKEN}`, localData)
					.then(response => {
						// let data = response.data;
						let msg = response.data;
							this.$notify.success({
								content: msg,
								transition: 'zoom'
							});
						this.fetchAddetails(this.ad_details.id);
					})
					.catch(e => {
						console.log(e);
					})
			}
		},
		reportAd(){
			this.reportLoad = true;
			let localData = {
				ad_id: this.ad_details.id,
				message: this.reportData
			}
			HTTP.post(`report-ad?api_token=${TOKEN}`, localData)
                .then(response => {
					// let data = response.data;
					let msg = 'You reported successfully';
                        this.$notify.success({
                            content: msg,
                            transition: 'zoom'
						});

					this.reportLoad = false;
					this.closeReportPop();
                })
                .catch(e => {
					console.log(e);
					this.$notify.success({
						content: 'Something is not right!',
						transition: 'zoom'
					});
					this.reportLoad = false;
                })
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    #map {
        height: 250px;  /* The height is 400 pixels */
        width: 100%;  /* The width is the width of the web page */
    }
	.colprdinfo.servicedetailspage{
		width: 100%;
	}
</style>
