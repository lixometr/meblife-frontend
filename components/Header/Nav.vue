<template>
  <nav class="nav" :class="{'light': variant === 'light',  'dark': variant === 'dark'}">
    <div class="flex align-center nav-left">
      <div class="nav__menu-btn btn btn-md btn-red">
        <svgBurger width="24" class="mr-2" />
        <span class="font-bold md-hidden">Меню</span>
      </div>
      <div class="nav-menu__items text-14 uppercase md-hidden">
        <div class="nav-menu__item ml-5">
          <nuxt-link to="#">Мебель A-Z</nuxt-link>
        </div>
        <div class="nav-menu__item ml-5">
          <nuxt-link to="#">Осветление A-Z</nuxt-link>
        </div>
        <div class="nav-menu__item ml-5">
          <nuxt-link to="#">Аксесуары</nuxt-link>
        </div>
      </div>
    </div>
    <div class="nav-right flex align-center justify-end">
      <SearchBtn class="mr-3 nav-search" :text="$t('search')" :variant="variant"/>

      <div class="nav-right__items text-center">
        <div class="nav-right__item nav__favourite shrink-0">
          <nuxt-link class="p-3" to="#">
            <svgHeart width="18" />
            <span class="nav-right__item-text uppercase text-12 d-block md-hidden">Избранное</span>
          </nuxt-link>
        </div>
        <div class="nav-right__item nav__profile shrink-0">
          <nuxt-link class="p-3" to="#">
            <svgUser width="18" />
            <span class="nav-right__item-text uppercase text-12 d-block md-hidden">Учетная запись</span>
          </nuxt-link>
        </div>
        <div class="nav-right__item nav__cart shrink-0">
          <nuxt-link class="p-3" to="#">
            <svgCart width="23" />
            <span class="nav-right__item-text uppercase text-12 d-block md-hidden">Корзина</span>
          </nuxt-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import SearchBtn from "@/components/SearchBtn";
import svgCart from "@/assets/icons/cart.svg";
import svgHeart from "@/assets/icons/heart.svg";
import svgUser from "@/assets/icons/user.svg";
import svgBurger from "@/assets/icons/burger.svg";
export default {
  props: {
    variant: String,
  },
  components: {
    svgCart,
    SearchBtn,
    svgUser,
    svgHeart,
    svgBurger,
  },
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  padding-top: 0;
  @include md {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
  }
  &-left,
  &-right {
    flex: 1;
  }
  &-left {
    margin-right: 3rem;
  }
  &-right__items {
    display: flex;
    align-items: flex-end;
  }
  &-menu__items {
    display: flex;
  }
  &-search {
    max-width: 240px;
    flex: 1;
  }
  &-menu__btn {
    svg {
      width: 18px;
      flex-shrink: 0;
    }
  }
  &.light {
    color: $dark;
    fill: $dark;
  }
  &.dark {
    color: $white;
    fill: $white;
  }
  &-menu__item {
    color: inherit;
    font-weight: 700;
    a {
      color: inherit;
      font-weight: inherit;
    }
  }
  &-right__item {
    fill: inherit;
    color: inherit;
    font-weight: 700;

    a {
      display: inline-block;
      font-weight: inherit;
      color: inherit;
    }
  }
}
</style>