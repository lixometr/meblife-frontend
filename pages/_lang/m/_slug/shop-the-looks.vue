<template>
    <div class="pt-4">
        <div class="flex justify-center" v-if="isLoading"> <Loader /></div>
        <LooksArea :items="looks" :info="looksInfo" v-else/>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,
        props: {
            looks: Array,
            looksInfo: Object,
            isLoading: Boolean
        }
    }
</script>

<style lang="scss" >

</style>