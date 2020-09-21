<template>
    <div class="pt-4">
        <div class="flex justify-center" v-if="isLoading"> <Loader /></div>
        <LooksArea :items="items" v-else/>
    </div>
</template>

<script>
    export default {
        props: {
            items: Array,
            isLoading: Boolean
        }
    }
</script>

<style lang="scss" >

</style>