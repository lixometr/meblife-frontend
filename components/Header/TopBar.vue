<template>
  <div class="top-bar pt-2">
    <div class="container">
      <div class="top-bar__items text-12">
        <div class="top-bar__item uppercase" v-for="(item, idx) in items" :key="idx">
          <nuxt-link :to="item.url || '#'">
            <AppImage
              v-bind="item.icon"
              class="mr-2"
              :style="{ width: '20px' }"
            />
            {{ item.title }}
          </nuxt-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import svgDelivery from "@/assets/icons/delivery.svg";
import svgMedal from "@/assets/icons/medal.svg";
import svgRefresh from "@/assets/icons/refresh.svg";
import svgTeam from "@/assets/icons/team.svg";
export default {
  components: {
    svgDelivery,
    svgMedal,
    svgRefresh,
    svgTeam,
  },
  async fetch() {
    const topBar = await this.$api.$get("widgetByName", { name: "top_bar" });
    this.item = topBar;
  },
  data() {
    return {
      item: {},
    };
  },
  computed: {
    values() {
      return this.item.values;
    },
    items() {
      return this.values.items;
    },
  },
};
</script>

<style lang="scss" >
.top-bar {
  background-color: $grey;
  height: $top_bar_offset;
  @include md {
    background: $white;
  }
  &__items {
    display: flex;
    justify-content: space-between;
    @include md {
      justify-content: center;
    }
  }
  &__item {
    @include md {
      display: none;
      &:last-child {
        display: block;
      }
    }
    a {
      display: flex;
      align-items: center;
    }

    svg {
      height: auto;
      flex-shrink: 0;
    }
  }
}
</style>