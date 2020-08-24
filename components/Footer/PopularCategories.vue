<template>
  <div class="post-page__popular-categories popular-categories mt-9">
    <div class="container">
      <h3 class="text-center uppercase mb-3">ПОПУЛЯРНЫЕ КАТЕГОРИИ</h3>
      <p
        class="text-16 mb-4 text-center"
      >Откройте для себя категории, наиболее популярные у наших клиентов.</p>
      <div class="flex mt-9 mb-9 popular-categories__categories-list">
        <div class="col flex-1" v-for="(cat, idx) in categories" :key="idx">
          <nuxt-link :to="cat.slug" class="text-18 popular-categories__cat-title">{{cat.name}}</nuxt-link>
          <ul class="popular-categories__sub-categories mt-5">
            <li v-for="(sub_cat, index) in cat.categories" :key="index" class="mb-2">
              <nuxt-link :to="sub_cat.slug || '#'">{{sub_cat.name}}</nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return [
        {
          name: "Мебель A-Z",
          slug: "#",
          categories: [
            { name: "парты" },
            { name: "Кресла" },
            { name: "Лари" },
            { name: "Тумбы под телевизор" },
            { name: "стулья" },
            { name: "Журнальные столики" },
            { name: "пуфы" },
            { name: "полки" },
            { name: "диваны" },
            { name: "таблицы" },
          ],
        },
        {
          name: "Мебель A-Z",
          slug: "#",
          categories: [
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
          ],
        },
        {
          name: "Мебель A-Z",
          slug: "#",
          categories: [
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
          ],
        },
        {
          name: "Мебель A-Z",
          slug: "#",
          categories: [
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
            {
              name: "парты",
            },
            {
              name: "кресла",
            },
          ],
        },
      ];
    },
  },
};
</script>

<style lang="scss" >
.popular-categories {
  @include md {
    &__categories-list {
      flex-direction: column;
      
    }
    .col {
      background: $grey;
      padding-top: 2rem;
      margin-bottom: 0.5rem;
    }
    &__cat-title {
        font-size: 1rem;
        padding-left: 1.5rem;
    }
    &__sub-categories {
      display: flex;
      overflow: auto;
      padding-bottom: 0.5rem;
      padding-left: 1.5rem;


      li a {
        display: inline-block;
        margin-right: 0.5rem;
        background-color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        white-space: nowrap;
        font-size: .875rem;
      }
    }
  }
  .col {
  }
}
</style>