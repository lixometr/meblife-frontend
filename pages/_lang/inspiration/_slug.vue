<template>
  <div class="inspiration-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" alt />
      <div class="image-placeholder"></div>

      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div
            class="page-header__title flex-1 flex align-center justify-center flex-column"
          >
            <h1 class="mw-100 pl-3 pr-3 mb-3 uppercase color-white text-center">
              {{ name }}
            </h1>
          </div>
        </div>
      </div>
    </div>
    <div class="inspiration-page__content" v-if="hasTemplate" key="hasTemplate">
      <div class="container">
        <h4 class="text-center mt-2 mb-1">{{ introdctionTitle }}</h4>
        <AppDescription :text="introdctionText"></AppDescription>
      </div>
      <section class="mt-8 bg-design pb-7 overflow-hidden">
        <InspirationBlock
          :title="firstBlockIntrodctionTitle"
          :text="firstBlockIntrodctionText"
          :imageLeft="firstBlockImageLeft"
          :imageRight="firstBlockImageRight"
          :products="products1"
        />
        <InspirationBlock
          :title="secondBlockIntrodctionTitle"
          :text="secondBlockIntrodctionText"
          :imageLeft="secondBlockImageLeft"
          :imageRight="secondBlockImageRight"
          :products="products2"
        />
        <InspirationBlock :products="products3" />
        <!-- <InspirationSlider class="mt-4" :items="products3" v-if="products3.length > 0" /> -->
        <div class="mt-3" v-if="separatorImage && separatorImage.url">
          <AppImage class="w-100 size-cover" v-bind="separatorImage" hide />
        </div>
      </section>
      <section
        class="inspiration-page__similar mt-5 overflow-hidden"
        v-if="similarInspirations.length > 0"
      >
        <div class="container">
          <div class="font-bold mb-3">{{ $t("inspirationsSimilar") }}:</div>
          <SimilarInspirations :items="similarInspirations" />
        </div>
      </section>
    </div>
    <div class="inspiration-page__content pt-5" v-else key="no-template">
      <div class="container">
        <ProductsArea
          :items="products"
          :filters="productsFilters"
          :info="productsInfo"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FetchProducts from "@/mixins/fetch/FetchProducts";
export default {
  mixins: [FetchProducts],
  async fetch() {
    if (this.inspiration.no_template) {
      await this.fetchProducts("inspirationProducts", {
        slug: this.inspiration.slug,
      });
    }
  },
  async asyncData({ $api, params, $error, error, $loader }) {
    $loader.start();
    try {
      const inspiration = await $api.$get("inspiration", {
        slug: params.slug,
      });
      const similarInspirations = await $api.$get("inspirationsSimilar", {
        slug: params.slug,
      });
      $loader.stop();
      return {
        inspiration,
        similarInspirations,
      };
    } catch (err) {
      $loader.stop();
      error({ statusCode: 404 });
    }
  },
  computed: {
    // similarInspirations() {
    //   return (
    //     [
    //       this.inspiration,
    //       this.inspiration,
    //       this.inspiration,
    //       this.inspiration,
    //       this.inspiration,
    //     ] || []
    //   );
    // },
    hasTemplate() {
      return !this.inspiration.no_template;
    },
    currency() {
      return this.$store.getters.currency;
    },
    headerImage() {
      return this.inspiration.header_image;

      return "https://cdn.wonder.pl/cdn-cgi/image/width=1435,height=1435,quality=85,format=auto/inspiration-b656afbeac380fe0fe1f3f25b994abbd67ff1391.jpg";
    },
    name() {
      return this.inspiration.name;

      return "test name";
    },
    introdctionTitle() {
      return this.inspiration.introduction_title;

      return `ОТКРЫВАЕМ ТЕНДЕНЦИИ - САМЫЕ МОДНЫЕ ОБЕДЕННЫЕ СТУЛЬЯ`;
    },
    introdctionText() {
      return this.inspiration.introduction_text;

      return `Мы не поклонники слепого следования трендам (ни моде, ни дизайну интерьера), но считаем, что стоит знать, что в них творится. Лишь бы для того, чтобы открыть для себя новые возможности или расширить свой кругозор. Именно поэтому сегодня мы подготовили для вас некоторую информацию и вдохновение о самых модных обеденных стульях 2018 года, пользующихся наибольшей популярностью в этом сезоне среди блогеров, дизайнеров интерьера и производителей мебели. Но начнем с основ ...`;
    },

    firstBlockIntrodctionText() {
      return this.inspiration.first_block_introduction_text;
      return "Одна из главных тенденций текущего сезона - интерьеры, вдохновленные природой. Неудивительно, что натуральные материалы проявили себя также в контексте самых модных обеденных стульев. Плетение, ротанг, бамбук и водоросли - одни из самых используемых материалов в 2018 году. Так что если до сих пор вы ассоциировали их в основном с садовой мебелью, то, наверное, пора расширить свой внутренний взгляд на мир";
    },
    firstBlockIntrodctionTitle() {
      return this.inspiration.first_block_introduction_title;

      return "БЛИЖЕ К ПРИРОДЕ - СТУЛЬЯ ИЗ НАТУРАЛЬНЫХ МАТЕРИАЛОВ";
    },
    firstBlockImageLeft() {
      return this.inspiration.first_block_image_left;

      return "https://cdn.wonder.pl/cdn-cgi/image/width=1000,height=1000,quality=85,format=auto/inspiration-dd333f9735915e09696c0ee4f9683f7fc16356c3.jpg";
    },
    firstBlockImageRight() {
      return this.inspiration.first_block_image_right;

      return "https://cdn.wonder.pl/cdn-cgi/image/width=1000,height=1000,quality=85,format=auto/inspirationPageImage/inspirationPageImage20190205-28044-1ejrc3v.jpg";
    },
    secondBlockIntrodctionText() {
      return this.inspiration.second_block_introduction_text;
    },
    secondBlockIntrodctionTitle() {
      return this.inspiration.second_block_introduction_title;
    },
    secondBlockImageLeft() {
      return this.inspiration.second_block_image_left;

      return "https://cdn.wonder.pl/cdn-cgi/image/width=1000,height=1000,quality=85,format=auto/inspiration-51041fc6e3c20993be5222a0cc9624a484eed06d.jpg";
    },
    secondBlockImageRight() {
      return this.inspiration.second_block_image_right;

      return "https://cdn.wonder.pl/cdn-cgi/image/width=1000,height=1000,quality=85,format=auto/inspiration-1433d9efe008eac8832cb9e62d3aac3957b38a24.jpg";
    },
    products1() {
      return this.inspiration.products1 || [];
      return [
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
      ];
    },
    products2() {
      return this.inspiration.products2;
      return [
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
        {
          default_image: {
            url:
              "https://cdn.wonder.pl/cdn-cgi/image/width=375,height=375,quality=85,format=auto/productImage/productImage20190206-20586-1ley9qy",
          },
          full_name: "Ко Ланта стул 44x87 см коричневый",
          price: 872,
          delivery_days: 22,
        },
      ];
    },
    products3() {
      return this.inspiration.products3;
    },
    separatorImage() {
      return this.inspiration.separator_image;
    },
  },
};
</script>

<style lang="scss">
</style>