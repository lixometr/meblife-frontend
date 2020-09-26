<template>
  <Panel
    name="panel-account.orders"
    headerTheme="light"
    class="panel-account-orders"
    closeType="back"
    @close="$emit('close')"
  >
    <template #title>{{ $t("panelOrders.panelTitle") }}</template>
    <template #content>
      <div
        class="panel-modal__content flex align-stretch flex-column justify-start"
      >
        <div class="p-3 flex-1 orders__items" v-if="orders.length > 0">
          <div
            class="shadow rounded-10 orders__item mb-3"
            v-for="order in orders"
            :key="order._id"
          >
            <div class="p-3 orders-__item-text">{{ order.name }}}</div>

            <!-- <div class="flex justify-between p-3">
              <div class="btn btn-circle" @click="removeAddress(address._id)">
                <svgDelete width="20" />
              </div>
              <div class="btn btn-circle" @click="editAddress(address._id)">
                <svgPencil width="20" />
              </div>
            </div> -->
          </div>
        </div>
        <div class="p-3" v-else>
          {{ $t("panelOrders.noItems") }}
        </div>
      </div>
    </template>
  </Panel>
</template>

<script>
import svgDelete from "@/assets/icons/trash.svg";
import svgPencil from "@/assets/icons/pencil.svg";
export default {
  data() {
    return {
      orders: [],
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
  components: {
    svgDelete,
    svgPencil,
  },
  methods: {},
};
</script>

<style lang="scss" >
</style>