<template>
  <div class="logo">
    <nuxt-link to="/" class="logo__link">
      <svgLogo class="logo__img" />Meblife
    </nuxt-link>
    <img class="logo__bg" src="/img/logo-bg.svg" alt="bg" />
  </div>
</template>

<script>
import svgLogo from "@/assets/icons/logo.svg";
export default {
  components: {
    svgLogo,
  },
};
</script>

<style lang="scss">
.logo {
  width: 250px;
  @include md {
    width: 190px;
  }
  &__img {
    width: 78px;
    color: $orange;
    margin-bottom: 5px;
    @include md {
      width: 40px;
    }
  }
  &__link {
    position: absolute;
    z-index: 10;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-weight: bold;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-transform: uppercase;
    font-family: $second_font;
    text-decoration: none;
    &:hover {
      text-decoration: none;
    }
    font-size: 0.85rem;
    @include md {
      font-size: 0.75rem;
      line-height: 1.3125rem;
    }
  }
  &__bg {
    width: 100%;
    height: auto;
    filter: drop-shadow(0 2px 1px rgba(65, 65, 65, 0.065));
  }
}
</style>