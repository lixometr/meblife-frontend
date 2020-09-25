<template>
  <Panel
    name="panel-account.changePassword"
    headerTheme="light"
    class="panel-account-change-password"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelChangePassword.panelTitle") }}</template>
    <template #content>
      <div class="panel-modal__content">
        <div class="p-3">
          <ChangePasswordForm @success="$emit('close')" />
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="scss" >
</style>