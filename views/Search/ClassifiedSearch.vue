<template>
    <section class="searchpage cloffer">
		<div class="container">

			<div class="row row_10">
				<div class="col-lg-9 col-md-9 col-sm-9 searColLeft">
					<div class="tabbox">
						<div class="clearfix menubrd">
						  <ul class="nav nav-tabs pull-left" role="tablist">
						    <li role="presentation" class="active"><a href="#tab_1" aria-controls="tab_1" role="tab" data-toggle="tab" aria-expanded="true"><span>All</span> {{totalPostRecords}}</a></li>
						    <li role="presentation" class=""><a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab" aria-expanded="false"><span>Particular</span> 654 057</a></li>
						    <li role="presentation" class=""><a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab" aria-expanded="false"><span>Professional</span> 654 057</a></li>
						  </ul>

							<div class="filterdata">
									<div class="filterload" v-if="filterLoad">
										<img src="assets/images/paginate-load.gif" alt="image">
									</div>
									<div class="sortbybtn pull-right clearfix">
										<span>Sort By :</span>
										<select class="form-control" @change="changeFilter($event)">
											<option value="date">Date</option>
											<option value="priceL">Low to High</option>
											<option value="priceH">High to Low</option>
										</select>
									</div>
							</div>
						  
						</div>

					  <!-- Tab panes -->
					  <div class="tab-content">
					    <div role="tabpanel" class="tab-pane active" id="tab_1">
					    	<div class="panel-body">

								<!-- <h5 v-if="postList.length == 0">{{nodata}}</h5> -->

								<div v-if="postList.length == 0" class="no_data_found">
									<img src="assets/images/no_data.png" class="img-responsive">
								</div>

					    		<ul v-else class="listOffer list-unstyled">

					    			<li v-for="post in postList" :key="post.id">
					    				<div class="row">

					    					<figure class="col-sm-3" v-if="post.photos.length > 0">
					    						<a href="javascript:void(0);">
														<img :src="imgUrl + post.photos[0].save_name" class="img-responsive">
													</a>
					    						<span class="coutfig">{{post.photos.length}}</span>
					    					</figure>
												<figure class="col-sm-3" v-else>
					    						<a href="javascript:void(0);">
														<img :src="post.category_image" class="img-responsive">
													</a>
					    					</figure>

					    					<div class="cont col-sm-9">
					    						<h3 class="loftitle">
													<router-link :to="{ name: 'ad-details', query: { my_ad: post.id }}">
														<strong>{{post.title}}</strong>
													</router-link>
												</h3>
					    						<span class="addate block"><i class="fa fa-map-marker" aria-hidden="true"></i> {{post.address}}</span>
					    						<span class="text-muted txt12 block">{{post.category_title}}</span>
					    						<span class="pricebig block"><strong>{{post.price}}€</strong></span>
					    						<span class="oftime block text-muted">{{post.updated_at | moment("MMM Do YY")}}</span>
					    					</div>	
					    				</div>
					    				<a class="whishlistof" :class="['fav-' + post.id, {'active': post.favourite == 1 }]" @click="addToFav(post.id, post.favourite)" href="javascript:void(0);">
												<i class="fa fa-heart"></i>
											</a>
					    			</li>

					    		</ul>
					    		<div id="paginationcs" class="paginationcs clearfix pull-right">
										<pagination :records="totalPostRecords" :per-page="per_page" @paginate="setPage"></pagination>
					    			<div class="pagiload" v-if="pagiload">
											<img src="assets/images/paginate-load.gif" alt="image">
										</div>
										<!-- <span>...</span>
					    			<a href="javascript:void(0);">1</a>
					    			<a href="javascript:void(0);">2</a>
					    			<a class="bigpagi" href="javascript:void(0);">3</a>
					    			<a class="active" href="javascript:void(0);">4</a>
					    			<a class="bigpagi" href="javascript:void(0);">5</a>
					    			<a href="javascript:void(0);">6</a>
					    			<a href="javascript:void(0);">7</a>
					    			<span>...</span> -->
					    		</div>
					    		<div class="clearfix"></div>
					    	</div>
					    </div>
					    <div role="tabpanel" class="tab-pane" id="tab_2">...</div>
					  </div>

					</div>
				</div>


				<div class="serrightCol col-sm-3">
					<div class="rightpanel panel-body">

						<h3 class="rptitle">featured ads</h3>
						
                        <left-side-featured-ad-widget></left-side-featured-ad-widget>

					</div>
                    <center>
                        <img src="assets/images/add-1.png" class="img-responsive">
                    </center>
				</div>
			</div>

		</div>
	</section>
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import LeftSideFeaturedAdWidget from '@/components/LeftSideFeaturedAdWidget';
import { Pagination } from 'vue-pagination-2';

export default {
    name: 'ClassifiedSearch',
    components: {
        'left-side-featured-ad-widget': LeftSideFeaturedAdWidget,
				Pagination
    },
    data () {
        return {
					searchPost: {
						orderBy: 'updated_at',
						orderType: 'DESC',
						searchTxt: '',
						category: '',
						type: ''
					},
					pagiload: false,
					filterLoad: false,
					currentPage: 1,
					postList: [],
					totalPostRecords: 0,
					per_page: 10,
					nodata: '',
					imgUrl: config.ad_images
					// searchQuery: '',
					// catgId: '',
					// catgType: ''
        }
    },
    created() {
			this.searchPost.searchTxt = this.$route.query.search_query;
			this.searchPost.category = this.$route.query.catg_i;
			this.searchPost.type = this.$route.query.type == 'S' ? 2 : 1;

			this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
    },
    mounted() {
			// console.log(this.searchPost)
    },
    methods: {
			fetchServiceAndOffer(token, postObj, pageNumber){
				HTTP.post(`search-requests?page=${pageNumber}&api_token=${token}`, postObj)
					.then(response => {
						// console.log(response.data)
						this.postList = response.data.data;
						this.totalPostRecords = response.data.total;

						if(this.postList.length == 0){
							this.nodata = "No data found"
						}

						this.pagiload = false;
						this.filterLoad = false;
						window.scrollTo(0,0)
					})
					.catch(e => {
							console.log(e);
							alert('Something went wrong!');
							this.filterLoad = false;
							this.pagiload = false;
					})
			},
			setPage(page){
				this.pagiload = true;
				this.currentPage = page;
				this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
			},
			changeFilter($event){
				this.filterLoad = true;
				// console.log($event.target.value)
				if($event.target.value == 'date'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'updated_at';
					this.searchPost.orderType = 'DESC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}

				if($event.target.value == 'priceL'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'ASC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}

				if($event.target.value == 'priceH'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'DESC';

					this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
				}


			},
			addToFav(id, fav){
				// console.log(id, fav);
					if(fav == 0){
						$(`.fav-${id}`).addClass('active');
						HTTP.post(`add-favourite?api_token=${TOKEN}`, {id: id})
						.then(response => {
							let msg = 'Added to your favourite list';
							this.$notify.success({
									content: msg,
									transition: 'zoom'
							});
							$(`.fav-${id}`).addClass('active');
							this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
						})
						.catch(e => {
								console.log(e);
						})
					} else {
						$(`.fav-${id}`).removeClass('active');
						HTTP.post(`remove-favourite?api_token=${TOKEN}`, {id: id})
						.then(response => {
							let msg = 'Removed from your favourite list';
							this.$notify.success({
									content: msg,
									transition: 'zoom'
							});
							$(`.fav-${id}`).removeClass('active');
							this.fetchServiceAndOffer(TOKEN, this.searchPost, this.currentPage)
						})
						.catch(e => {
								console.log(e);
						})
					}
			}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.filterdata{
	float: right;
}
.filterload{
	width: 30px;
	float: left;
	margin: 15px 10px;
}

</style>
