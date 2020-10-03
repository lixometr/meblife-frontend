<template>
  <nav
    class="nav"
    :class="{ light: variant === 'light', dark: variant === 'dark' }"
  >
    <div class="container">
      <div class="nav__row">
        <div class="flex align-center nav-left">
          <nuxt-link to="/" class="nav-menu__logo">
            <svgLogo width="180" />
          </nuxt-link>

          <div class="md-show color-white cursor-pointer ml-5">
            <svgSearch class @click="searchModalOpen" width="17" />
          </div>
        </div>
        <SearchBtn
          class="nav-search md-hidden flex-1"
          :text="$t('search')"
          :variant="variant"
        />
        <div class="nav-right flex align-center justify-end">
          <div class="nav-right__items text-center">
            <div class="nav-right__item nav__profile shrink-0">
              <div class="p-3 cursor-pointer" @click="openProfilePanel">
                <svgUser width="18" />
                <!-- <span
              class="nav-right__item-text uppercase text-12 d-block md-hidden"
              >{{$t('header.account')}}</span
            > -->
              </div>
            </div>
            <div class="nav-right__item nav__favourite shrink-0">
              <div class="p-3 cursor-pointer" @click="openFavouritePanel">
                <div class="position-relative">
                  <svgHeart width="18" />
                  <div
                    class="nav__favourite-cnt nav-cnt"
                    v-if="favouriteCnt > 0"
                  >
                    {{ favouriteCnt }}
                  </div>
                </div>
                <!-- <span
              class="nav-right__item-text uppercase text-12 d-block md-hidden"
              >{{$t('header.favourite')}}</span
            > -->
              </div>
            </div>

            <div class="nav-right__item nav__cart shrink-0">
              <div
                class="pr-0 pl-3 pt-3 pb-3 cursor-pointer"
                @click="cartModalOpen"
              >
                <div class="position-relative">
                  <svgCart stroke="currentColor" width="23" />
                  <div class="nav__cart-cnt nav-cnt" v-if="cartCnt > 0">
                    {{ cartCnt }}
                  </div>
                </div>
                <!-- <span
              class="nav-right__item-text uppercase text-12 d-block md-hidden"
              >{{$t('header.cart')}}</span
            > -->
              </div>
            </div>
          </div>
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
import svgSearch from "@/assets/icons/search.svg";
import svgLogo from "@/assets/icons/logo1.svg";
export default {
  props: {
    variant: String,
  },
  components: {
    svgCart,
    SearchBtn,
    svgUser,
    svgHeart,
    svgSearch,
    svgBurger,
    svgLogo,
  },
  computed: {
    favouriteCnt() {
      return this.$store.getters["favourite/cnt"];
    },
    cartCnt() {
      return this.$store.getters["cart/cnt"];
    },
  },
  methods: {
    openMenuModal() {
      this.$store.dispatch("modal/open", { name: "modal-menu" });
    },
    openFavouritePanel() {
      this.$store.dispatch("modal/open", { name: "panel-favourite" });
    },
    openProfilePanel() {
      this.$store.dispatch("modal/open", { name: "panel-account" });
    },
    cartModalOpen() {
      this.$store.dispatch("modal/open", { name: "panel-cart" });
    },
    searchModalOpen() {
      this.$store.dispatch("modal/open", { name: "modal-search" });
    },
  },
};
</script>

<style lang="scss">
.nav {
  padding-left: 0!important;
  padding-right: 0!important;
  padding-top: 0.5rem!important;
  padding-bottom: 0.5rem;
  display: block!important;
  @include md {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.5rem;
  }
  &__row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  &-left,
  &-right {
    // flex: 1;
    flex: initial !important;
    @include md {
      flex: auto;
    }
  }
  &-left {
    margin-right: 3rem;
  }
  &__cart {
    svg {
      fill: none;
    }
  }
  &-right__items {
    display: flex;
    align-items: flex-end;
  }
  &-menu__items {
    display: flex;
  }
  &-search {
    max-width: 700px !important;
    flex: 1;
    margin-right: 2rem;
    margin-left: 2rem;
    @include md {
      margin-left: 1rem;
      margin-right: 1rem;
    }
  }
  &-menu__btn {
    @include md {
      width: 50px;
      height: 50px;
      padding: 0 !important;
    }
    svg {
      flex-shrink: 0;
      @include md {
        margin-right: 0 !important;
      }
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
  &__cart {
    position: relative;
  }
  &__favourite {
    position: relative;
  }
  &-cnt {
    position: absolute;
    top: -8px;
    right: -12px!important;
    width: 20px;
    height: 20px;
    background: $orange;
    color: $white;
    text-align: center;
    line-height: 20px;
    font-size: 0.75rem;
    border-radius: 50%;
    font-weight: normal;
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