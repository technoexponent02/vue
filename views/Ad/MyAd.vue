<template>
    <div>

        <section class="profilepage">
            <div class="container">

                <div class="row row_18">
                    <div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
                        <user-profile-card></user-profile-card>
                        <left-aside-nav></left-aside-nav>
                    </div>

                    <div class="col-lg-9 col-md-9 rightdbcontcol col-sm-8">
                        <div class="clearfix">
                            <h3 class="dbcontitle pull-left">My Advertisements</h3>
                            <button href="javascript:void(0);" @click="addNewAd()" class="btn btn-warning radd30 btngray2 pull-right">
                                Add New Advertisements
                            </button>
                        </div>

                        <div class="adlist">
                            <div v-if="nodata" class="no_data_found">
                                <img src="assets/images/no_data.png" class="img-responsive">
                            </div>

                            <ul class="list-unstyled">

                                <li class="white-bg panel-body clearfix" :class="['aditem-' + myAd.id]" v-for="myAd in myAdList" :key="myAd.id">
                                    <figure class="col-sm-3">
                                        <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                                            <img :src="imgUrl + myAd.photos[0].save_name" v-if="myAd.photos.length > 0" class="img-responsive">
                                            <img :src="myAd.category_image" v-else class="img-responsive">
                                        </router-link>
                                    </figure>
                                    <div class="cont col-sm-9 clearfix">
                                        <h3 class="adtitle">
                                            <!-- <a href="/ad-details?my_ad="> -->
                                            <router-link :to="{ name: 'ad-details', query: { my_ad: myAd.id }}">
                                                {{myAd.title}}
                                            </router-link>
                                            <!-- </a> -->
                                        </h3>
                                        <div class="row">
                                            <div class="col-sm-7 col-md-8 col-lg-9 leftcontt">
                                                <span class="addate">Date: {{myAd.created_at | moment("MMM Do YY")}}</span>
                                                <span class="adprice text-orange"><strong>${{myAd.price}}</strong></span>
                                                <ul class="list-inline listadsm">
                                                    <li><img src="assets/images/eye_ico.png" class="img-responsive">Views: {{myAd.visit_count | kFormatter}}</li>
                                                    
                                                    <li><img src="assets/images/envelope_ico.png" class="img-responsive">Email Views: {{myAd.email_visit_count | kFormatter}}</li>
                                                    
                                                    <li><img src="assets/images/phone_ico.png" class="img-responsive">Contact  Views: {{myAd.contact_visit_count | kFormatter}}</li>

                                                </ul>	
                                            </div>
                                            <div class="col-sm-5 col-md-4 col-lg-3 text-right rightcont">
                                                <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt">Mettre en avant  &gt;
                                                    <img src="assets/images/adbtn_star.png"></a>

                                                <router-link :to="`/edit-ad?my_ad=${myAd.id}`" v-if="myAd.type == 1" class="btn btn-warning radd30 btnedit btn-sm">
                                                    <i class="fa fa-lg fa-edit"></i>
                                                    Edit
                                                </router-link>
                                                
                                                <a href="javascript:void(0)" v-else @click="editService(myAd)" class="btn btn-warning radd30 btnedit btn-sm">
                                                    <i class="fa fa-lg fa-edit"></i>
                                                    Edit
                                                </a>

                                                <button type="button" :disabled="dltBtnDltStatus" @click="deleteAd(myAd.id)" class="btn btn-warning radd30 btndelete btn-sm">
                                                    <img src="assets/images/time-sm.png">Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li><!-- end ]] -->

                                <infinite-loading @infinite="infiniteHandler">
                                    
                                    <span slot="no-more">
                                        <!-- There is no ad -->
                                    </span>
                                </infinite-loading>

                                
                            </ul>
                        </div>
                        
                    </div>
                </div>
            </div>
        </section>

    </div>
</template>

<script>
import { HTTP, TOKEN } from '../../http';
import { config } from '../../config';
import store from '../../store';

import LeftAsideNav from '@/components/LeftAsideNav';
import UserProfileCard from '@/components/UserProfileCard';

import InfiniteLoading from 'vue-infinite-loading';

export default {
    name: 'MyAd',
    components: {
        'left-aside-nav': LeftAsideNav,
        'user-profile-card': UserProfileCard,
        InfiniteLoading
    },
    data() {
        return {
            myAdList: [],
            pageNumber: 1,
            dltBtnDltStatus: false,
            firstName: false,
            nodata: false,
            imgUrl: config.ad_images,
        }
    },
    methods: {
        getParameterByNameExact(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return results[2];
        },
        addNewAd(){
            $('#placeAnAD')[0].click();
        },
        infiniteHandler($state) {
            HTTP.get(`my-ads?page=${this.pageNumber}&api_token=${TOKEN}`)
                .then(response => {
                    // console.log(response.data.data)
                    if(response.data.data.length == 0){
                        this.nodata = true;
                    } else {
                        this.nodata = false;
                    }

                    // important variables
                    if(response.data.next_page_url != null ){
                        let nextPage = response.data.next_page_url;
                        let nextPageNumber = this.getParameterByNameExact('page', nextPage);
                        this.pageNumber = nextPageNumber*1;
                    }

                    // map the response data
                    response.data.data.map((m) => {
                        this.myAdList.push(m)
                    });

                    // check is there any more ad or not
                    if(response.data.current_page == response.data.last_page){
                        $state.complete();
                    } else {
                        $state.loaded();
                    }

                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        deleteAd(id) {
            if(confirm('Want to delete this Ad?')){
                this.dltBtnDltStatus = true;
                HTTP.delete(`my-ads/${id}?api_token=${TOKEN}`)
                    .then(response => {
                        $(`.aditem-${id}`).fadeOut();

                        let msg = 'Ad deleted successfully';
                        this.$notify.success({
                            content: msg,
                            transition: 'zoom'
                        });

                        this.dltBtnDltStatus = false;
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');

                        this.dltBtnDltStatus = false;
                    })
            }
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
