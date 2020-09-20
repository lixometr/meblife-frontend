<template>
  <div class="page-header__content">
    <div class="flex flex-column h-100">
      <div class="page-header__title flex-1 flex align-center justify-center flex-column">
        <h1
          class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
        >{{categoryName}}</h1>
        <div class="flex overflow-auto justify-md-start pl-3 pr-3">
          <nuxt-link to="/" class="btn btn-md btn-blur mr-2 font-bold">Домой</nuxt-link>
          <nuxt-link
            :to="breadcrumb.full_path"
            class="btn btn-md btn-blur mr-2 font-bold"
            active-class="active"
            v-for="(breadcrumb) in breadcrumbs"
            :key="breadcrumb._id"
          >{{breadcrumb.name}}</nuxt-link>
        </div>
      </div>
      <div class="btn-tabs overflow-auto justify-between">
        <nuxt-link
          class="btn-tab mr-2 shrink-0"
          exact-active-class="active"
          :class="{'active': activeRouteInfo}"
          :to="$url.category($route.params.slug) "
        >
          <div class="btn pl-3 pr-3 btn-blur font-bold">
            <span class="truncate">Информация</span>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="$url.category($route.params.slug) + '/shop-the-looks' "
          class="btn-tab mr-2 shrink-0 text-decoration-none"
          active-class="active"
        >
          <div class="btn btn-blur pl-3 pr-3 font-bold">
            <span class="truncate">Купить образ</span>
          </div>
        </nuxt-link>
        <nuxt-link
          :to="$url.category($route.params.slug) +'/inspirations' "
          class="btn-tab mr-2 shrink-0 text-decoration-none"
          active-class="active"
        >
          <div class="btn btn-blur pl-3 pr-3 font-bold">
            <span class="truncate">Вдохновения</span>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categoryName: String,
    breadcrumbs: Array,
  },
  computed: {
    activeRouteInfo() {
      return this.$route.path === this.$url.category(this.$route.params.slug);
    },
  },
};
</script>

<style lang="scss" >
</style>