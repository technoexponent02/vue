<template>
    <section class="profilepage">
		<div class="container">
			
			<div class="row row_18">
				<div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
					<user-profile-card></user-profile-card>

                    <left-aside-nav></left-aside-nav>
				</div>

				<div class="col-lg-9 col-md-9 col-sm-8 procolleft">
					<div class="tabProduct">
						<ul class="nav nav-tabs" role="tablist">
						    <li role="presentation" :class="{'active': type == 'O'}" @click="tabChange">
								<a href="javascript:void(0);">Offers</a>
							</li>
						    <li role="presentation" :class="{'active': type == 'S'}" @click="tabChange">
								<a href="javascript:void(0);">Requests</a>
							</li>
						</ul>

						<div class="tab-content" style="position:relative;">

							<div class="catgloader pageload" v-if="loader">
								<div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
							</div>

						   <div role="tabpanel" class="tab-pane active" id="tabpro_1">
						   		<div class="panel-body">
							   		<div class="row row_11">

										<div v-if="pdtList.length == 0" class="no_data_found">
                                            <img src="assets/images/no_data.png" class="img-responsive">
                                        </div>

							   			<div class="col-sm-4 col-xs-lg-6 col-xs-md-6 protbCol" v-for="pdt in pdtList" :key="pdt.id">
							   				<div class="prodesk">
							   					<a class="additwhistlist active" href="javascript:void(0);" @click="removeFav(pdt.id)"><i class="fa fa-heart"></i></a>
											    <figure>
											        <router-link :to="{ name: 'ad-details', query: { my_ad: pdt.id }}">
														<img :src="imgUrl + pdt.photos[0].save_name" v-if="pdt.photos.length > 0" class="img-responsive">
														<img :src="pdt.category_image" v-else class="img-responsive">
											        </router-link>
											    </figure>

											    <div class="clearfix padlr10 paddingb5">
											        <h5 class="protitel pull-left">
														<router-link :to="{ name: 'ad-details', query: { my_ad: pdt.id }}">
															{{pdt.title}}
														</router-link>
													</h5>
											        <h4 class="proprice pull-right">{{pdt.price}}€</h4>
											    </div>

											    <!-- <div class="threetxt">
											        <span>199 859 Km</span>
											        <span>10/1995</span>
											        <span>Hybrid</span>
											    </div> -->
											    <div class="padlr10">
											        <p class="smalltxt address">{{pdt.address}}</p>
													<div class="clearfix margint5">
														<p class="smalltxt pull-left">{{pdt.user_name}}, {{pdt.from_time}}</p>
												        <a href="javascript:void(0);" class="mr0 probtn pull-right" v-if="pdt.user_type == 2">Pro</a>							        
											        </div>
											    </div>
											    <a href="javascript:void(0);" class="categoryname text-center">
											        <!-- <img src="assets/images/car.png"> -->
													{{pdt.category_title}}
											    </a>
											</div>
							   			</div>

										<div id="paginationcs" class="paginationcs clearfix pull-right">
											<pagination :records="totalPostRecords" :per-page="per_page" @paginate="setPage"></pagination>
											<div class="pagiload" v-if="pagiload">
												<img src="assets/images/paginate-load.gif" alt="image">
											</div>
										</div>

							   		</div>
							   	</div>

						   </div>

						</div>

					</div>
					

				</div><!-- left col ]] -->


				
			</div>
		</div>

	</section>
</template>

<script>
import LeftAsideNav from '@/components/LeftAsideNav';
import UserProfileCard from '@/components/UserProfileCard';
import { HTTP, TOKEN } from '../../http';
import { config } from '../../config';
import { Pagination } from 'vue-pagination-2';


export default {
    name: 'MySaved',
    components: {
		'left-aside-nav': LeftAsideNav,
		'user-profile-card': UserProfileCard,
		Pagination
    },
    data() {
        return {
			type: 'O',
			loader: false,
			pdtList: [],
			imgUrl: config.ad_images,
			currentPage: 1,
			totalPostRecords: 0,
			per_page: 6,
			pagiload: false
        }
	},
	created(){
		if(location.hash.split('#')[1] != undefined){
			if(location.hash.split('#')[1] == 'offer'){
				this.type = 'O'
			} else {
				this.type = 'S'
			}
		}

		this.getFav(this.currentPage, 'main');
	},
    methods: {
		removeFav(id){
			HTTP.post(`save-ad?api_token=${TOKEN}`, {ad_id: id, type: 'D'})
				.then(response => {
					let msg = 'Removed from your saved list';
					this.$notify.success({
						content: msg,
						transition: 'zoom'
					});
					
					// removed from array
					this.pdtList = this.pdtList.filter(m => m.id*1 != id*1)
				})
				.catch(e => {
					console.log(e);
				})
		},
		getFav(currentpage, callingArea){
			let type = this.type == 'S' ? 2 : 1;

			if(callingArea == 'main'){
				this.loader = true;
			}
			if(callingArea == 'pagination'){
				this.pagiload = true;
			}
			
			HTTP.post(`saved-ads?api_token=${TOKEN}&page=${currentpage}`, {type: type})
				.then(response => {
					let data = response.data;

					this.pdtList = data.data;
					this.totalPostRecords = data.total;
					this.currentPage = data.current_page;

					this.loader = false;
					this.pagiload = false;

					window.scrollTo(0,0)
				})
				.catch(e => {
					console.log(e);
					this.loader = false;
					this.pagiload = false;
				})

		},
		setPage(page){
			this.currentPage = page;
			this.getFav(this.currentPage, 'pagination');
		},
		tabChange(){
			this.type = this.type == 'S' ? 'O' : 'S';
			this.currentPage = 1;

			if(this.type == 'S'){
				window.location.hash = 'requests'
			} else {
				window.location.hash = 'offer'
			}

			this.getFav(this.currentPage, 'main');
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.catgloader.pageload {
    position: absolute;
    background: #fcfcfcdb;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.catgloader.pageload .lds-double-ring {
    top: 110px;
}

</style>
