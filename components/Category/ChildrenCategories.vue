<template>
  
</template>

<script>
export default {
    props: {
        categoryId: String
    },
    async fetch() {
        await this.fetchItems()
    },
    methods: {
        async fetchItems() {
            try {
                 
            } catch(err) {
                this.$error(err)
            }
        }
    }
}
</script>

<style>

</style>