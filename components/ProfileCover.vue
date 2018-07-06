<template>
    <div class="coverphoto clearfix">
        <img :src="sourceCOver" class="img-responsive">
        <!-- <a href="javascript:void(0);" class="btn btn-default btnupload"><img src="assets/images/camera_ico.png" class="img-responsive"></a> -->
        <label class="btn btn-default btnupload">
            <input type="button" class="hidden" name="" @click="openPop">
            <img src="assets/images/camera_ico.png" class="img-responsive">
        </label>

        <modal 
        title="Upload an Image" 
        :width="895" 
        :show-footer="false"
        :backdrop-closable="false"
        :is-show="isShow" 
        transition="fadeDown" 
        @close="closePop">
            <div>
                <croppa
                v-model="myCroppa"
                :zoom-speed="8"
                :initial-image="initImg"
                :width="850"
                :height="195"
                canvas-color="transparent"></croppa>
            </div>
            <br>
            <button :disabled="loader" class="btn btn-default radd30 btnevnt pull-right" @click="coverImageChange">
                <i class="fa fa-spinner fa-spin" v-if="loader" style="font-size: 24px;"></i>
                Change Image
            </button>
        </modal>

    </div>
</template>

<script>
import { HTTP, AUTH_DATA, TOKEN } from '../http';
import { config } from '../config';

export default {
    name: 'ProfileCover',
    props: {
        msg: String
    },
    data() {
        return {
            sourceCOver: '',
            isShow: false,
            initImg: '',
            myCroppa: null,
            imgUrl: '',
            loader: false
        }
    },
    created(){
        this.sourceCOver = AUTH_DATA.cover_image;
        this.initImg = AUTH_DATA.cover_image;
    },
    mounted(){
        // 
    },
    methods: {
        coverImageChange(){
            this.loader = true;
            this.generateImage();
            // console.log(this.imgUrl)
            HTTP.post(`upload-cover-image?api_token=${TOKEN}`, {cover_image: this.imgUrl})
                .then(response => {
                    let data = response.data;
                    this.loader = false;
                    // console.log(data);

                    localStorage.setItem('tootellaUser', JSON.stringify(data));
                    setTimeout(() => {
                        window.location.reload();
                    }, 200);

                })
                .catch(e => {
                    console.log(e);
                    this.loader = false;
                    alert('Something went wrong!');
                })
        },
        generateImage() {
            let url = this.myCroppa.generateDataUrl()
            if (!url) {
                // alert('no image')
                // return
                this.imgUrl = ''
            }
            this.imgUrl = url
        },
        openPop(){
            this.isShow = true;
        },
        closePop(){
            this.isShow = false;
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
