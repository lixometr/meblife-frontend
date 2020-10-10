<template>
  <div class="header-menu">
    <div class="container">
      <ul class="header-menu__items">
        <li class="header-menu__item" v-for="(item, idx) in items" :key="idx">
          <nuxt-link class="text-14 font-semi-bold" :to="$url.category(item.slug)">{{
            item.name
          }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  async fetch() {
    await this.fetchData();
  },
  data() {
    return {
      items: [],
    };
  },
  methods: {
    async fetchData() {
      try {
        const data = await this.$api.$get("widgetByName", {
          name: "header_menu",
        });
        const resolvers = data.values.items.map(async (catId) => {
          const category = await this.$api.$get("categoryById", {id: catId});
          return category;
        });
        const items = await Promise.all(resolvers)
        this.items = items
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
.header-menu {
  &__items {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  &__item {
    // padding-right: 1px;
    // &:first-child {
    //   a {
    //     padding-left: 0;
    //   }
    // }
    &:last-child {
      padding-right: 0;
    }
    a {
      padding: 1rem;
      display: block;
    }
  }
}
</style>