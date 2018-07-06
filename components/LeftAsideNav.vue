<template>
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
                <router-link to="/my-ad">My Ad List</router-link>
            </li>
            <li>
                <router-link to="/profile">Profile</router-link>
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
</template>

<script>
export default {
    name: 'LeftAsideNav',
    props: {
        msg: String
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
