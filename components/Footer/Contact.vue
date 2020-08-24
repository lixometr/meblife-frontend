<template>
  <div class="post-page__contact container pt-7 pb-3">
    <h3 class="text-center uppercase mb-4">Связаться с нами</h3>
    <div class="flex justify-center md-column text-14">
      <a :href="'mailto:'+email" class="contact-item btn btn-md btn-white mr-4">
        <svgMail width="20" class="color-orange mr-3" />
        <span>{{email}}</span>
      </a>
      <a :href="'tel'+phone" class="contact-item btn btn-md btn-white mr-4">
        <svgPhone width="20" class="color-orange mr-3" />
        <span>{{phone}}</span>
      </a>
      <div class="contact-item btn btn-md btn-white">
        <svgChat width="20" class="color-orange mr-3" />
        <span>Активировать чат</span>
      </div>
    </div>
  </div>
</template>

<script>
import svgMail from "@/assets/icons/mail.svg";
import svgPhone from "@/assets/icons/phone.svg";
import svgChat from "@/assets/icons/chat.svg";
export default {
  components: {
    svgMail,
    svgPhone,
    svgChat,
  },
  computed: {
      email() {
          return 'poczta@wonder.pl';
      },
      phone() {
          return '+48 12 38 48 48';
      }
  },
};
</script>

<style lang="scss">
.post-page__contact {
    h3 {
        @include md {
            text-align: left;
        }
    }
  .contact-item {
    @include md {
      margin-right: 0;
      margin-bottom: 1rem;
    }
    span {
        @include md {
            flex: 1;
        }
    }
    svg {
      @include md {
      }
    }
  }
}
</style>