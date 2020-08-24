<template>
  <div class="top-bar pt-2">
    <div class="container">
      <div class="top-bar__items text-12">
        <div class="top-bar__item">
          <nuxt-link to="#">
            <svgMedal class="mr-2" width="20" />ГАРАНТИЯ САМОЙ НИЗКОЙ ЦЕНЫ
          </nuxt-link>
        </div>
        <div class="top-bar__item">
          <nuxt-link to="#">
            <svgDelivery class="mr-2" width="20" />БЕСПЛАТНАЯ ДОСТАВКА ОТ 499 ЗЛ.
          </nuxt-link>
        </div>
        <div class="top-bar__item">
          <nuxt-link to="#">
            <svgRefresh class="mr-2" width="15" />30 ДНЕЙ ВОЗВРАТА
          </nuxt-link>
        </div>
        <div class="top-bar__item">
          <nuxt-link to="#">
            <svgTeam class="mr-2" width="20" />БОЛЕЕ 350 000 КЛИЕНТОВ
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