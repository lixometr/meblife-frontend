<template>
  <div class="contact-btn">
    <a :href="'tel:'+text" class="btn btn-white btn-md w-100 contact-btn__btn font-bold">
      <span class="color-orange"><svgPhone width="25" /></span
      ><span> {{ text }}</span>
    </a>
  </div>
</template>

<script>
import svgPhone from "@/assets/icons/phone.svg";
export default {
  computed: {
    text() {
      return this.$store.getters["settings/item"]("phone");
    },
  },
  components: {
    svgPhone,
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