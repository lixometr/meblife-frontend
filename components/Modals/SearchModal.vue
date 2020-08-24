<template>
  <client-only>
    <modal name="modal-search" height="100%" width="100%" transition="fade">
      <div
        class="modal-close flex btn-white align-center justify-center btn btn-circle"
        @click="close"
      >
        <svgClose width="30" />
      </div>
    </modal>
  </client-only>
</template>

<script>
import svgClose from "@/assets/icons/close.svg";
export default {
  components: {
    svgClose,
  },
  methods: {
    close() {
      this.$modal.hide("modal-search");
    },
  },
};
</script>

<style lang="scss" >
</style>