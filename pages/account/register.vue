<template>
  <div class="register-page">
    <Header class="default-header" variant="dark" />
    <div class="page-header">
      <AppImage v-bind="headerImage" class="page-header__image" />
      <div class="image-placeholder"></div>
      <div class="page-header__content">
        <div class="flex flex-column h-100">
          <div class="page-header__title flex-1 flex align-center justify-center flex-column">
            <div>
              <h1
                class="mw-100 truncate pl-3 pr-3 mb-3 uppercase color-white text-center"
              >{{pageName}}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="register-page__content">
      <SignUpForm />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pageName() {
      return "";
    },
    headerImage() {
      return {};
    },
  },
};
</script>

<style lang="scss" >
</style>