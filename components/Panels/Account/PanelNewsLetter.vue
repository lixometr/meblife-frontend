<template>
  <Panel
    name="panel-account.newsletter"
    headerTheme="light"
    class="panel-account-newsletter"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelNewsLetter.panelTitle") }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1">
          <p class="text-14 mb-5">
            {{ $t("panelNewsLetter.text") }}
          </p>
          <label for="agreement-checkbox" class="flex align-start">
            <input type="checkbox" id="agreement-checkbox" class="mr-2" v-model="agree" />
            <p class="">{{ $t("panelNewsLetter.agreement") }}</p>
          </label>
          <div class="btn btn-green btn-md w-100 mt-3" @click="save">
            {{ $t("panelNewsLetter.btn") }}
          </div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
export default {
  data() {
    return {
      agree: this.$store.getters['user/user'].agreement2,
    };
  },
  async fetch() {
    try {
      const orders = await this.$api.$get("orders");
      this.orders = orders;
    } catch (err) {
      this.$error(err);
    }
  },
  computed: {},
  components: {},
  methods: {
    async save() {
      try {
        const result = await this.$api.$put('userInfo', null, {
          agreement2: this.agree
        })
        if(result.ok) {
          this.$toast.global.appSuccess({
            message: this.$t('panelNewsLetter.success')
          })
          await this.$store.dispatch('user/init')
        }
      } catch(err) {
        this.$error(err)
      }
    }
  },
};
</script>

<style lang="scss" >
</style>