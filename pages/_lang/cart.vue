<template>
  <div class="cart-page">
    <Header class="default-header" variant="light" />
    <div class="page-header">
      <div class="pt-7 mb-2">
        <div class="container">
          <h3 class="text-center uppercase mb-5">
            {{ $t("cartPage.pageTitle") }}
          </h3>
          <div class="cart-page__steps flex flex-wrap align-center mb-6">
            <component
              :is="isPassed(idx) ? 'nuxt-link' : 'div'"
              class="btn cart-page__step btn-md mr-3"
              :class="{
                'active is-active': activeStep === idx,
                'is-passed ': isPassed(idx),
                'is-disabled': !isPassed(idx) && activeStep !== idx,
              }"
              v-for="(step, idx) in steps"
              :key="idx"
              :to="$url.cart(step.slug)"
            >
              {{ step.name }}
              <svgCheckmark width="20" v-if="isPassed(idx)" class="ml-2" />
            </component>
          </div>
          <div class="cart-page__inner-wrapper" v-if="items.length > 0" key="hasItems">
            <nuxt-child
              @nextStep="openNextStep"
              @prevStep="prevStep"
              :activeStep="activeStep"
              :items="items"
            />
          </div>
          <div key="noItems" class="flex flex-wrap align-center" v-else>
            <h6 class="mr-3">{{$t('cartPage.noItems.title')}}</h6>
            <nuxt-link class="btn btn-md btn-green" to="/">{{$t('cartPage.noItems.btn')}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgCheckmark from "@/assets/icons/checkmark.svg";
export default {
  async fetch() {
    this.$loader.start();
    try {
      await this.fetchItems();
      this.$loader.stop();
    } catch (err) {
      this.$loader.stop();
      this.$error(err)
    }
  },

  components: {
    svgCheckmark,
  },
  data() {
    return {
      activeStep: 0,
      pasedSteps: [],
      items: [],
    };
  },
  created() {
    this.defineStep();
  },
  computed: {
    steps() {
      const steps = [
        {
          name: this.$t("cartPage.steps.first"),
          slug: "",
        },
        {
          name: this.$t("cartPage.steps.login"),
          slug: "login",
        },
        {
          name: this.$t("cartPage.steps.address"),
          slug: "address",
        },
        {
          name: this.$t("cartPage.steps.payment"),
          slug: "payment",
        },
        {
          name: this.$t("cartPage.steps.summary"),
          slug: "summary",
        },
        {
          name: this.$t("cartPage.steps.approve"),
          slug: "approve",
        },
      ];
      return steps;
    },
    isPassed() {
      return (step) => this.pasedSteps.includes(step);
    },
    cartItems() {
        return this.$store.getters['cart/items']
    }
  },
  methods: {
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
    defineStep() {
      const path = this.$route.fullPath;
      const rest = path.replace(/^.+?cart\//, "");
      let nowStep = this.steps.findIndex((step) => step.slug === rest);
      if (nowStep < 0) nowStep = 0;
      this.activeStep = nowStep;
    },
    passStep(step) {
      if (this.pasedSteps.includes(step)) return;
      this.pasedSteps.push(step);
    },
    changeStep(step) {
      this.passStep(this.activeStep);
      this.activeStep = step;
    },
    openNextStep() {
      this.nextStep();
      this.$router.push(this.$url.cart(this.steps[this.activeStep].slug));
    },
    nextStep() {
      if (this.activeStep >= this.steps.length - 1) {
        this.changeStep(this.steps.length - 1);
        return;
      }
      this.changeStep(this.activeStep + 1);
    },
    prevStep() {
      if (this.activeStep <= 0) {
        this.changeStep(0);
        return;
      }
      this.changeStep(this.activeStep - 1);
    },
  },
  watch: {
    $route() {
      this.defineStep();
    },
  },
};
</script>

<style lang="scss">
.cart-page {
  .page-header {
    height: auto;
  }
  &__step {
    &.is-disabled {
      background: $grey;
      cursor: default;
      &:hover {
        background: $grey;
        border: 1px solid $grey;
        color: $black;
      }
    }
    &.is-active {
      border: 1px solid $orange;
      background: $white;
      color: $orange;
      cursor: default;
      &:hover {
        background: $white;
      }
    }
    &.is-passed {
      border: 1px solid $green;
      color: $green;
      background: $white;
      &:hover {
        background: $green;
        color: $white;
      }
    }
  }
  .cart-card {
    background: $pale;
    border: 1px solid $grey;
    border-radius: 3px;
  }
}
</style>

