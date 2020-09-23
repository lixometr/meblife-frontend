
<script>
import { filtersFromQuery } from "@/helpers/functions";

export default {
  data() {
    return {
      inspirations: [],
      inspirationsInfo: {},
    };
  },
  methods: {
    async fetchInspirations(route) {
      try {
        const result = await this.$api.$get(
          route,
          {
            slug: this.$route.params.slug,
          },
          {
            params: {
              page: this.$route.query.page || 1,
            },
          }
        );
        this.inspirations = result.items;
        this.inspirationsInfo = result.info;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

