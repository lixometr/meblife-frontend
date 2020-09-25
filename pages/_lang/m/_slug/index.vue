<template>
    <div class="pt-4">
        <div class="text-center manufacturer-info__image pt-6 pb-6">
            <AppImage v-bind="pageData.image" />
        </div>
        <ModuleGroupsArea :moduleGroups="pageData.moduleGroups"/>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,

        props: {
            items: Array,
            isLoading: Boolean,
            pageData: Object
        }
    }
</script>

<style lang="scss" >
.manufacturer-info {
    &__image {
        img {
            max-width: 200px;
            width: 100%;
        }
    }
}
</style>