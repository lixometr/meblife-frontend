<template>
  <div class="register-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>
      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div
            class="page-header__title flex-1 flex align-center justify-center flex-column"
          >
            <div>
              <h1
                class="mw-100 truncate pl-3 pr-3 uppercase color-white text-center"
              >
                {{ pageName }}
              </h1>
              <div class="color-white">
                {{ $t("signUpPage.pageSubTitle") }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="register-page__content">
      <div class="bg-grey pb-7 pt-6">
        <div class="container">
          <div class="register-page__row flex justify-center">
            <div class="register-page__advantages md-hidden pt-6">
              <div class="register-page__logo color-orange">
                <svgLogo width="220px" />
              </div>
              <div class="register-page__advantages-items mt-3">
                <div
                  v-for="(item, idx) in $t('signUpPage.advantages')"
                  :key="idx"
                  class="flex align-center"
                >
                  <svgChecMark width="28" class="mr-2 color-orange" />{{ item }}
                </div>
              </div>
            </div>
            <div class="register-page__form-wrapper">
              <div class="register-page__instruction mb-5">
                <h3>{{ $t("signUpPage.instruction.title") }}</h3>

                <ol class="pl-6">
                  <li
                    v-for="(item, idx) in $t('signUpPage.instruction.items')"
                    :key="idx"
                  >
                    {{ item }}
                  </li>
                </ol>
              </div>
              <h5 class="register-page__form-title text-center pt-4 mb-4">
                {{ $t("signUpPage.formTitle") }}
              </h5>
              <div class="register-page__form-sub-title text-center mb-4">
                {{ $t("signUpPage.formSubTitle") }}
              </div>
              <SignUpForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import svgLogo from "@/assets/icons/logo.svg";
import svgChecMark from "@/assets/icons/checkmark-circle.svg";
export default {
  components: {
    svgLogo,
    svgChecMark,
  },
  data() {
    return {
      agreement1: false,
      agreement2: false,
    }
  },
  computed: {
    pageName() {
      return this.$t("signUpPage.pageTitle");
    },
    headerImage() {
      return {
        url: "/img/register_bg.webp",
      };
    },
  },
};
</script>

<style lang="scss" >
.register-page {
  &__advantages {
    width: 33.33%;
    // flex: 1;
    // flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 2rem;
  }
  &__form-wrapper {
    // flex: 1;
    width: 50%;
    padding-left: 2rem;
    @include md {
      padding-left: 0;
    }
  }
  &__instruction {
    ol {
      list-style-type: decimal;
    }
  }
}
</style>