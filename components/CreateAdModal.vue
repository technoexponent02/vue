<template>
    <div class="secoffer">

        <div class="catgloader" v-if="loading">
            <div style="width:100%;height:100%" class="lds-double-ring"><div></div><div></div></div>
        </div>

        <!-- step 1 -->
        <div class="boxstep1 stepbxoff" style="display: block;" v-if="stepView === 0">
            <div class="boxsteptwo">
                <div class="greywrp">
                    <div class="radio checkcategory">
                        <div class="btn-block text-center" v-for="catg in mainData" :key="catg.id">
                            <label>
                                <input type="radio" :value="catg.id" @change="changeCatgOne(catg)" class="offit openstep2" name="subcategorytype">
                                <div class="catebox">
                                    <p>{{catg.title}}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- step 1 -->

        <!-- step 2 -->
        <div class="boxstep2 stepbxoff" style="display: block;" v-else>

            <div class="serchbox">
                <div class="container">
                    
                    <div class="stepmenu stepmenurequest">
                        <ul class="list-inline">
                            <li><a class="showmenu" href="#">Tous</a></li>
                            <li class="toputvalue">
                                <a class="txttoshow" href="#"></a>
                            </li>
                            <!-- <li><span>Plomberie & Chauffage</span></li> -->
                        </ul>
                    </div>
                </div>

            </div>

            <div class="greywrp menuboxtoshow1">
                <div class="container">
                    <div class="catmenuList catmenuListrequest">
                        <ul class="list-unstyled menutxt menufirst" id="myulid">
                            <li v-for="nextcatg in secondMainData" :key="nextcatg.id">
                                <a id="s1" href="javascript:void(0);" @click="selectVal(nextcatg)">{{nextcatg.title}}</a>
                            </li>
                        </ul>
                        <input type="button" value="Back" @click="backStep" class="btn btn-lg btnback backto1st btn-warning">
                        <input type="button" value="Done" @click="makeDone" class="btn btn-lg btn-warning" v-if="doneBtn">
                    </div>
                </div>
            </div>

        </div>
        <!-- step 2 -->
    </div>
</template>

<script>
import store from '../store';
import {HTTP} from '../http';

export default {
    name: 'CreateAdModal',
    props: {
        msg: String
    },
    data () {
        return {
            mainData: [],
            stepView: '',
            loading: false,
            secondMainData: [],
            backId: '',
            doneBtn: false
        }
    },
    created() {
    },
    methods: {
        changeCatgOne(data){
            // console.log(data);
            store.commit('placeAdStateChange', 1);
            this.stepView = this.$store.state.placeAdStep;

            this.loading = true;
            this.getNextCatg(data.id)
        },
        getNextCatg(dataId){
            this.loading = true;
            HTTP.post(`categories`, {parent_id: dataId})
                .then(response => {
                    let data = response.data;
                    if(data.categories.length > 0){
                        this.secondMainData = data.categories;
                        this.doneBtn = false;
                    } else {
                        this.doneBtn = true;
                        this.backId = this.backId-=1
                    }
                    // console.log(this.secondMainData);
                    this.loading = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        },
        selectVal(data){
            console.log(data)
            this.getNextCatg(data.id);
            this.backId = data.parent_id*1;
            store.commit('placeAdSelectedCatg', data);
        },
        backStep(){
            this.doneBtn = false;
            // console.log(this.backId)
            const rootcatg = this.$store.state.placeAd.map(m => m.id);

            this.getNextCatg(this.backId)
        },
        makeDone(){
            let data = JSON.stringify(this.$store.state.placeAdSelectedCatgStore);
            sessionStorage.setItem('categorySelected', data);
            $('.place-ad-modal .close').trigger('click');
        }
    },
    mounted() {
        this.mainData = this.$store.state.placeAd;
        this.stepView = this.$store.state.placeAdStep;

        if(sessionStorage.getItem('categorySelected') != null){
            let data = JSON.parse(sessionStorage.getItem('categorySelected'))
            this.getNextCatg(data.parent_id)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.secoffer{
    // position: relative;
}
.catgloader{
    width: 100%;
    height: 100%;
    position: absolute;
    background: #eaeaea80;
    z-index: 999;
}
.catgloader > div{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>
