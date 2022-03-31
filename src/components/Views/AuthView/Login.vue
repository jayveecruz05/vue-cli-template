<template>
  <v-card id="login-module" class="py-5" flat color="primaryBackgroundColor">
    <v-card-title id="logo-holder" class="d-flex align-center justify-center pa-0 pb-8">
      <div class="mr-3" v-html="require(`!html-loader!@/assets/img/kaia-logo.svg`)"></div>
      <span class="logo-text">KAIA</span>
    </v-card-title>
    <v-card-subtitle class="ma-0 pa-0 pb-5 text-center font-size-18">Sign In to your account</v-card-subtitle>
    <v-form v-model="formData.status" ref="formData">
      <v-alert v-if="(formData.notification)" class="text-left" :type="formData.notification.type" dense outlined>{{ formData.notification.message }}</v-alert>
      <v-text-field v-model="formData.email" label="Email Address" placeholder="Email Address" color="primary" autocomplete="off" flat solo dense autofocus :disabled="formData.loading" :rules="[$validate.rules.required, $validate.rules.email]" required @keyup.enter="signIn"/>
      <v-text-field v-model="formData.password" label="Password" placeholder="Password" color="primary" flat solo dense :disabled="formData.loading" :rules="[$validate.rules.required]" required :type="((showPassword) ? 'text' : 'password')" :append-icon="((showPassword) ? 'mdi-eye' : 'mdi-eye-off')" @click:append="showPassword = !showPassword" @keyup.enter="signIn"/>
      <v-btn class="primaryTextColor--text mt-3" block color="primary" :loading="formData.loading" @click="signIn">Sign In</v-btn>
    </v-form>
  </v-card>
</template>

<script>
  export default {
    name: 'login-module',
    data() {
      return {
        showPassword: false,
        formData: {
          status: false,
          loading: false,
          notification: undefined,
          email: '',
          password: ''
        }
      }
    },
    computed: {
      query() { return this.$route.query; }
    },
    methods: {
      signIn() {
        let formStatus = this.$refs.formData.validate();

        if (formStatus && this.formData.status && !this.formData.loading) {
          let { email, password } = this.formData;
          this.formData.notification = undefined;
          this.formData.loading = true;
          this.$store.dispatch('authentication/login', { data: { email, password } }).then(
            (response) => {
              // console.log(response);
              if (response.token) {
                this.$cookies.set('token', window.btoa(response.token)); // Encode To Base64
                this.$api.main.setAuthorization(response.token);
                window.localStorage.setItem('isLogin', true);
                this.redirect();
              }
            }
          ).catch(
            (error) => {
              // console.log(error);
              this.formData.loading = false;
              this.formData.notification = { type: 'error', message: error?.response?.data?.message || error?.message };
            }
          );
        }
      },
      redirect() {
        if (this.query.redirect) {
          this.$router.push({ name: this.query.redirect });
        } else {
          this.$router.push({ name: 'main-view' });
        }
      }
    },
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>