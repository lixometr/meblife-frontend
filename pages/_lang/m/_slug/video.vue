<template>
    <div class="pt-4">
        <AppDescription :text="pageData.videos"/>
    </div>
</template>

<script>
    export default {
        inheritAttrs: false,

        props: {
            pageData: Object
        }
    }
</script>

<style lang="scss" scoped>

</style>