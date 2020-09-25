<template>
  <div class="contact-btn">
    <a  class="btn btn-white btn-md w-100 contact-btn__btn font-bold" @click="openChat">
      <span class="color-orange"><svgChat width="25" /></span
      ><span> {{ $t('chat') }}</span>
    </a>
  </div>
</template>

<script>
import svgChat from "@/assets/icons/chat.svg";
export default {
  
  components: {
    svgChat,
  },
  methods: {
    openChat() {
      
    }
  }
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