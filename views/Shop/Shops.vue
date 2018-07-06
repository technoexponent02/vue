<template>
    <section class="shoppage">
		<div class="container">
			<div class="catgloader pageload" v-if="loader">
				<div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
			</div>
			<div class="catmenu">
				<h2 class="titelp"><strong>CATEGORY</strong></h2>

				<div class="row row_19">

					<div class="col-sm-4 col-xs-lg-6 col-xs-md-6" v-for="catg in catglist" :key="catg.id">
						<a href="javascript:void(0);" class="catbx clearfix" @click="clickCatg(catg.id)">
							<img src="assets/images/nocar.png" class="img-responsive" v-if="catg.image == null">
							<img :src="catg.image" class="img-responsive" v-else>
							<strong>{{catg.title}}</strong>
						</a>
					</div>

				</div>
			</div>

			<h2 class="titelp"><strong>IMMOBILIER</strong></h2>

			<div class="row row_10" id="btmshoplisting">
				<div v-if="shopList.length == 0">
					<h1>There no shops available</h1>
				</div>
				<div v-else class="col-sm-3 col-xs-lg-6 col-xs-md-6" v-for="shp in shopList" :key="shp.id">
					<div class="sprD">
						<figure>
							<router-link :to="{ name: 'user-shop', query: { u_ct_i: shp.category_name, u_shp: shp.user_id, u_id_t: shp.id }}"><img :src="`${imgUrl}${shp.photos[0].save_name}`" class="img-responsive"></router-link>
						</figure>

						<div class="panel-body">
							<h5 class="titlesprD">
								<router-link :to="{ name: 'user-shop', query: { u_ct_i: shp.category_name, u_shp: shp.user_id, u_id_t: shp.id }}">{{shp.name}}</router-link>
							</h5>
							
							<div class="shpListDot">
								{{shp.short_description}}
							</div><br>
							<p class="countsprD">{{shp.listing}} listings</p>
							<p class="txt12">{{shp.category_name}}</p>							
							<p class="txt12">{{shp.user_name}}</p>
						</div>
						<h6 class="opentiem text-orange">Opening Time: {{shp.from_time}}</h6>
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

	</section>
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import { Pagination } from 'vue-pagination-2';

export default {
	name: 'Shops',
	components: {
		Pagination
    },
	data() {
		return {
			catglist: [],
			catgId: 0,
			shopList: [],
			imgUrl: config.shop_images,
			currentPage: 1,
			totalPostRecords: 0,
			per_page: 1,
			pagiload: false,
			loader: false,
		}
	},
	created(){

		this.loader = true;
		this.getCatg(0);

	},
	mounted(){
		// 
	},
	methods: {
		getCatg(id){
			HTTP.post(`categories?api_token=${TOKEN}`, {parent_id: id})
				.then(response => {
					// console.log(response.data.categories);
					this.catglist = response.data.categories;

					this.getShops(0);
				})
				.catch(e => {
					console.log(e);
					alert('Something went wrong!');
				})
		},
		clickCatg(id){
			// alert(id)
			this.catgId = id;
			this.getShops(this.catgId, this.currentPage);
		},
		getShops(id, pageNumber){
			HTTP.post(`get-shop-by-category?api_token=${TOKEN}&page=${pageNumber}`, {category_id: id})
				.then(response => {
					// console.log(response.data);
					// this.catglist = response.data.categories;

					this.shopList = response.data.data;
					this.totalPostRecords = response.data.total;
					this.currentPage = response.data.current_page;

					this.pagiload = false;

					this.loader = false;

					if(id != 0){
						$('html, body').animate({
							scrollTop: $("#btmshoplisting").offset().top - 200
						}, 1000);
					}
				})
				.catch(e => {
					console.log(e);
					alert('Something went wrong!');
				})
		},
		setPage(page){
			this.pagiload = true;

			this.currentPage = page;
			this.getShops(this.catgId , this.currentPage);

			$('html, body').animate({
				scrollTop: $("#btmshoplisting").offset().top - 200
			}, 1000);
		},
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
