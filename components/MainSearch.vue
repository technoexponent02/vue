<template>
    <div class="searchbx clearfix pull-left">
        
            <div class="form-inline pull-right">
                <div class="form-group">
                    <form @submit.prevent="submitSearch" autocomplete="off">
                        <input type="text" v-model="searchitem" id="mainsearch" class="form-control bgserch" placeholder="Que recherchez-vous?" name="">
                    </form>
                </div>
                <div class="form-group">
                    <button class="btn btn-default thecategory topsrcatgsl" type="button" id="dLabel" data-target="#" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{{selectedCatgTitle}}</button>
                    <div class="thecatemenulist dropdown-menu" aria-labelledby="dLabel">
                        <ul class="list-unstyled catelistinfo clearfix" style="position: relative">

                            <li class="catefilter">
                                <div class="budylistradio">
                                    <div class="form-group">
                                        <input type="checkbox" id="" class="lcs_check" v-model="serviceCheck" @change="serviceOrOffer(serviceCheck)">
                                        <span class="swipeChk">
                                            <span class="on">Service</span>
                                            <span class="off">Offer</span>
                                        </span>
                                    </div>
                                </div>
                            </li>

                            <div class="loadingmenu" v-if="catgLoading">
                                <span>
                                    <i class="fa fa-spinner fa-spin animated"></i>
                                </span>
                            </div>
                            <li v-for="catg in catgList" :key="catg.id">
                                <h4>{{catg.title}}</h4>
                                <ul>
                                    <li v-for="catitem in catg.cat" :key="catitem.id">
                                        <label>
                                            <input type="radio" class="hidden searchcatg" :checked="catitem.id == catgId" @change="chooseCat(catitem.id, catitem.title)" name="cateselectmenu">
                                            <div class="normsmchek">{{catitem.title}}</div>
                                        </label>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>
                </div>
                <button class="btn btn-warning" @click="submitSearch"><img src="assets/images/serach_icon.png" class="img-responsive"><!-- Rechercher --></button>
            </div>
    </div>
</template>

<script>
import {HTTP, TOKEN, AUTH_DATA} from '../http';
import { config } from '../config';
// import store from '../store';

export default {
    name: 'MainSearch',
    data () {
        return {
            serviceCheck: true,
            catgLoading: false,
            catgList: [],
            searchitem: '',
            catgId: '',
            selectedCatgTitle: 'toutes catégories'
        }
    },
    created() {

        this.serviceOrOffer(this.serviceCheck)

    },
    mounted(){
        if(window.location.pathname == '/search'){
            setTimeout(()=> {
                this.searchitem= this.$route.query.search_query;
                this.catgId = this.$route.query.catg_i;
                this.selectedCatgTitle = this.$route.query.catg_t;
                this.serviceCheck = this.$route.query.type == 'S' ? true : false
            }, 1500);
        } else {
            this.searchitem= '';
            this.catgId = '';
        }
    },
    destroyed(){
        this.searchitem= '';
        this.catgId = '';
    },
    methods: {
        fetchSearchItemList(type){
            this.catgLoading = true;
            HTTP.post(`category-menu`, {type_flag: type})
                .then(response => {
                    // console.log(response.data)
                    this.catgList = response.data;

                    this.catgLoading = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');

                    this.catgLoading = false;
                })
        },
        serviceOrOffer($data){
            if($data == true){
                // alert('S')
                this.fetchSearchItemList('S')
            } else {
                // alert('O')
                this.fetchSearchItemList('O')
            }
        },
        chooseCat(id, title){
            this.catgId = id;
            this.selectedCatgTitle = title;
        },
        submitSearch(){
            const makeUrl = `/search?search_query=${this.searchitem}&tok_id=${TOKEN}&catg_i=${this.catgId}&catg_t=${this.selectedCatgTitle}&type=${this.serviceCheck == true ? 'S' : 'O'}`;
            window.location.href = makeUrl;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.loadingmenu{
    display: block;
    position: absolute;
    bottom: 0px;
    left: 0px;
    background: #f1f0f0eb;
    width: 100%;
    height: 80%;
    z-index: 999;
    text-align: center;
    color: #ff8c3a;
}
.loadingmenu span{
    font-size: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
