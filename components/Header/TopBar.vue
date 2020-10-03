<template>
  <div class="top-bar">
    <div class="container">
      <div class="top-bar__row">
        <div class="top-bar__left flex align-center">
          <LangSwitcher class="mr-3"/>
          <RegionSwitcher />
        </div>
        <div class="top-bar__items text-12">
          <!-- <div class="top-bar__item" v-for="(item, idx) in items" :key="idx">
            <nuxt-link :to="item.url || '#'">
              <AppImage
                v-bind="item.icon"
                class="mr-2"
                :style="{ width: '15px' }"
              />
              {{ item.title }}
            </nuxt-link>
          </div> -->
          <div class="top-bar__item" >
            <nuxt-link :to="items[0].url || '#'">
              <AppImage
                v-bind="items[0].icon"
                class="mr-2"
                :style="{ width: '15px' }"
              />
              {{ items[0].title }}
            </nuxt-link>
          </div>
          <div class="top-bar__item" >
            <nuxt-link :to="items[1].url || '#'">
              <AppImage
                v-bind="items[1].icon"
                class="mr-2"
                :style="{ width: '15px' }"
              />
              {{ items[1].title }}
            </nuxt-link>
          </div>
        </div>
        <div class="top-bar__contacts flex align-center">
          <a class="flex align-center text-12 mr-4" href="/show-rooms"
            ><svgMarker
              fill="none"
              stroke="currentColor"
              class="mr-2"
              width="16"
            />{{ $t("topBar.showrooms") }}</a
          >
          <a :href="'telto:' + phone" class="flex align-center text-12"
            ><svgPhone width="16" class="mr-2" />{{ phone }}</a
          >
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
import svgPhone from "@/assets/icons/phone-stroke.svg";
import svgMarker from "@/assets/icons/marker.svg";

export default {
  components: {
    svgDelivery,
    svgMedal,
    svgRefresh,
    svgTeam,
    svgPhone,
    svgMarker,
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
    phone() {
      return this.$store.getters["settings/item"]("phone");
    },
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
  background-color: #342e37;
  height: $top_bar_offset;
  > .container {
    height: 100%;
  }

  @include md {
    background: $white;
  }
  &__row {
    height: 100%;
    display: flex;
    justify-content: space-between;
    color: $white;
    align-items: center;
    a {
      color: $white;
    }
  }
  &__items {
    display: flex;
    justify-content: space-between;
    @include md {
      justify-content: center;
    }
  }
  &__item {
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
    @include md {
      display: none;
      &:last-child {
        display: block;
      }
    }
    a {
      display: flex;
      align-items: center;
      color: $white;
    }

    svg {
      height: auto;
      flex-shrink: 0;
      fill: $white;
    }
  }
}
</style>