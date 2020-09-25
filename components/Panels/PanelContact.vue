<template>
  <Panel name="panel-contact" headerTheme="light" class="panel-contact" :isStatic="false" @close="$emit('close')">
    <template v-slot:title><span class="uppercase">{{$t('panelContact.panelTitle')}}</span></template>
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
              <span class="truncate">{{$t('information')}}</span>
            </div>
          </div>
          <div class="btn-tab mr-2 flex-1 shrink-0" :class="{'active': tabActive === 2}">
            <div
              class="btn btn-blur btn-tab w-100 pl-3 pr-3 font-bold "
              :class="{'active': tabActive === 2}"
              @click="selectTab(2)"
            >
              <span class="truncate">{{$t('buyLook')}}</span>
            </div>
          </div>
          <div class="btn-tab flex-1 shrink-0" :class="{'active': tabActive === 3}">
            <div
              class="btn btn-blur pl-3 pr-3 w-100 font-bold b"
              :class="{'active': tabActive === 3}"
              @click="selectTab(3)"
            >
              <span class="truncate">{{$t('inspirations')}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-contact__content p-4">
        <transition name="fadeDown" mode="out-in">
          <div class="info" v-if="tabActive === 1" key="1">
            <div class="text-12 text-center">
              <h4 class="uppercase font-bold mb-2">{{$t('panelContact.tabs[0].title')}}</h4>
              <p class="mb-3">{{$t('panelContact.tabs[0].text1')}}</p>
              <p>{{$t('panelContact.tabs[0].text2')}}</p>
              <div class="pt-4">
                <ContactBtnPhone class="mb-2"/>
                <ContactBtnEmail />
              </div>
            </div>
          </div>
          <div class="buy-view" v-if="tabActive === 2" key="2">
            <h5 class="uppercase font-bold text-center mb-1">{{$t('panelContact.tabs[1].title')}}</h5>
            <p class="text-14">
            {{$t('panelContact.tabs[1].text')}}
            </p>
            <nuxt-link
              to="/shop-the-looks"
              class="btn btn-red btn-md w-100 mt-4 font-bold"
            >{{$t('panelContact.tabs[1].btnText')}}</nuxt-link>
          </div>
          <div class="buy-view" v-if="tabActive === 3" key="3">
            <h5 class="uppercase font-bold text-center mb-1">{{$t('panelContact.tabs[2].title')}}</h5>
            <p class="text-14">
             {{$t('panelContact.tabs[2].text')}}
            </p>
            <nuxt-link
              to="/inspirations"
              class="btn btn-red btn-md w-100 mt-4 font-bold"
            >{{$t('panelContact.tabs[2].btnText')}}</nuxt-link>
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