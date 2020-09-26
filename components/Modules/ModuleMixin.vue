<script>
export default {
  computed: {
    title() {
      return this.item.title;
    },
    subTitle() {
      return this.item.sub_title;
    },
    description() {
      return this.item.description;
    },
    description() {
      return this.item.description;
    },
    moduleId() {
      return this.item.module_id;
    },
    moduleItems() {
      return this.item.module_items || [];
    },
    mainImage() {
      return this.item.main_image || {};
    },
    moduleImages() {
      return this.item.module_images || [];
    },
    moduleFiles() {
      return this.item.module_files || [];
    },
    sortOrder() {
      return this.item.sort_order;
    },
    cuntdownStartAt() {
      return this.item.cuntdown_start_at;
    },
    cuntdownEndAt() {
      return this.item.cuntdown_end_at;
    },
    moreBtn() {
      return this.item.more_btn;
    },
    moreBtnUrl() {
      return this.item.more_btn_url;
    },
    showType() {
      return this.item.show_type;
    },
    color() {
      return this.item.color
    },
    bgColor() {
      return this.item.bg_color
    }
  },
  methods: {
    itemLink(item) {
      if (item.type === "Product") {
        return this.$url.product(item.item.slug);
      } else if (item.type === "Category") {
        return this.$url.category(item.item.slug);
      }
      return "#";
    },
    itemImage(item) {
      if (item.type === "Product") {
        return item.item.default_image;
      } else if (item.type === "Category") {
        return item.item.image;
      } else if (item.type === "Manufacturer") {
        return item.item.image;
      }
      return {};
    },
    itemName(item) {
      if (item.type === "Product") {
        return item.item.full_name;
      } else if (item.type === "Category") {
        return item.item.name;
      } else if (item.type === "Manufacturer") {
        return item.item.name;
      }
      return {};
    },
  },
};
</script>
