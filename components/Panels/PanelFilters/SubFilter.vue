<template>
  <Panel
    name="panel-sub-filters"
    headerTheme="dark"
    class="panel-sub-filters"
    :isStatic="false"
  >
    <template v-slot:title>{{title}}</template>
    <template v-slot:headerButtons>
      <div
        class="panel-back flex align-center justify-center btn btn-circle btn-white"
        @click="back"
      >
        <ArrowBack width="30" />
      </div>
    </template>

    <template v-slot:content>
      <div class="panel-sub-filters__content">
        <SubFilterItem
          v-for="(valueItem, idx) in valueItems"
          :key="idx"
          :item="valueItem"
          :value="itemsValues.findIndex(item => item.slug === valueItem.slug) >= 0"
          @change="onItemChange($event, valueItem)"
        />
        <div class="panel-sub-filters__footer mt-auto border-top border-grey p-4 flex">
          <div class="btn btn-white btn-md mr-2" @click="cancel">Вернуться без изменений</div>
          <div class="btn btn-green btn-md flex-1 font-bold" @click="apply">Применить</div>
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import Panel from "@/components/Panel";
import ArrowBack from "@/assets/icons/arrow-back.svg";
export default {
  components: {
    Panel,
    ArrowBack,
  },
  name: "SubFilterPanel",
  props: {
    items: Array,
    title: String,
    /*
      [{name: "attr-value-name", slug: "attr-value-slug"}]
    */
    value: Array,
    change: Function
  },
  data() {
    return {
      itemsValues: this.value || [],
    };
  },
  computed: {
    valueItems() {
      return this.items;
    },
  },
  methods: {
    /**
     * @param event (Boolean)
     * @param valueItem (Object)
     */
    onItemChange(event, valueItem) {
      const value = event;
      if (value) {
        this.itemsValues = [...this.itemsValues, valueItem];
      } else {
        this.itemsValues = this.itemsValues.filter(
          (item) => item.slug !== valueItem.slug
        );
      }
    },
    back() {
      this.$emit("close");
    },
    cancel() {
      this.$emit("close");
      this.itemsValues = {};
    },
    apply() {
      this.change(this.itemsValues)
      this.$emit('close');
    },
  },
};
</script>

<style lang="scss">
.panel-sub-filters {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  &__content {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
  }
  .panel-close {
    display: none;
  }
}
</style>