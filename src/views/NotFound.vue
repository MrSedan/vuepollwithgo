<template>
    <div class="container">
        <h2>Oops!</h2>
        <h1>404</h1>
        <router-link to="/" exact>Go to the home</router-link>
    </div>
</template>

<script>
export default {
    beforeCreate: function(){
        document.body.className = 'nf'
    }
}
</script>

<style lang="scss" scoped>
@import '../styles/404';
</style>