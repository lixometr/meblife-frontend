<template>
  <Panel
    name="panel-favourite"
    class="panel-favourite"
    headerTheme="light"
    closeType="back"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelFavourite.panelTitle") }}</template>
    <template #content>
      <div class="panel-favourite__content">
        <div class="p-3">
          <Loader v-if="isLoading" />
          <div v-else>
            <div v-if="items.length > 0" key="hasItems">
              <div
                class="panel-favourite__item shadow rounded-10 p-3 mb-3"
                v-for="item in items"
                :key="item._id"
              >
                <div class="flex">
                  <div
                    @click="openProduct(item.slug)"
                    class="panel-favourite__item-image cursor-pointer p-3 mr-2"
                  >
                    <div class="position-relative w-100 h-100">
                      <AppImage
                        contain
                        absoluteFull
                        noBg
                        v-bind="item.default_image"
                      />
                    </div>
                  </div>
                  <div class="panel-favourite__item-content text-right">
                    <div
                      class="panel-favourite__item-name font-bold cursor-pointer"
                      @click="openProduct(item.slug)"
                    >
                      {{ item.full_name }}
                    </div>
                    <div
                      class="panel-favourite__item-delivery mt-3"
                      v-if="item.delivery_24"
                    >
                      {{ $t("deliveryText") }}
                      <b class="color-green">{{ $t("delivery24") }}</b>
                    </div>
                    <div class="panel-favourite__item-delivery mt-3" v-else>
                      {{ $t("deliveryText") }}
                      <b
                        >{{ item.delivery_days }}
                        {{ deliveryText(item.delivery_days) }}</b
                      >
                    </div>
                  </div>
                </div>
                <div class="flex align-end justify-between mt-2">
                  <div class="panel-favourite__item-actions flex">
                    <div
                      class="btn btn-circle btn-white mr-2"
                      @click="removeItem(item._id)"
                    >
                      <svgTrash width="20" />
                    </div>
                    <div
                      class="btn btn-circle btn-white mr-2"
                      @click="addToCart(item._id)"
                    >
                      <svgCart width="20" />
                    </div>
                  </div>
                  <div class="panel-favourite__item-price text-right">
                    <s class="text-14 mb-1" v-if="item.old_price"
                      >{{ item.old_price }} {{ currency }}</s
                    >
                    <div :class="{ 'color-orange text-24': item.old_price }">
                      <b>{{ item.price }} {{ currency }}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else key="noItems">
              <h6 class="mb-6">{{ $t("panelFavourite.noItems.title") }}</h6>
              <div class="flex align-center pl-4">
                <div class="font-bold">{{ $t("panelFavourite.noItems.text") }}</div>
                <div class="shrink-0 ml-5">
                  <svgHeartStroke width="50"/>
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
import svgTrash from "@/assets/icons/trash.svg";
import svgCart from "@/assets/icons/cart.svg";
import svgHeartStroke from "@/assets/icons/heart-stroke.svg";
import { wordForm } from "@/helpers/functions";
export default {
  components: {
    svgCart,
    svgTrash,
    svgHeartStroke
  },
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    deliveryText() {
      return (days) => {
        return wordForm(days, this.$t("daySclon"));
      };
    },
    currency() {
      return this.$store.getters.currency;
    },
    items() {
      return this.$store.getters["favourite/items"] || [];
    },
  },
  methods: {
    async removeItem(id) {
      this.isLoading = true;
      try {
        await this.$store.dispatch("favourite/remove", { id });
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    addToCart(id) {
      this.$store.dispatch("cart/add", { id, cnt: 1 });
      this.$emit("close");
      this.$store.dispatch("modal/open", { name: "panel-cart" });
    },
    openProduct(slug) {
      this.$router.push(this.$url.product(slug));
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" >
.panel-favourite {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  max-height: 100%;
  &__content {
    flex: 1;
    overflow: auto;
  }
  &__item {
    &-name {
      // word
      text-emphasis: ellipsis;
      overflow: hidden;
    }
    &-image {
      min-height: 150px;
      width: 150px;
      flex-shrink: 0;
      background: $pale;
      border: 1px solid $grey;
    }
  }
}
</style>