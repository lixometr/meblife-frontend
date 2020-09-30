<template>
  <Panel
    name="panel-cart"
    headerTheme="light"
    class="panel-cart"
    :isStatic="false"
    @close="$emit('close')"
  >
    <template v-slot:content>
      <div class="panel-cart__header pt-4 pl-4 pb-4 pr-4">
        <div class="color-green mb-4 font-bold uppercase flex align-center text-14" v-if="added">
          <svgCheckMark class="mr-1" width="30" />{{$t('panelCart.itemAddedToCart')}}
        </div>
        <div class="text-14 font-bold">{{$t('panelCart.itemsInCart')}}</div>
        <div
          class="panel-close panel-cart__close flex align-center justify-center btn btn-circle btn-white"
          @click="$emit('close')"
        >
          <svgClose width="30" />
        </div>
        <div class="panel-cart__header-btns flex mt-4">
          <div
            class="btn btn-md btn-white flex-1 uppercase font-bold mr-2"
            @click="$emit('close')"
          >{{$t('panelCart.back')}}</div>
          <div
            class="btn btn-md btn-green flex-1 font-bold uppercase"
            @click="toCart"
          >{{$t('panelCart.toCart')}}</div>
        </div>
      </div>
      <div class="panel-cart__content">
        <div class="panel-cart__loading" key="isLoading" v-if="isLoading">
          <Loader />
        </div>
        <div key="noLoading" v-else>
          <PanelCartItem
            v-for="(item, index) in items"
            :item="item"
            :cnt="cartItems[index] && cartItems[index].cnt"
            :key="item._id"
            class="mb-3"
            @changeCnt="onItemChangeCnt($event, item.id)"
            @removeItem="onItemRemove(item.id)"
          ></PanelCartItem>
        </div>
      </div>
      <div class="panel-cart__footer p-3 pt-5 border-top border-grey">
        <div class="flex align-center justify-between">
          <div>
            <p>{{$t('panelCart.totalSum')}}</p>
            <p class="text-12">{{$t('panelCart.taxCart')}}</p>
          </div>
          <div class="color-orange font-bold text-18">{{totalPrice}} {{currency}}</div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import Loader from "@/components/Loader";
import svgClose from "@/assets/icons/close.svg";
import svgCheckMark from "@/assets/icons/checkmark-circle.svg";
import PanelCartItem from "./PanelCartItem";
export default {
  props: {
    added: {
      type: Boolean,
      default: false,
    },
  },
 
  components: {
    Panel,
    svgClose,
    PanelCartItem,
    svgCheckMark,
  },
  data() {
    return {
      items: [],
      isLoading: true,
    };
  },
  computed: {
    totalPrice() {
      return this.items.reduce((sum, item) => {
        const cartItem = this.$store.getters['cart/getItem'](item._id)
        if(!cartItem) return sum
        const cnt = cartItem.cnt;
        sum += (item.price * cnt) ;
        return sum;
      }, 0);
    },
    currency() {
      return this.$store.getters.currency;
    },
    cartItems() {
      return this.$store.getters["cart/items"];
    },
  },
  async beforeMount() {
    await this.fetchItems();
  },
  methods: {
    toCart() {
      this.$emit('close')
      this.$router.push(this.$url.cart(''))
    },
    async fetchItems() {
      this.isLoading = true;
      try {
        const resolvers = this.cartItems.map(async (item) => {
          const { data: product } = await this.$api.get("productById", {
            id: item.id,
          });
          return product;
        });
        const items = await Promise.all(resolvers);
        this.items = items;
      } catch (err) {
        this.$error(err);
      }
      this.isLoading = false;
    },
    onItemChangeCnt(newValue, id) {
      this.$store.dispatch("cart/update", { id, cnt: newValue });
    },
    onItemRemove(id) {
      this.$store.dispatch("cart/remove", { id });
    },
  },
  watch: {
    cartItems(newValue, prevValue) {
      if (newValue.length === prevValue.length) return;
      this.fetchItems();
    },
  },
};
</script>

<style lang="scss" >
.panel-cart {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  .panel-title {
    display: none;
  }
  &__content {
    flex: 1;
    overflow-y: auto;
  }
  &__close {
    position: absolute;
    top: 5px;
    right: 5px;
  }
}
</style>