<template>
  <v-app color="contentBackgroundColor">
    <router-view class="main-content" />
  </v-app>
</template>

<script>
  export default {
    name: 'app',
    metaInfo: {
      titleTemplate: (titleChunk) => {
        // If undefined or blank then we don't need the hyphen
        return titleChunk ? `${titleChunk} | Template` : 'Template';
      }
    },
    data() {
      return {};
    },
    computed: {
      // token() { return this.$store.getters['authentication/getToken']; }
    },
    watch: {
      // token(to, from) {
      //   console.log(to, from);
      //   // if (!to) {}
      // }
    },
    methods: {
      initiate() {
        this.events();
        this.checkToken();
        this.setTheme();
      },
      events() {
        this.$eventBus.$on('clear-data', this.clearData);

        // Window Storage Event Listener
        window.addEventListener('storage', (event) => {
          // console.log(event);
          switch(event.key) {
            case 'isLogin':
              setTimeout(() => {
                if (Number(event.newValue)) {
                  this.$router.push({ name: 'main-view' });
                } else {
                  this.clearData();
                }
              }, 100);
              break;
            case 'isDarkMode':
              this.$vuetify.theme.dark = !!Number(event.newValue);
              break;
          }
        });
      },
      checkToken() {
        const token = this.$cookies.get('token');
        if (token) { this.$store.dispatch('authentication/setToken', token); }
      },
      setTheme() {
        setTimeout(() => {
          let isDarkMode = !!Number(window.localStorage.getItem('isDarkMode'));
          // Detect System Dark Mode
          if (!!window && !!window.matchMedia && window.localStorage.getItem('isDarkMode') === null) {
            isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            window.localStorage.setItem('isDarkMode', Number(isDarkMode));
          } else {
            isDarkMode = !!Number(window.localStorage.getItem('isDarkMode'));
          }
          this.$vuetify.theme.dark = isDarkMode;
        });
      },
      clearData() {
        this.$store.dispatch('clearState');
        this.$cookies.remove('token');
        this.$api.main.setAuthorization(undefined);
        window.localStorage.setItem('isLogin', 0);
        this.$router.push({ name: 'login' });
      }
    },
    created() {
      this.initiate();
    },
    beforeDestroy() {
      this.$eventBus.$off('clear-data');
    }
  };
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Material+Icons');
  @import '@/assets/css/main.scss';
</style>