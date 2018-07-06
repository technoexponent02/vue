<template>
    <div class="row row_12 threeinfocol" style="position: relative;">

        <div class="overlyload" v-if="loader">
            <i class="fa fa-spinner fa-spin" style="font-size: 54px; color: #fff; margin-top: 40px;"></i>
        </div>

        <div class="col-sm-4 clinfocol">
            <a href="javascript:void(0);" class="panel_info bgred">
                <h4>Total</h4>
                <div class="clearfix">
                    <div class="pull-left">
                        <div class="txtbig">
                            <strong>{{totalData.total_ads | kFormatter}}</strong>
                        </div>
                        <h5 class="txtsm">Advertsiment</h5>
                    </div>
                    <div class="pull-right infimg">
                        <img src="assets/images/ico_add.png" class="img-responsive">
                    </div>
                </div>
            </a>
        </div>

        <div class="col-sm-4 clinfocol">
            <a href="javascript:void(0);" class="panel_info bgblue">
                <h4>Total</h4>
                <div class="clearfix">
                    <div class="pull-left">
                        <div class="txtbig">
                            <strong>{{totalData.total_contacts | kFormatter}}</strong>
                        </div>
                        <h5 class="txtsm">Contacts</h5>
                    </div>
                    <div class="pull-right infimg">
                        <sub>
                            <span class="badge">{{totalData.total_contacts | kFormatter}}</span>
                        </sub>
                        <img src="assets/images/envelope_big.png" class="img-responsive">
                    </div>
                </div>
            </a>
        </div>

        <div class="col-sm-4 clinfocol">
            <a href="javascript:void(0);" class="panel_info bgdkgreen">
                <h4>Total</h4>
                <div class="clearfix">
                    <div class="pull-left">
                        <div class="txtbig">
                            <strong>{{totalData.total_views | kFormatter}}</strong>
                        </div>
                        <h5 class="txtsm">Views</h5>
                    </div>
                    <div class="pull-right infimg">
                        <img src="assets/images/eye_big.png" class="img-responsive">
                    </div>
                </div>
            </a>
        </div>

    </div>
</template>

<script>
import { HTTP, AUTH_DATA, TOKEN } from '../http';
import { config } from '../config';

export default {
    name: 'ProfileStat',
    props: {
        msg: String
    },
    data() {
        return {
            totalData: [],
            loader: true
        }
    },
    created() {
        this.getStat();
    },
    mounted() {

    },
    methods: {
        getStat(){
            HTTP.get(`dashboard?api_token=${TOKEN}`)
                .then(response => {
                    let data = response.data;
                    // console.log(data);
                    this.totalData = data;

                    this.loader = false;
                })
                .catch(e => {
                    console.log(e);
                    alert('Something went wrong!');
                })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    a{
        cursor: default;
    }
    .overlyload{
        position: absolute;
        width: 100%;
        height: 100%;
        background: #eef1f6ba;
        z-index: 999;
        text-align: center;
    }
</style>
