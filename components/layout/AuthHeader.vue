<template>
    <div>
        <header class="withsearchbx affix">
            <div class="container-fluid">
                <div class="logo_inner">
                    <a href="/"><img src="assets/images/logo.png" class="img-responsive"></a>
                </div>
                <!-- <div class="hidden showvxs serchbtnlink pull-left">
                    <a title="Click Me" type="button" class="srchico" data-toggle="modal" data-target="#searchModal"><img class="img-responsive" src="assets/images/search_m_ico.png"></a>
                </div> -->
               <main-serch></main-serch>	
                    
                <button class="slidemeubtn"><i class="fa fa-bars"></i></button>
                
                <div class="overlay"></div>
                                
                <!-- <ul class="nav navbar-nav navbar-right loginmenu">
                    <li><a href="javascript:void(0);"><span class="ico"><img src="assets/images/user.png" class="img-responsive onvxs"><img src="assets/images/user-white.png" class="img-responsive oflg"></span>Sign Up</a></li>
                    <li><a href="" data-toggle="modal" data-target="#loginModal"><span class="ico"><img src="assets/images/key.png" class="img-responsive onvxs"><img src="assets/images/key-white.png" class="img-responsive oflg"></span>Log In</a></li>
                </ul> -->
                <div class="pull-right clearfix">
                    
                    <div class="avmenu dropdown pull-left">
                        <a id="dLabel" data-target="#" href="javascript:void(0);" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            <!-- <figure>
                                <img src="assets/images/avatar.png" class="img-responsive">
                            </figure>
                            <span class="avname">John Doe</span>
                            <span class="caret"></span> -->
                            <div class="clearfix"></div>
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dLabel">
                            <li><a href="#">Lorem</a></li>
                            <li><a href="#">Lorem</a></li>
                        </ul>
                    </div>
                </div>
                <div class="mainmenu clearfix">
                    <ul class="nav navbar-nav pull-right">
                        <!-- <li><a class="js-scroll-trigger" href="#mission">Dashboard</a></li> --><!-- 
                        <li class="active"><a href="#">Home</a></li> -->
                        <li class="">
                            <a href="javascript:void(0);" id="placeAnAD" @click="placeAnAd">Place an ad</a>
                        </li>
                        <li class="">
                            <router-link :to="{ name: 'deals', query: { search_query: '', tok_id: authData.api_token, catg_i: '', catg_t: 'toutes catégories', type: 'O' }}">
                                Deals
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'requests', query: { search_query: '', tok_id: authData.api_token, catg_i: '', catg_t: 'toutes catégories', type: 'S' }}">
                                Requests
                            </router-link>
                        </li>
                        <li><router-link to="/shops">Shops</router-link></li>
                        <li v-if="authData.type == 2"><router-link to="/create-shop">Create Shops</router-link></li>
                        <li class="dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">My Account <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><router-link to="/profile">My Profile</router-link></li>
                            <li><router-link to="/my-fovourite">My Favourites</router-link></li>
                            <li><router-link to="/my-saved">My Saved</router-link></li>
                            <li><a href="javascript:void(0);" id="logout" @click="logout">Log out</a></li>
                        </ul>
                        </li>
                    </ul>
                </div>
                                
                    
            </div>
        </header>


        <modal
            class="place-ad-modal parentchoosingmodal"
            :width="1200"
            :is-show="isShowPlaceAd"
            :show-footer= false
            transition="fadeDown"
            @close="hidePlaceAd"
        >
            <div v-if="$store.state.openService === false">
                <div class="stepbox  text-center">
                    <h1 class="stepTitle">OUR CATEGORIES OF SERVICES</h1>

                    <div class="radio checkcategory">
                        <label>
                            <input @click="goToPlaceOffer" type="button" class="offit" name="categorytype">
                            <!-- <input checked="" type="radio" class="offit openofferstep" name="categorytype"> -->
                            <div class="catebox">
                                <figure>
                                    <img src="assets/images/of.png" class="img-responsive center-block" alt="icon">
                                </figure>
                                <p>OFFER</p>
                            </div>
                        </label>
                        <label @click="goToPlaceService">
                            <input checked="" type="radio" class="offit openstep2" name="categorytype">
                            <div class="catebox">
                                <figure>
                                    <img src="assets/images/request.png" class="img-responsive center-block" alt="icon">
                                </figure>
                                <p>REQUEST SERVICES</p>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div v-else>
                <create-ad-service-modal></create-ad-service-modal>
            </div>
        </modal>

    </div>
</template>


<script>
import { SweetModal, SweetModalTab } from 'sweet-modal-vue'
import {HTTP, TOKEN, AUTH_DATA} from '../../http';
import { config } from '../../config';
import CreateAdServiceModal from '@/components/CreateAdServiceModal';
import MainSearch from '@/components/MainSearch';
import store from '../../store';

export default {
    name: 'AuthHeader',
    components: {
        SweetModal,
        SweetModalTab,
        'create-ad-service-modal': CreateAdServiceModal,
        'main-serch': MainSearch
    },
    data () {
        return {
            checkNotLoggedIn: true,
            isShowPlaceAd: false,
            authData: AUTH_DATA
        }
    },
    created() {

        if(localStorage.getItem('tootellaUser') == null){
            this.checkNotLoggedIn = true
        } 
        else {
            this.checkNotLoggedIn = false
        }

    },
    methods: {
        goToPlaceOffer(){
            this.isShowPlaceAd = false;
            this.$router.push('place-ad')
        },
        // open the login form
        openRegister(){
            // alert()
            this.$refs.register.open();
        },

        logout(){
            localStorage.removeItem('tootellaUser');
            window.location.href = '/';
        },
        hidePlaceAd(){
            this.isShowPlaceAd = false;
            store.commit('isOpenService', false);
            store.commit('serviceStepper', 0);
            store.commit('changeServiceSelectedStep', [])
            location.hash = '';
            sessionStorage.removeItem('editService');
        },
        placeAnAd(){
            this.isShowPlaceAd = true;
            location.hash = 'addservice';
        },
        goToPlaceService(){
            store.commit('isOpenService', true);
            store.commit('serviceStepper', 1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
