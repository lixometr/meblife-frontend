<template>
    <div class="pt-4">
        <div class="flex justify-center" v-if="isLoading">
            <Loader />
        </div>
        <InspirationsArea :items="inspirations" :info="inspirationsInfo" v-else />
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,

        props: {
            inspirations: Array,
            inspirationsInfo: Object,
            isLoading: Boolean
        }
    }
</script>

<style lang="scss" >

</style>