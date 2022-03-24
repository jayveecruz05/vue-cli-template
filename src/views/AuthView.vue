<template>
  <div id="auth-view">
    <v-main>
      <v-container fluid class="fill-height align-center justify-center pa-5">
        <v-card width="840" color="primaryBackgroundColor">
          <v-container>
            <v-row align="stretch" justify="center">
              <v-col class="d-flex flex-column justify-center" md="6" cols="12">
                <div id="auth-view-image" v-html="require(`!html-loader!@/assets/img/auth-view-image.svg`)"></div>
              </v-col>
              <v-col md="6" cols="12">
                <router-view class="fill-height d-flex flex-column justify-center"/>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </div>
</template>

<script>
  export default {
    name: 'auth-view',
    data() {
      return {};
    },
    methods: {},
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #auth-view {
    #auth-view-image {
      svg {
        width: auto;
        height: auto;
      }
    }
  }
</style>