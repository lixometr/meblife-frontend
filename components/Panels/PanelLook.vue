<template>
  <Panel
    name="panel-look"
    headerTheme="dark"
    class="panel-look"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template v-slot:title>
      <div class="btn btn-circle btn-white" @click="openModal">
        <svgZoom width="28" />
      </div>
    </template>
    <template v-slot:content>
      <div class="panel-look-content">
        <div v-if="isLoading">
          <Loader class="absolute-center" />
        </div>

        <div class="flex h-100 flex-column" v-else>
          <div class="panel-look__image cursor-pointer" @click="openModal">
            <img class="size-cover" :src="item.image.url" alt />
          </div>
          <div class="overflow-auto flex-1">
            <h6 class="mt-2 mb-2 uppercase text-center">Соответствующие продукты</h6>
            <div class="panel-look__products flex flex-wrap">
              <div class="panel-look__product " v-for="(product, idx) in products" :key="idx">
                <div @click="goToItem(product.slug)" class="position-relative h-100 bg-grey cursor-pointer rounded-10 p-6">
                  <img class=" no-bg size-contain w-100 h-100" :src="product.default_image.url" alt />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgZoom from "@/assets/icons/zoom.svg";
export default {
  components: {
    Panel,
    svgZoom,
  },
  props: {
    id: String,
  },
  data() {
    return {
      isLoading: true,
      item: {},
    };
  },

  async beforeMount() {
    await this.loadLook();
  },
  computed: {
    products() {
      return this.item.products;
    },
    lookImages() {
      return [this.item.image];
    },
  },
  methods: {
    openModal() {
      this.$modal.show("slider-modal", {
        items: this.lookImages,
      });
    },
    goToItem(slug) {
      this.$router.push(this.$url.product(slug));
      this.$emit("close");
    },
    async loadLook() {
      this.isLoading = true;
      try {
        this.item = (await this.$api.$get("lookById", { id: this.id })) || {};
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss">
.panel-look {
  position: relative;
  height: 100%;
  .panel-title {
    background-color: transparent;
    position: relative;
    z-index: 10;
  }
  &__image {
    height: 400px;
  }
  &-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  &__product {
    height: 235px;
    width: 50%;
    cursor: pointer;
    display: block;
    padding: 0.5rem;
    a {
      display: block;
      width: 100%;
      height: 100%;
    }
    span {
      display: block;
      width: 100%;
      height: 100%;
      background: $white;
      transition: $transition;

      &:hover {
        background: $pale;
      }
    }
  }
}
</style>