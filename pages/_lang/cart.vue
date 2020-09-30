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
          <div class="cart-page__inner-wrapper">
            <nuxt-child
              @nextStep="openNextStep"
              @prevStep="prevStep"
              :activeStep="activeStep"
            />
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
    // await this.fetchModuleGroups();
  },
  async asyncData({ error, $api, params, store, $loader }) {
    $loader.start();
    try {
      $loader.stop();
    } catch (err) {
      $loader.stop();

      error();
    }
  },
  components: {
    svgCheckmark,
  },
  data() {
    return {
      activeStep: 0,
      pasedSteps: [],
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
  },
  methods: {
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

