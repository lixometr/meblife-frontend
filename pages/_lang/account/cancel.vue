<template>
  <div class="cancel-account">
    <div class="container">
      <div class="text-center cancel-account__wrapper ">
        <h2 class="mb-1">{{ $t("removePage.title") }}</h2>
        <p class="mb-3">{{ $t("removePage.text") }}}</p>
        <div class="flex flex-wrap justify-center">
          <div class="btn btn-red btn-md mr-3" @click="approve">
            {{ $t("removePage.btns.yes") }}
          </div>
          <div class="btn btn-white btn-md" @click="cancel">{{ $t("removePage.btns.no") }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async approve() {
      try {
        const result = await this.$api.$post("userRemove");
        if(result.ok) {
          this.$store.dispatch('user/logout')
          this.$router.push('/')
        }
      } catch (err) {
        this.$error(err);
      }
    },
    cancel() {
        this.$router.push('/')
    }
  },
};
</script>

<style lang="scss">
.cancel-account {
    &__wrapper {
        padding-top: 140px;
    }
    .btn {
        width: 200px;
        display: block;
    }
}
</style>