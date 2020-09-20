<template>
  <div class="post-page">
    <Module35 />
    <div class="container">
      <Module15
        class="mb-4"
        :item="{title: 'ВЫ ИЩЕТЕ ЧТО-НИБУДЬ ЕЩЕ? У КОГО ВСЕГДА БУДЕТ МНОГО ВДОХНОВЕНИЯ!'}"
      />
    </div>
    <Module35 :height="30" />
    <Module22 :item="{module_images: catItems}" />
    <Module35 />
    <div class="container">
      <Module16 :item="{title: 'САМЫЕ ПОПУЛЯРНЫЕ БРЕНДЫ', module_images: brandItems}" />
    </div>
    <Module35 />
    <CategoriesList class="mb-6" />
    <SocLinks />
    <div class="container">
      <h3 class="text-center text-md-left mb-3 mt-9">КАК МЫ МОЖЕМ ВДОХНОВИТЬ ВАС СЕГОДНЯ?</h3>
    </div>
    <BgGallery
      :images="['https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_4.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_4.jpg']"
      title="КУПИТЬ ОБРАЗ"
      subTitle="Откройте для себя готовые решения"
      url="/shop-the-looks"
    />

    <div class="container">
      <h3 class="text-center text-md-left mb-3 mt-9">ИЛИ МОЖЕТ ТЫ ПРЕДПОЧИТАЕШЬ</h3>
    </div>
    <BgGallery
      :images="['https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_4.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_5.jpg', 'https://www.wonder.pl/img/footer/shopthelook_4.jpg']"
      title="ВДОХНОВЕНИЯ"
      subTitle="Тенденции, коллекции и советы"
      url="/inspirations"
    />

    <Module35 />
    <ThreeCol />
    <Features />
    <Contact />
    <PopularCategories />
    <PageLinks />
    <div class="container text-center pt-2">
      <div class="flex justify-center align-center">
        <p class="mr-2 text-18">Валюта:</p>
        <CurrencySwitcher />
      </div>
    </div>

    <Bottom />
  </div>
</template>

<script>
import Module15 from "@/components/Modules/15.vue";
import Module35 from "@/components/Modules/35.vue";
import Module22 from "@/components/Modules/22.vue";
import Module16 from "@/components/Modules/16.vue";
import ThreeCol from "@/components/Footer/ThreeCol";
import Features from "@/components/Footer/Features";
import Contact from "@/components/Footer/Contact";
import PopularCategories from "@/components/Footer/PopularCategories";
import PageLinks from "@/components/Footer/PageLinks";
import Bottom from "@/components/Footer/Bottom";
import CategoriesList from "@/components/Footer/CategoriesList";
import BgGallery from "@/components/BgGallery";
import SocLinks from "@/components/Footer/SocLinks";
export default {
  components: {
    Module15,
    Module35,
    Module22,
    Module16,
    ThreeCol,
    Features,
    Contact,
    PopularCategories,
    PageLinks,
    Bottom,
    CategoriesList,
    BgGallery,
    SocLinks,
  },
  computed: {
    catItems() {
      return [
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=350,height=350,quality=85,format=auto/module_image-076b4f0756e2857c2a38b9dd2d98e80a55a76224.jpg",
          },
          title: "МЕБЕЛЬ",
          sub_title: "Функциональная разбивка по комнатам",
        },
      ];
    },
    brandItems() {
      return [
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-d22c14ee4e5335bb8ce6954085e505cb7725c67a.jpg",
          },
          title: "Актон",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-e062fd25fe7700ceecf08137b6eca42872049f45.jpg",
          },
          title: "BLOOMINGVILLE",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-d22c14ee4e5335bb8ce6954085e505cb7725c67a.jpg",
          },
          title: "Актон",
        },

        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-d22c14ee4e5335bb8ce6954085e505cb7725c67a.jpg",
          },
          title: "Актон",
        },

        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-41cb4ea06b280ed7884d11593cd8a63c0aac67aa.jpg",
          },
          title: "КАРЕ ДИЗАЙН",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-41cb4ea06b280ed7884d11593cd8a63c0aac67aa.jpg",
          },
          title: "КАРЕ ДИЗАЙН",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-41cb4ea06b280ed7884d11593cd8a63c0aac67aa.jpg",
          },
          title: "КАРЕ ДИЗАЙН",
        },
        {
          image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=50,height=50,quality=85,format=auto/module_image-41cb4ea06b280ed7884d11593cd8a63c0aac67aa.jpg",
          },
          title: "КАРЕ ДИЗАЙН",
        },
      ];
    },
  },
};
</script>

<style lang="scss">
</style>