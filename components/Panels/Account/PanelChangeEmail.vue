<template>
  <Panel
    name="panel-account.changeEmail"
    headerTheme="light"
    class="panel-account-change-email"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelChangeEmail.panelTitle") }}</template>
    <template #content>
      <div class="panel-modal__content">
        <div class="p-3">
          <ChangeEmailForm @success="$emit('close')" />
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
export default {
  data() {
    return {};
  },

  components: {},
};
</script>

<style lang="scss" >
</style>