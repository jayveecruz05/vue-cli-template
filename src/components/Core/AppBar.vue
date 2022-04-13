<template>
  <v-app-bar id="app-bar" app flat color="primaryBackgroundColor">
    <v-app-bar-nav-icon @click.stop="$eventBus.$emit('toogle-navigation')"></v-app-bar-nav-icon>
    <v-spacer />
    <v-switch v-model="isDarkMode" inset hide-details label="Dark Mode"></v-switch>
    <v-menu offset-y nudge-bottom="5" min-width="160px">
      <template v-slot:activator="{ on }">
        <v-btn class="ml-3 mr-2" v-on="on" outlined fab icon small color="primary">
          <v-icon>person</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item dense @click="logout">Sign Out</v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    name: 'app-bar',
    data() {
      return {};
    },
    computed: {
      isDarkMode: {
        get() { return this.$vuetify.theme.dark; },
        set(value) {
          this.$vuetify.theme.dark = value;
          window.localStorage.setItem('isDarkMode', Number(value));
        }
      }
    },
    methods: {
      logout() {
        this.clearData();
      },
      clearData() {
        this.$eventBus.$emit('clear-data');
      }
    },
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  #app-bar {
    box-sizing: border-box;

    &.theme--light {
      border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
    }

    &.theme--dark {
      border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
    }
  }
</style>