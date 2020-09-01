<template>
  <Panel name="panel-sub-filters" headerTheme="dark" class="panel-sub-filters" @before-open="beforeOpen">
    <template v-slot:title>{{title}}</template>
    <template v-slot:content>
      <div class="panel-sub-filters__content">
        <div class="panel-sub-filters__item" v-for="(valueItem, idx) in valueItems" :key="idx">
          <div class="flex justify-between align-center">
            <div class="panel-sub-filters__item-name">{{valueItem.name}}</div>
            <div class="panel-sub-filters__item-checkbox">{{valueItem.name}}</div>
          </div>
        </div>
        <div class="panel-sub-filters__footer border-top border-grey">
          <div class="btn btn-white btn-md" @click="cancel">Вернуться без изменений</div>
          <div class="btn btn-green btn-md" @click="apply">Применить</div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
export default {
  components: {
    Panel,
  },
  data() {
    return {
      params: {},
    };
  },
  computed: {
    valueItems() {
      return this.params.items;
    },
    title() {
        return this.params.title
    }
  },
  methods: {
    cancel() {},
    apply() {},
    beforeOpen({ params }) {
      const defaultParams = {
        items: [],
        title: 'Test Title'
      };
      const newParams = { ...defaultParams, ...params };
      this.params = newParams;
      console.log(newParams);
    },
  },
};
</script>

<style lang="scss">

</style>