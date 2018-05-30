<template>
    <div>
        <div id="changPass">
            <modal 
                :is-show="isShow" 
                transition="fadeDown" 
                :show-footer="false" 
                @close="isShow=false" 
                :show-ok="false" 
                :show-cancel="false"
                :backdrop-closable="false"
            >
                <div class="">
                    <h3 class="modal_title text-center">Change Password</h3>

                    <form @submit.prevent="validateBeforeSubmit('cp')">
                    <div class="formeditp">
                        <div class="form-group">
                            <label>Current Password</label>
                            <input v-validate="'required'" v-model="changePass.current_password" type="password" class="form-control" placeholder="" name="current password" :class="{'input': true, 'is-danger': errors.has('current password') }">
                            <span v-show="errors.has('current password')" class="help is-danger">{{ errors.first('current password') }}</span>
                        </div>
                        <div class="form-group">
                            <label>New Password</label>
                            <input v-validate="'required|min:6'" v-model="changePass.new_password" type="password" class="form-control" placeholder="" name="new password" :class="{'input': true, 'is-danger': errors.has('new password') }">
                            <span v-show="errors.has('new password')" class="help is-danger">{{ errors.first('new password') }}</span>
                        </div>
                        <div class="form-group">
                            <label>Confirm New Password</label>
                            <input type="password" v-validate="'required|min:6|confirmed:new_password'" class="form-control" placeholder="" name="confirm password" :class="{'input': true, 'is-danger': errors.has('confirm password')}">
                            <span v-show="errors.has('confirm password')" class="help is-danger">{{ errors.first('confirm password') }}</span>
                        </div>

                        <div class="text-center">
                            <input type="submit" class="btn btn-warning btn-block btn-lg" value="Save Changes" name="">
                        </div>

                    </div>
                    </form>
                </div>
            </modal>
        </div>

        <section class="profilepage">
            <div class="container">

                <div class="row row_18">
                    <div class="col-lg-3 col-md-3 col-sm-4 leftdbmenucol">
                        <div class="dbmenutop">

                            <i class="material-icons checkedico">check_circle</i>
                            <figure class="avatardb round center-block">
                                <img :src="tootellaUser.profile_picture" class="img-responsive">
                            </figure>
                            <h2 class="dbavname">{{tootellaUser.first_name+' '+tootellaUser.last_name }}</h2>
                            <div class="dropdown text-right">
                                <button @click="seenEdtPrf = !seenEdtPrf" class="exoptionbtn">
                                    <i class="material-icons">more_horiz</i>
                                </button>
                                <ul class="dropdown-menu rightshow" v-if="seenEdtPrf" style="display: block;">
                                    <li>
                                        <a @click="toggleEdit" href="javascript:void(0);">Edit profile</a>
                                    </li>
                                </ul>

                            </div>
                            <div class="showdiv sociallinkex">
                                <ul class="list-inline">
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-whatsapp" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-facebook"></i>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="white-bg">
                            <h2 class="panel-title uc text-orange">Quick Links</h2>
                            <ul class="dbsmmenu list-unstyled">
                                <li>
                                    <a href="javascript:void(0);">Dashboard</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Inbox</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Your Listings</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Profile</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Settings</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Services</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Paiement</a>
                                </li>
                                <li>
                                    <a href="javascript:void(0);">Our offer</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="col-lg-9 col-md-9 col-sm-8 procolleft">
                        <div class="white-bg">
                            <div class="borderdiv">
                                <!-- <div class="coverphoto clearfix" v-if="tootellaUser.type==2"> -->
                                <div class="coverphoto clearfix">
                                    <img src="assets/images/cover_profile.jpg" class="img-responsive">
                                    <!-- <a href="javascript:void(0);" class="btn btn-default btnupload"><img src="assets/images/camera_ico.png" class="img-responsive"></a> -->
                                    <label class="btn btn-default btnupload">
                                        <input type="file" class="hidden" name="">
                                        <img src="assets/images/camera_ico.png" class="img-responsive">
                                    </label>
                                </div>

                                <div class="panel-body relative">
                                    <div class="prtopbtn clearfix">
                                        <div class="dropdown pull-left">
                                            <a id="dLabel" @click="seen = !seen" href="javascript:void(0);">
                                                <img src="assets/images/bullets_ico.png" class="img-responsive">
                                            </a>

                                            <ul v-if="seen" class="dropdown-menu" aria-labelledby="dLabel" style="display: block;">
                                                <li>
                                                    <a href="javascript:void(0);" @click="toggle">Change Password</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="text-center">
                                        <h2 class="nameavatar" v-if="tootellaUser.type == 2">{{tootellaUser.designation + ' at '+tootellaUser.company_name}}</h2>
                                        <!-- 	<h2 class="designation">Cora T. Colucci</h2> -->
                                        <div class="addresspro">
                                            <p>{{tootellaUser.address}}</p>
                                            <p>

                                                <span v-if="tootellaUser.phone_number != null">
                                                    <img src="assets/images/phone_ico.png" class="img-responsive"> {{tootellaUser.phone_number}}
                                                </span>

                                                <span v-if="tootellaUser.type == 2">
                                                    <img src="assets/images/globe.png" class="img-responsive"> 
                                                    {{tootellaUser.email}}
                                                </span>

                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row row_12 threeinfocol">

                            <div class="col-sm-4 clinfocol">
                                <a href="javascript:void(0);" class="panel_info bgred">
                                    <h4>Total</h4>
                                    <div class="clearfix">
                                        <div class="pull-left">
                                            <div class="txtbig">
                                                <strong>5K</strong>
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
                                                <strong>3K</strong>
                                            </div>
                                            <h5 class="txtsm">Contacts</h5>
                                        </div>
                                        <div class="pull-right infimg">
                                            <sub>
                                                <span class="badge">3</span>
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
                                                <strong>10K</strong>
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

                        <div class="white-bg">
                            <div class="panel-body borderdiv">
                                <ul class="listOffer list-unstyled">

                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->


                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->


                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->


                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->


                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->


                                    <li>
                                        <div class="row">
                                            <figure class="col-sm-3">
                                                <a href="javascript:void(0);">
                                                    <img src="assets/images/car1.jpg" class="img-responsive">
                                                </a>
                                                <span class="coutfig">3</span>
                                            </figure>
                                            <div class="cont col-sm-9 clearfix">
                                                <h3 class="loftitle">
                                                    <a href="javascript:void(0);">
                                                        <strong>THALES AUTOMOBILE</strong>
                                                    </a>
                                                </h3>
                                                <div class="pull-left leftcont">
                                                    <span class="addate block">
                                                        <i class="fa fa-map-marker" aria-hidden="true"></i> 3885 Sugarfoot Lane, Indianapolis, IN 36268</span>
                                                    <span class="text-muted txt12 block">Vehicles</span>
                                                </div>
                                                <div class="clearfix twobtnsec">
                                                    <a class="whishlistof pull-right" href="javascript:void(0);">
                                                        <i class="fa fa-heart"></i>
                                                    </a>
                                                    <a href="javascript:void(0);" class="btn btn-default radd30 btnevnt pull-right">Mettre en avant </a>

                                                </div>
                                                <div class="clearfix"></div>
                                                <span class="pricebig block">
                                                    <strong>100 000€</strong>
                                                </span>
                                                <span class="oftime text-muted">Today, 11:10pm</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/eye-md.png">&nbsp;&nbsp;5 total view</span>
                                                <span class="textwcicon text-muted">
                                                    <img src="assets/images/phone-md.png">&nbsp;&nbsp;3 view</span>
                                                <span class="withbadge_ico relative">
                                                    <sup>
                                                        <span class="badge">3</span>
                                                    </sup>
                                                    <img src="assets/images/envelope_md.png">
                                                </span>
                                                <a href="javascript:void(0);" class="btnnewedit pull-right">
                                                    <i class="fa fa-pencil"></i>
                                                </a>

                                                <div class="clearfix"></div>
                                            </div>
                                        </div>

                                    </li>
                                    <!-- ]] -->

                                </ul>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>

        <div id="editProfile">
            <modal
                :is-show="editProfileShow"
                transition="fadeDown"
                :show-footer="false"
                @close="editProfileShow=false"
                :show-ok="false"
                :show-cancel="false"
                :backdrop-closable="false"
            >
                <div class="profilepicmodal">

                    <h3 class="modal_title text-center">Edit Profile</h3>
                    <!-- <pre>{{tootellaUser.profile_picture}}</pre> -->
                    <form @submit.prevent="validateBeforeSubmit('ep')" enctype="multipart/form-data">
                        <figure class="profileavatar round center-block">
                            <img :src="tootellaUser.profile_picture" class="img-responsive">

                        </figure>
                        <label class="changephto center-block round">
                            <input type="file" :name="uploadFieldName" :disabled="isSaving" @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                                accept="image/*" class="hidden input-file">

                            <img src="assets/images/camera_ico.png" class="img-responsive">
                        </label>

                        <div class="formeditp">
                            <div class="form-group">
                                <label>First Name</label>
                                <input v-validate="'required'" v-model="editProfileData.first_name" type="text" class="form-control" placeholder="First Name"
                                    name="First Name" :class="{'input': true, 'is-danger': errors.has('First Name') }">
                                <span v-show="errors.has('First Name')" class="help is-danger">{{ errors.first('First Name') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Last Name</label>
                                <input v-model="editProfileData.last_name" type="text" class="form-control" placeholder="Last Name" name="">
                            </div>
                            <div class="form-group">
                                <label>Work at</label>
                                <input type="text" v-model="editProfileData.company_name" class="form-control" placeholder="company name" name="">
                            </div>
                            <div class="form-group">
                                <label>Designation</label>
                                <input type="text" v-model="editProfileData.designation" class="form-control" placeholder="Designation" name="">
                            </div>
                            <div class="form-group">
                                <label>Email</label>
                                <input type="email" v-validate="'required|email'" v-model="editProfileData.email" class="form-control" placeholder="Email"
                                    name="Email" :class="{'input': true, 'is-danger': errors.has('Email') }">
                                <span v-show="errors.has('Email')" class="help is-danger">{{ errors.first('Email') }}</span>
                            </div>
                            <div class="form-group">
                                <label>Phone No.</label>
                                <input type="number" class="form-control" v-model="editProfileData.phone_number" placeholder="+971 000222665" name="">
                            </div>
                            <div class="form-group">
                                <label>Address</label>
                                <input id="autocompleteAddress" type="text" class="form-control" v-model="editProfileData.address" placeholder="Enter your address"
                                    name="" @keyup="getPlace">
                            </div>
                            <div class="row row_5">
                                <div class="col-sm-6 form-group">
                                    <label>Zip Code</label>
                                    <input type="text" class="form-control" placeholder="70058" v-model="editProfileData.zipcode" name="">
                                </div>
                                <div class="col-sm-6 form-group">
                                    <label>City</label>
                                    <input type="text" class="form-control" placeholder="" v-model="editProfileData.city" name="">
                                </div>
                            </div>

                            <div class="text-center">
                                <input type="submit" class="btn btn-warning btn-block btn-lg" value="Save Changes" name="">
                            </div>

                        </div>
                    </form>
                </div>
            </modal>
        </div>

    </div>
</template>

<script>
    import { HTTP } from '../../http';
    import { config } from '../../config';
    import {
        SweetModal,
        SweetModalTab
    } from 'sweet-modal-vue';
    import VueGoogleAutocomplete from 'vue-google-autocomplete';

    const STATUS_INITIAL = 0,
        STATUS_SAVING = 1,
        STATUS_SUCCESS = 2,
        STATUS_FAILED = 3;

    export default {
        name: 'Profile',
        components: {
            SweetModal,
            SweetModalTab,
            VueGoogleAutocomplete
        },
        data() {
            return {
                uploadedFiles: [],
                uploadError: null,
                currentStatus: null,
                uploadFieldName: 'photos',
                changePass: {
                    current_password: '',
                    new_password: ''
                },
                editProfileData: {
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone_number: '',
                    company_name: '',
                    designation: '',
                    address: '',
                    profile_picture: '',
                    zipcode: '',
                    city: '',
                },
                seen: false,
                seenEdtPrf: false,
                checkNotLoggedIn: true,
                isShow: false,
                editProfileShow: false,
                tootellaUser: JSON.parse(localStorage.getItem('tootellaUser'))
            }
        },
        computed: {
            isInitial() {
                return this.currentStatus === STATUS_INITIAL;
            },
            isSaving() {
                return this.currentStatus === STATUS_SAVING;
            },
            isSuccess() {
                return this.currentStatus === STATUS_SUCCESS;
            },
            isFailed() {
                return this.currentStatus === STATUS_FAILED;
            }
        },
        created() {

        },
        mounted() {
            this.reset();
            this.$data.editProfileData.first_name = this.$data.tootellaUser.first_name;
            this.$data.editProfileData.last_name = this.$data.tootellaUser.last_name;
            this.$data.editProfileData.email = this.$data.tootellaUser.email;
            this.$data.editProfileData.phone_number = this.$data.tootellaUser.phone_number;
            this.$data.editProfileData.company_name = this.$data.tootellaUser.company_name;
            this.$data.editProfileData.designation = this.$data.tootellaUser.designation;
            this.$data.editProfileData.address = this.$data.tootellaUser.address;
            this.$data.editProfileData.zipcode = this.$data.tootellaUser.zipcode;
            this.$data.editProfileData.city = this.$data.tootellaUser.city;
            this.$data.editProfileData.profile_picture = this.$data.tootellaUser.profile_picture;
        },
        methods: {
            reset() {
                // reset form to initial state
                this.currentStatus = STATUS_INITIAL;
                this.uploadedFiles = [];
                this.uploadError = null;
            },
            validateBeforeSubmit(scope) {
                this.$validator.validateAll(scope).then((result) => {
                    if (result) {
                        // eslint-disable-next-line
                        // console.log(`submit ${scope}`, result);
                        //alert(scope);
                        if (scope == 'cp') {
                            this.cpSubmit();
                        } else if (scope == 'ep') {

                            this.editProfileSubmit();
                        }

                        return;
                    }
                });
            },

            editProfileSubmit() {
                // make the filtered object from the form data
                //alert(this.$data.editProfileData.address);
                let reqData = {
                    first_name: this.$data.editProfileData.first_name,
                    last_name: this.$data.editProfileData.last_name,
                    email: this.$data.editProfileData.email,
                    phone_number: this.$data.editProfileData.phone_number,
                    company_name: this.$data.editProfileData.company_name,
                    designation: this.$data.editProfileData.designation,
                    profile_picture: this.$data.editProfileData.profile_picture,
                    address: this.$data.editProfileData.address,
                    zipcode: this.$data.editProfileData.zipcode,
                    city: this.$data.editProfileData.city,
                    api_token: this.$data.tootellaUser.api_token,
                };

                //console.log(reqData);

                // ajax post method call
                HTTP.post(`user/edit`, reqData)
                    .then(response => {
                        let data = response.data;
                        //console.log(data);
                        if (data.status == "success") {
                            let authuser = {};
                            authuser = data.user;
                            // back to home
                            localStorage.setItem('tootellaUser', JSON.stringify(authuser));

                            window.location.reload();
                        } else if (data.status == "fail") {
                            //console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            },
            cpSubmit() {
                // make the filtered object from the form data
                let cpData = {
                    current_password: this.$data.changePass.current_password,
                    new_password: this.$data.changePass.new_password,
                    api_token: this.$data.tootellaUser.api_token,
                }
                // ajax post method call
                HTTP.post(`user/change-password`, cpData)
                    .then(response => {
                        let data = response.data;
                        console.log(data);
                        if (data.status == "success") {
                            let authuser = {};
                            authuser = data.user;
                            // back to home
                            localStorage.setItem('tootellaUser', JSON.stringify(authuser));

                            window.location.reload();
                        } else if (data.status == "fail") {
                            //console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })
            },
            toggle() {
                this.isShow = !this.isShow;
                this.seen = false;
            },
            toggleEdit() {
                this.editProfileShow = !this.editProfileShow;
                this.seenEdtPrf = false;
            },
            filesChange(fieldName, fileList) {

                // handle file changes
                const formData = new FormData();

                if (!fileList.length) return;

                // append the files to FormData
                Array
                    .from(Array(fileList.length).keys())
                    .map(x => {
                        formData.append('profile_picture', fileList[x], fileList[x].name);
                        formData.append('first_name', this.$data.editProfileData.first_name);
                        formData.append('last_name', this.$data.editProfileData.last_name);
                        formData.append('email', this.$data.editProfileData.email);
                        formData.append('phone_number', this.$data.editProfileData.phone_number);
                        formData.append('company_name', this.$data.editProfileData.company_name);
                        formData.append('designation', this.$data.editProfileData.designation);
                        formData.append('address', this.$data.editProfileData.address);
                        formData.append('zipcode', this.$data.editProfileData.zipcode);
                        formData.append('city', this.$data.editProfileData.city);
                    });

                formData.append('api_token', this.$data.tootellaUser.api_token);

                HTTP.post(`user/save-profile-picture`, formData)
                    .then(response => {
                        let data = response.data;
                        console.log(data);
                        if (data.status == "success") {
                            console.log('success');
                            let userdata = data.user
                            // console.log(userdata)
                            userdata.profile_picture = `${config.profile_upload}${data.user.profile_picture}`
                            // console.log(userdata)

                            localStorage.setItem('tootellaUser', JSON.stringify(userdata));
                            location.reload();
                        } else if (data.status == "fail") {
                            console.log(data.errors);
                            //alert(data.errors.email[0]);
                        }
                    })
                    .catch(e => {
                        console.log(e);
                        alert('Something went wrong!');
                    })

            },


            getPlace() {
                let input = document.getElementById('autocompleteAddress');
                let options = {
                    types: ['geocode'],
                    componentRestrictions: {
                        country: 'fr'
                    }
                };
                let place = new google.maps.places.Autocomplete(input, options);


                var that = this;

                google.maps.event.addListener(place, 'place_changed', function () {
                    let selected_place = place.getPlace();
                    //console.log(selected_place.formatted_address);
                    that.$data.editProfileData.address = selected_place.formatted_address;
                    // console.log(selected_place.geometry.location.lat());
                    // console.log(selected_place.geometry.location.lng());

                });
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .help.is-danger {
        width: 100%;
        color: #fff;
    }
</style>