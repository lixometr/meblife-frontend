<template>
  <Panel name="panel-installments" headerTheme="dark" class="panel-installments">
    <template v-slot:title>ФИЛЬТРЫ</template>
    <template v-slot:content>
      <div class="panel-installments__content p-4">
    
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import svgCheckmark from "@/assets/icons/checkmark.svg";
export default {
  components: {
    Panel,
    svgCheckmark,
  },
  data() {
    return {
    };
  },
  methods: {
   
  },
};
</script>

<style lang="scss">

</style>