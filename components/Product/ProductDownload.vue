<template>
    <div class="product-download flex flex-wrap" v-if="items.length > 0">
        <p class="text-20">{{$t('download')}}</p>
        <nuxt-link :to="item.path || '#'" class="btn btn-md btn-white mr-3" v-for="(item, idx) in items" :key="idx">
            {{item.name}}
            <svgDownload width="30"/>
        </nuxt-link>
    </div>
</template>

<script>
import svgDownload from "@/assets/icons/download.svg";
    export default {
        props: {
            items: {
                type: Array,
                default: () => []
            }
        },
        components: {
            svgDownload
        }
    }
</script>

<style lang="scss" scoped>

</style>