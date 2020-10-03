<template>
  <div class="cart-login">
    <div class="flex">
      <div class="flex-1">
        <h6 class="mb-3">{{ $t("cartPage.login.title") }}:</h6>
        <div class="cart-login__btns">
          <div
            class="cart-login__btn btn btn-md btn-grey"
            @click="chooseWay('guest')"
          >
            <span>
              {{ $t("cartPage.login.btn1") }}
            </span>
            <svgArrowRight class="ml-2" width="20" />
          </div>
          <div
            class="cart-login__btn btn btn-md btn-grey"
            @click="chooseWay('guest')"
          >
            <span>{{ $t("cartPage.login.btn2") }}</span>
            <svgArrowDown class="ml-2" width="20" />
          </div>
          
          <div
            class="cart-login__btn btn btn-md btn-grey"
            @click="chooseWay('guest')"
          >
            <span> {{ $t("cartPage.login.btn3") }}</span>
            <svgArrowDown class="ml-2" width="20" />
          </div>
        </div>
      </div>
      <div class="flex-1 pl-3">
        <CartSidebar :items="items" />
      </div>
    </div>
  </div>
</template>

<script>
import svgArrowRight from "@/assets/icons/arrow-right.svg";
import svgArrowDown from "@/assets/icons/arrow-down-sm.svg";

export default {
  props: {
    items: Array,
  },
  components: {
    svgArrowRight,
    svgArrowDown,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
      chooseWay(way) {
          if(way === 'guest') {
              this.$emit('nextStep')
          }
      }
  }
};
</script>

<style lang="scss" >
.cart-login {
  &__btn {
    display: flex;
    width: 100%;
    margin-bottom: 0.5rem;
    span {
        flex: 1;
        
    }
  }
}
</style>