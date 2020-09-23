
<script>
import { filtersFromQuery } from "@/helpers/functions";

export default {
  data() {
    return {
      looks: [],
      looksInfo: {},
    };
  },
  methods: {
    async fetchLooks(route) {
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
        this.looks = result.items;
        this.looksInfo = result.info;
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

