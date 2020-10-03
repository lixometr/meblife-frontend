
<script>
import { filtersFromQuery } from "@/helpers/functions";

export default {
  data() {
    return {
      products: [],
      productsInfo: {},
      productsFilters: {},
    };
  },
  methods: {
    async fetchProducts(route, params) {
      params = params || { slug: this.$route.params.slug };
      try {
        const result = await this.$api.$get(route, params, {
          params: {
            filters: filtersFromQuery(this.$route.query, true),
            sort_by: this.$route.query.sort_by,
            page: this.$route.query.page || 1,
            need_filters: true,
          },
        });

        this.products = result.items;
        this.productsInfo = result.info;
        this.productsFilters = result.filters;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

