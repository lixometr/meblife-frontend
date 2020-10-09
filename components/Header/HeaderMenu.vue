<template>
  <div class="header-menu">
    <div class="container">
      <ul class="header-menu__items">
        <li class="header-menu__item" v-for="(item, idx) in items" :key="idx">
          <nuxt-link class="text-14 font-semi-bold" :to="item.url">{{
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
    await this.fetchData()
  },
  data() {
    return {
      items: [
        {
          url: "/c/cat-1",
          name: "Новинки",
        },
        {
          url: "/c/cat-1",
          name: "Диваны",
        },
        {
          url: "/c/cat-1",
          name: "Стулья",
        },
        {
          url: "/c/cat-1",
          name: "Столы",
        },
        {
          url: "/c/cat-1",
          name: "Хранение",
        },
        {
          url: "/c/cat-1",
          name: "Кровати",
        },
        {
          url: "/c/cat-1",
          name: "Освещение",
        },
        {
          url: "/c/cat-1",
          name: "Аксессуары",
        },
        {
          url: "/c/cat-1",
          name: "Садовая мебель",
        },
        {
          url: "/c/cat-1",
          name: "Комнаты",
        },
      ],
    };
  },
  methods: {
    async fetchData() {
      try {
        const data = await this.$api.$get('widgetByName', {name: 'header_menu'})
        this.item = data.values
      } catch(err) {
        this.$error(err)
      }
    }
  }
};
</script>

<style lang="scss" >
.header-menu {
  &__items {
    display: flex;
    align-items: center;
    justify-content: space-between;
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