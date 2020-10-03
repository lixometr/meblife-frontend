<template>
  <client-only>
    <div class="modal-search">
      <div
        class="modal-search__menu-btn btn btn-md btn-red"
        @click="openMenuModal"
      >
        <svgBurger width="24" class="mr-2" />
        <span class="font-bold">Меню</span>
      </div>
      <div
        class="modal-search__close flex btn-white align-center justify-center btn btn-circle"
        @click="close"
      >
        <svgClose width="30" />
      </div>
      <div class="modal-search__input-container container">
        <SearchInput v-model="text" />
      </div>
    </div>
  </client-only>
</template>

<script>
import svgClose from "@/assets/icons/close.svg";
import svgSearch from "@/assets/icons/search.svg";
import svgBurger from "@/assets/icons/burger.svg";

export default {
  components: {
    svgClose,
    svgSearch,
    svgBurger,
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    close() {
      this.$modal.hide("modal-search");
      this.$emit("close");
    },
    async search() {
      try {
        const result = await this.$api.$get("search", { text: this.text });
        console.log(result);
      } catch (err) {
        this.$error(err);
      }
    },
    openMenuModal() {
      this.$modal.hideAll();
      this.$emit("close");
      this.$store.dispatch("modal/open", { name: "modal-menu" });
    },
  },
};
</script>

<style lang="scss" >
.modal-search {
  &__close {
    opacity: 0;
    transition: $transition;
    position: absolute;
    top: 15px;
    right: 15px;
  }
  &:hover {
    .modal-search__close {
      opacity: 1;
    }
  }
  &__menu-btn {
    position: absolute;
    top: 15px;
    left: 15px;
  }
  &__input-wrapper {
    position: relative;
    height: 70px;
    display: flex;
    align-items: stretch;
  }
  &__input-icon {
    position: absolute;
    left: 30px;
    top: 50%;
    transform: translateY(-50%);
    @include md {
      display: none;
    }
  }
  &__input-btn {
    width: 70px;
    height: 100%;
    border-radius: 0;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
  }
  &__input-container {
    padding-top: 10rem;
    @include md {
      padding-top: 5rem;
    }
  }
  &__input {
    padding-left: 75px;
    padding-right: 1.5rem;
    background-color: $white;
    border: 1px solid $grey;
    border-right: none;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: block;
    height: 100%;
    flex: 1;
    font-size: $font_16;
    outline: none;
    @include md {
      padding-left: 15px;
    }
  }
}
</style>