<template>
    <div class="pt-6 pb-6 bg-grey mt-7 mb-5">
      <div class="flex align-center justify-center btn-categories no-scrollbar">
        <nuxt-link :to="cat.slug" class="btn btn-white btn-md font-bold mr-3" v-for="(cat, idx) in items" :key="idx">{{cat.name}}</nuxt-link>
    
      </div>
    </div>
</template>

<script>
    export default {
        props: {
            items: Array
        }   
    }
</script>

<style lang="scss" scoped>

</style>