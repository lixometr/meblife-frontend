<template>
  <Panel
    name="panel-account.personalData"
    headerTheme="light"
    class="panel-account-personal-data"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelPersonalData.panelTitle") }}</template>
    <template #content>
      <div class="panel-modal__content">
        <div>
          <div
            class="icon-link"
            v-for="(link, idx) in links"
            :key="idx"
            @click="openLink(link.action)"
          >
            <component :is="link.icon" width="18" />
            {{ $t("panelPersonalData.links." + link.action) }}
          </div>
        </div>
        <div class="p-3 mt-4">
          <div class="panel-account__btns">
            <p class="mb-3">{{ $t("panelAccount.contactUs") }}</p>
            <ContactBtnChat class="mb-3" />
            <ContactBtnPhone class="mb-3" />
            <ContactBtnEmail />
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import svgMail from "@/assets/icons/mail.svg";
import svgUser from "@/assets/icons/user.svg";
import svgKey from "@/assets/icons/key.svg";
export default {
  data() {
    return {
      links: [
        {
          icon: "svgMail",
          action: "email",
        },
        {
          icon: "svgKey",
          action: "password",
        },
        {
          icon: "svgUser",
          action: "personal",
        },
      ],
    };
  },
  components: {
    svgMail,
    svgKey,
    svgUser,
  },
  methods: {
    openLink(action) {
      if (action === "email") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.changeEmail",
        });
      }
      if (action === "password") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.changePassword",
        });
      }
      if (action === "personal") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.changePersonalData",
        });
      }
    },
  },
};
</script>

<style lang="scss" >
</style>