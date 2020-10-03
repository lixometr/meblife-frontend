
<script>
export default {
  methods: {
    saveData(data) {
      if (process.client) {
          this.$cookie.set()
      }
    },
    getData() {
        return this.$cookie.get('')
    }
  },
};
</script>

<style lang="scss" >
</style>