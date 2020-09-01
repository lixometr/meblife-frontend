<template>
  <client-only>
    <modal name="modal-search" class="modal-search" height="100%" width="100%" transition="fade">
      <div class="modal-search__menu-btn btn btn-md btn-red" @click="openMenuModal">
        <svgBurger width="24" class="mr-2" />
        <span class="font-bold ">Меню</span>
      </div>
      <div
        class="modal-search__close flex btn-white align-center justify-center btn btn-circle"
        @click="close"
      >
        <svgClose width="30" />
      </div>
      <div class="modal-search__input-container container">
        <div class="modal-search__input-wrapper">
          <svgSearch class="modal-search__input-icon" width="20" />
          <input
            @keypress.enter="search"
            class="modal-search__input"
            type="text"
            v-model="text"
            placeholder="Искать..."
          />
          <div class="modal-search__input-btn btn btn-black shrink-0" @click="search">
            <svgSearch width="20" />
          </div>
        </div>
      </div>
    </modal>
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
    svgBurger
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    close() {
      this.$modal.hide("modal-search");
    },
    search() {
      console.log(this.text);
    },
    openMenuModal() {
      this.$modal.hideAll('modal-search')
      this.$modal.show('modal-menu')
    }
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