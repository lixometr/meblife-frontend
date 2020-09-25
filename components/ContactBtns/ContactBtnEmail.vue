<template>
  <div class="contact-btn">
    <a :href="'mailto:'+text" class="btn btn-white btn-md w-100 contact-btn__btn font-bold">
      <span class="color-orange"><svgMail width="25" /></span
      ><span> {{ text }}</span>
    </a>
  </div>
</template>

<script>
import svgMail from "@/assets/icons/mail.svg";
export default {
  computed: {
    text() {
      return this.$store.getters["settings/item"]("email");
    },
  },
  components: {
    svgMail,
  },
};
</script>

<style lang="scss" >
.contact-btn {
    &__btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>