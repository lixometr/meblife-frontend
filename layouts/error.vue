<template>
  <div class="page-error">
    <Header class="default-header" variant="dark" />

    <div class="page-header" style="height: 500px">
      <img
        src="https://cdn.wonder.pl/cdn-cgi/image/width=1920,height=1920,quality=85,format=auto/img/hero/hero-bg-2.jpg"
        alt=""
        class="page-header__image"
      />
      <div class="image-placeholder"></div>

      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div class="page-header__title flex-1 flex align-center justify-center flex-column ">
            <h1 class="color-white mb-2">404</h1>
            <h2
              class="mw-100 truncate pl-3 pr-3 mb-2 uppercase color-white text-center"
            >{{pageText}}</h2>
            <p class="text-18 mb-4 color-white">Страница, которую вы ищите не найдена</p>
            <nuxt-link to="/" class="btn btn-md btn-red mr-2 font-bold">Вернуться на главную</nuxt-link>
            <p class="text-24 color-white">{{error}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
  props: ['error'],
  data() {
    return {
      pageText: "Oops something went wrong!",
    };
  },
};
</script>
<style lang="scss">
.page-error {
    h1 {
        font-size: 3.75rem;
    }
}
</style>
