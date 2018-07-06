<template>
    <div class="alloff" id="aloff">
        <div class="clearfix offrtlwrap">
            <h4 class="prDtitel pull-left mr0">Offers {{totalPostRecords}}</h4>

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

        <div class="row row_24">

            <div class="col-sm-3 col-xs-lg-6 col-xs-md-6" v-for="myAd in myAdList" :key="myAd.id">
                <div class="prodesk">
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
                        <h4 class="proprice pull-right">{{myAd.price}}€<sup>cc</sup></h4>
                    </div>

                    <div class="threetxt">
                        <!-- <span>199 859 Km</span>
                        <span>10/1995</span>
                        <span>Hybrid</span> -->
                    </div>
                    <div class="padlr10">
                        <p class="smalltxt">{{myAd.address}}</p>
                        <div class="clearfix mrt10">
                            <p class="smalltxt pull-left">
                                {{myAd.user_name}}, 
                                {{myAd.from_time}}
                            </p>
                            <a href="javascript:void(0);" class="mr0 probtn pull-right" v-if="myAd.user_type">Pro</a>							        
                        </div>
                    </div>
                    <a href="javascript:void(0);" class="categoryname text-center">
                        <!-- <img src="assets/images/car.png"> -->
                        {{myAd.category_name}}
                    </a>
                </div>
            </div><!-- prd one ]] -->

        </div>

        <div id="paginationcs" class="paginationcs clearfix pull-right">
            <pagination :records="totalPostRecords" :per-page="per_page" @paginate="setPage"></pagination>
            <div class="pagiload" v-if="pagiload">
                <img src="assets/images/paginate-load.gif" alt="image">
            </div>
        </div>
    </div>
</template>

<script>
import { HTTP, TOKEN } from '../http';
import { config } from '../config';
import { Pagination } from 'vue-pagination-2';



export default {
    name: 'AllOfferService',
    props: {
        msg: String,
        userid: Number
    },
    components: {
		Pagination
    },
    data() {
        return {
            myAdList: [],
            currentPage: 1,
            totalPostRecords: 0,
			per_page: 8,
            imgUrl: config.ad_images,
            pagiload: false,
			filterLoad: false,
            searchPost: {
                orderBy: 'updated_at',
                orderType: 'DESC',
                searchTxt: '',
                category: '',
                type: ''
            },
        }
    },
    created(){
        this.getAd(this.currentPage, this.searchPost);

        // alert(this.userid)
    },
    methods: {
        scrollDivPosition(){
            $('html, body').animate({
                scrollTop: $("#aloff").offset().top - 100
            }, 1000);
        },
        changeFilter($event){
				this.filterLoad = true;
				// console.log($event.target.value)
				if($event.target.value == 'date'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'updated_at';
					this.searchPost.orderType = 'DESC';

					this.getAd(this.currentPage, this.searchPost);
				}

				if($event.target.value == 'priceL'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'ASC';

					this.getAd(this.currentPage, this.searchPost);
				}

				if($event.target.value == 'priceH'){
					this.currentPage = 1;
					this.searchPost.orderBy = 'price';
					this.searchPost.orderType = 'DESC';

					this.getAd(this.currentPage, this.searchPost);
                }
                
                this.scrollDivPosition();

		},
        getAd(page, filterData){
            HTTP.get(`shop-listing/${this.userid}?page=${page}&api_token=${TOKEN}&orderBy=${filterData.orderBy}&orderType=${filterData.orderType}`)
                .then(response => {
                    // console.log(response.data.data)
                    
                    this.myAdList = response.data.data;

                    this.totalPostRecords = response.data.total;

                    this.pagiload = false;
                    this.filterLoad = false;
                    
                    // this.scrollDivPosition();

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
            this.getAd(this.currentPage, this.searchPost);

            this.scrollDivPosition();
        },
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
