<template>
  <div class="category-children">
      <div class="category-child" v-for="(item, idx) in items" :key="idx">
          <nuxt-link :to="$url.category(item.slug)">
              <div class="category-child__image">
                  <AppImage v-bind="item.image" contain noBg/>
              </div>
              <div class="category-child__name">
                  {{item.name}}
              </div>

          </nuxt-link>
      </div>
  </div>
</template>

<script>
export default {
    props: {
    },
    async fetch() {
        await this.fetchItems()
    },
    data() {
        return {
            items: [

            ]
        }
    },
    methods: {
        async fetchItems() {
            try {
                const items =  await this.$api.$get('categoryChildren', {slug: this.$route.params.slug})
                this.items = items
            } catch(err) {
                this.$error(err)
            }
        }
    }
}
</script>

<style lang="scss">
.category-children {
    display: flex;
    flex-wrap: wrap;
    margin-left: -1rem;
    margin-right: -1rem;
    .category-child {
        width: 25%;
        padding: 0.75rem;
        height: 100px;
        a {
            background: $grey;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: space-around;
            align-items: center;
            border: 1px solid $grey;
            padding: 1rem;
        }
        img {
            max-width: 60px;
            margin-right: .75rem;
        }
    }
}
</style>