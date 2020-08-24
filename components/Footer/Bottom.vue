<template>
  <div class="post-page__bottom pt-4 pb-5 mt-4 bg-grey">
    <div class="container">
      <h3 class="text-center uppercase text-md-left mb-4">НАЙДИТЕ БОЛЬШЕ ВДОХНОВЕНИЯ</h3>
      <div class="flex justify-center justify-md-start mb-5">
        <a href="https://facebook.com" class="post-page__bottom-link mr-3" target="_blank">
          <svgFacebook width="35" />
        </a>
        <a href="https://pinterest.com" class="post-page__bottom-link mr-3" target="_blank">
          <svgPinterest width="35" />
        </a>
        <a href="https://instagram.com" class="post-page__bottom-link" target="_blank">
          <svgInstagram width="35" />
        </a>
      </div>
      <p
        class="text-14 text-center text-md-left"
      >Владельцем бренда \ o / onder является , внесенная в реестр предприятий, который ведется главой коммуны Зелонки под номером 3920, NIP 6772309195, REGON 120798841. Этот веб-сайт использует печенье. Используя веб-сайт, вы соглашаетесь на их чтение или запись в соответствии с настройками вашего браузера и принятие Политики конфиденциальности \ o / onder 2018 © \ o / onder</p>
    </div>
  </div>
</template>

<script>
import svgFacebook from "@/assets/icons/facebook.svg";
import svgInstagram from "@/assets/icons/instagram.svg";
import svgPinterest from "@/assets/icons/pinterest.svg";
export default {
  components: {
    svgFacebook,
    svgInstagram,
    svgPinterest,
  },
};
</script>

<style lang="scss">
.post-page__bottom-link {
  color: $dark;

  svg {
    fill: $dark;
    transition: 0.3s;
    path {
      width: 100%;
      height: 100%;
    }
  }
  &:hover {
    color: $orange;

    svg {
      fill: $orange;
    }
  }
}
</style>