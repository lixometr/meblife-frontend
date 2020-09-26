<template>
  <Panel
    name="panel-account.changePersonalData"
    headerTheme="light"
    class="panel-account-change-personal-data"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelChangePersonalData.panelTitle") }}</template>
    <template #content>
      <div class="panel-modal__content">
        <div class="p-3">
          <ChangePersonalDataForm @success="$emit('close')" />
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