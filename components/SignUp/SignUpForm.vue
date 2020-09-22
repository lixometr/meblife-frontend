<template>
  <form action="#" @submit.prevent="onSubmit">
    <div class="mb-2">
      <AuthInput type="text" :label="$t('inputName')" v-model="name" />
      <p class="mt-1 text-14 color-red" v-if="isSubmited && $v.name.$error">
        <span v-if="!$v.name.required">
          <svgError width="12" class="mr-1" />
          {{$t('formErrors.required')}}
        </span>
      </p>
    </div>
    <div class="mb-2">
      <AuthInput type="email" :label="$t('inputEmail')" v-model="email" />
      <p class="mt-1 text-14 color-red" v-if="isSubmited && $v.email.$error">
        <span v-if="!$v.email.required">
          <svgError width="12" class="mr-1" />
          {{$t('formErrors.required')}}
        </span>
        <span v-if="!$v.email.email">
          <svgError width="12" class="mr-1" />
          {{$t('formErrors.email')}}
        </span>
      </p>
    </div>
    <div>
      <AuthInput type="password" :label="$t('inputPassword')" v-model="password" />
      <p class="mt-1 text-14 color-red" v-if="isSubmited && $v.password.$error">
        <span v-if="!$v.password.required">
          <svgError width="12" class="mr-1" />
          {{$t('formErrors.required')}}
        </span>
      </p>
    </div>

    <button type="submit" class="btn btn-green btn-md w-100 mt-3">
      <b>{{$t('signup')}}</b>
    </button>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import svgError from "@/assets/icons/error.svg";
export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
      policyAgree: false,

      isSubmited: false,
    };
  },
  components: {
    svgError,
  },
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
    name: {
      required,
    },
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      this.isSubmited = true;
      if (this.$v.$invalid) {
        return;
      }
      try {
        const result = await this.$store.dispatch("user/signup", {
          email: this.email,
          password: this.password,
          name: this.name,
        });
        if (result.error) {
          this.$toast.global.appError({
            message: this.$t(`errors.${result.errorCode}`),
          });
        }
      } catch (err) {
        this.$error(err);
      }
    },
  },
};
</script>

<style lang="scss" >
</style>