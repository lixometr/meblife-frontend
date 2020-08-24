<template>
  <div class="post-page__soc-links mt-9 pt-9">
    <div class="container">
      <h3 class="text-center text-md-left">ЕСТЬ ЕЩЕ МНОГО ВСЕГО, ЧТО МОЖНО ОТКРЫТЬ!</h3>
      <p
        class="text-center text-md-left mb-9"
      >Вы не думали, что это все, что мы для вас приготовили ...? У нас есть еще несколько предложений, которые вам трудно игнорировать.</p>
      <ArrowExpand>
        <nuxt-link
          :to="link.url"
          class="flex align-center p-4 bg-grey mb-1"
          v-for="(link, idx) in links"
          :key="idx"
        >
          <div class="icon">
            <component :is="link.icon" width="40" />
          </div>
          <span class="flex-1 text-center text-md-left">
            <span class="font-bold d-block text-14">{{link.title}}</span>
            <span class="d-block text-12">{{link.description}}</span>
          </span>
          <svgLink width="30" class="color-dark" />
        </nuxt-link>
      </ArrowExpand>
    </div>
  </div>
</template>

<script>
import ArrowExpand from "@/components/ArrowExpand";
import svgLink from "@/assets/icons/link.svg";
import svgLogo from "@/assets/icons/logo.svg";
import svgFacebook from "@/assets/icons/facebook.svg";
import svgInstagram from "@/assets/icons/instagram.svg";
import svgSofa from "@/assets/icons/sofa.svg";
export default {
  components: {
    ArrowExpand,
    svgLink,
    svgLogo,
    svgFacebook,
    svgInstagram,
    svgSofa,
  },
  computed: {
    links() {
      return [
        {
          title: "Давайте узнаем друг друга!",
          description: "Убедитесь сами, что к Wonder стоит приблизиться...",
          icon: svgLogo,
          url: "#",
        },
        {
          title: "Присоединиться к нам на Facebook!",
          description:
            "Если вы любите красивые аранжировки, вы не можете пропустить наш профиль в Facebook - здесь вы найдете их множество!",
          icon: svgFacebook,
          url: "#",
        },
        {
          title: "Встретимся в Instagram!",
          description:
            "Присоединяйтесь к нашей семье в Instagram - каждый любитель красивых интерьеров найдет здесь что-то вдохновляющее!",
          icon: svgInstagram,
          url: "#",
        },
        {
          title: "Выставочный зал КАРЕ - почувствуйте волшебство вживую",
          description:
            "Хотите почувствовать вдохновение на собственной шкуре? Приглашаем вас в выставочный зал KARE в Кракове - там вы найдете много продуктов из нашего предложения.",
          icon: svgSofa,
          url: "#",
        },
      ];
    },
  },
};
</script>

<style lang="scss" >
</style>