<template>
  <Panel
    name="panel-account"
    headerTheme="light"
    class="panel-account"
    @close="$emit('close')"
  >
    <template #title>
      {{ $t("panelAccount.panelTitle") }}
    </template>
    <template #content>
      <div class="panel-modal__content">
        <div class="panel-account__links">
          <div
            class="panel-account__link icon-link"
            v-for="(link, idx) in links"
            :key="idx"
            @click="linkOpen(link.action)"
          >
            <component :is="link.icon" width="16" class="mr-4" />
            <span>{{ $t("panelAccount.links." + link.action) }}</span>
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
        <div
          class="panel-account__link icon-link"
          @click="removeAccount"
        >
          <svgRemoveAccount width="16" class="mr-4" />
          <span>{{ $t("panelAccount.deleteAccount") }}</span>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import svgUser from "@/assets/icons/user.svg";
import svgUserPlus from "@/assets/icons/user-plus.svg";
import svgDoc from "@/assets/icons/doc.svg";
import svgHeart from "@/assets/icons/heart.svg";
import svgNewsLetter from "@/assets/icons/newsletter.svg";
import svgLogout from "@/assets/icons/logout.svg";
import svgRemoveAccount from "@/assets/icons/remove-account.svg";
export default {
  components: {
    svgUser,
    svgUserPlus,
    svgDoc,
    svgHeart,
    svgNewsLetter,
    svgLogout,
    svgRemoveAccount,
  },
  data() {
    return {
      links: [
        {
          icon: "svgUser",
          action: "personalData",
        },
        {
          icon: "svgUserPlus",
          action: "delivery",
        },
        {
          icon: "svgDoc",
          action: "orders",
        },
        {
          icon: "svgHeart",
          action: "favourite",
        },
        {
          icon: "svgNewsLetter",
          action: "mailSettings",
        },
        {
          icon: "svgLogout",
          action: "logout",
        },
      ],
    };
  },
  methods: {
    removeAccount() {
      this.$router.push(this.$url.account('cancel'))
      this.$emit('close')
    },
    linkOpen(action) {
      if (action === "personalData") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.personalData",
        });
      }
      if (action === "delivery") {
        this.$store.dispatch("modal/open", { name: "panel-account.addresses" });
      }
      if (action === "orders") {
        this.$store.dispatch("modal/open", { name: "panel-account.orders" });
      }
      if (action === "favourite") {
        this.$store.dispatch("modal/open", { name: "panel-favourite" });
      }
      if (action === "mailSettings") {
        this.$store.dispatch("modal/open", {
          name: "panel-account.newsletter",
        });
      }
      if (action === "logout") {
        this.logout();
      }
    },
    logout() {
      this.$store.dispatch("user/logout");
      this.$emit('close')
    },
  },
};
</script>

<style lang="scss" >
</style>