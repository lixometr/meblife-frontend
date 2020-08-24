<template>
  <Panel name="panel-contact" headerTheme="light" class="panel-contact">
    <template v-slot:title>КОНТАКТЫ</template>
    <template v-slot:content>
      <div class="panel-contact__header">
        <img src="/img/contact.webp" alt="contact" class="size-cover z-0" />
        <div class="panel-contact__tabs btn-tabs overflow-auto justify-between justify-md-start">
          <div class="btn-tab mr-2 flex-1 shrink-0" :class="{'active': tabActive === 1}">
            <div
              class="btn btn-blur w-100 pl-3 pr-3 font-bold"
              :class="{'active': tabActive === 1}"
              @click="selectTab(1)"
            >
              <span class="truncate">Информация</span>
            </div>
          </div>
          <div class="btn-tab mr-2 flex-1 shrink-0" :class="{'active': tabActive === 2}">
            <div
              class="btn btn-blur btn-tab w-100 pl-3 pr-3 font-bold "
              :class="{'active': tabActive === 2}"
              @click="selectTab(2)"
            >
              <span class="truncate">Купить образ</span>
            </div>
          </div>
          <div class="btn-tab flex-1 shrink-0" :class="{'active': tabActive === 3}">
            <div
              class="btn btn-blur pl-3 pr-3 w-100 font-bold b"
              :class="{'active': tabActive === 3}"
              @click="selectTab(3)"
            >
              <span class="truncate">Вдохновения</span>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-contact__content p-4">
        <transition name="fadeDown" mode="out-in">
          <div class="info" v-if="tabActive === 1" key="1">
            <div class="text-12 text-center">
              <h4 class="uppercase font-bold mb-2">КАК МЫ МОЖЕМ ТЕБЕ ПОМОЧЬ?</h4>
              <p class="mb-3">Наши специалисты к вашим услугам. Вы можете связаться с нами:</p>
              <p>Пн-пт С 8:00 до 21:00 и сб С 10:00 до 16:00</p>
            </div>
          </div>
          <div class="buy-view" v-if="tabActive === 2" key="2">
            <h5 class="uppercase font-bold text-center mb-1">Купить образ</h5>
            <p class="text-14">
              Вы ищете красивый интерьер? Здесь вы найдете их множество! Это не только идеи для украшения комнат разного назначения и использования, но и аранжировки, которые вписываются в разные стили.
              Вы предпочитаете уютные скандинавские интерьеры, а точнее элегантный гламур? Думая о ваших индивидуальных предпочтениях и потребностях, мы подготовили гораздо больше ... Сотни предметов мебели, светильников и аксессуаров - среди них обязательно найдется что-то идеальное именно для вас.
            </p>
            <nuxt-link
              to="/shop-the-looks"
              class="btn btn-red btn-md w-100 mt-4 font-bold"
            >Показать все образы</nuxt-link>
          </div>
          <div class="buy-view" v-if="tabActive === 3" key="3">
            <h5 class="uppercase font-bold text-center mb-1">ВДОХНОВЕНИЯ</h5>
            <p class="text-14">
              Вы немного беспокоитесь о планировании собственного декора? Совершенно ненужно - вы всегда можете рассчитывать на нашу помощь в этом вопросе. Здесь вы найдете множество советов и хитростей по дизайну интерьера, которые сделают путь к интерьеру вашей мечты намного проще.
              Или, может быть, вас интересуют современные тенденции в дизайне дома, и вы хотите быть в курсе последних событий? В этой теме вы также можете рассчитывать на что-то приятное с нами - не только информацию о моде, но и новости о новых коллекциях ведущих мировых брендов.
            </p>
            <nuxt-link
              to="/inspirations"
              class="btn btn-red btn-md w-100 mt-4 font-bold"
            >Показать все вдохновения</nuxt-link>
          </div>
        </transition>
      </div>
      <div class="p-3"></div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  components: {
    Panel,
  },
  data() {
    return {
      tabActive: 1,
    };
  },
  methods: {
    selectTab(id) {
      this.tabActive = id;
    },
  },
};
</script>

<style lang="scss">
.panel-contact {
  &__header {
    height: 230px;
    position: relative;
  }
  &__tabs {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    width: 100%;
  }
}
</style>