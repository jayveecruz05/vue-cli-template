<template>
  <div id="main-view">
    <!-- Main View Wrapper -->
    <template v-if="(show)">
      <app-progress-bar/>
      <app-notifications/>
      <app-navigation/>
      <app-bar/>
      <v-main class="fill-height">
        <router-view class="content" />
      </v-main>
    </template>
    <!-- /Main View Wrapper -->

    <!-- Loading Wrapper -->
    <template v-else>
      <v-container fluid class="fill-height align-center justify-center">
        <v-card id="loading-wrapper" width="300px" color="transparent" flat>
          <v-card-text class="d-flex flex-column align-center justify-center">
            <div id="logo" v-html="require(`!html-loader!@/assets/img/kaia-logo.svg`)"></div>
            <v-progress-linear class="my-10" color="primary" height="6" rounded indeterminate/>
          </v-card-text>
        </v-card>
      </v-container>
    </template>
    <!-- /Loading Wrapper -->
  </div>
</template>

<script>
  import appProgressBar from '@/components/Core/AppProgressBar';
  import appNotifications from '@/components/Core/AppNotifications';
  import appNavigation from '@/components/Core/AppNavigation';
  import appBar from '@/components/Core/AppBar';

  export default {
    name: 'main-view',
    components: {
      appProgressBar,
      appNotifications,
      appNavigation,
      appBar
    },
    data() {
      return {
        show: false
      };
    },
    watch: {
      $route() {
        // console.log(to, from);
        window.scrollTo(0, 0);
      }
    },
    methods: {
      initiate() {
        setTimeout(() => {
          this.show = true;
          window.scrollTo(0, 0);
        }, 1000);
      }
    },
    mounted() {
      this.initiate();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #main-view {
    .content {
      display: flex;
      flex-direction: column;
      flex: 1 1 auto;
      position: relative;
      backface-visibility: hidden;
      max-width: 100%;
      min-height: 100%;
      max-height: 100%;
    }

    #loading-wrapper {
      #logo {
        svg {
          display: block;
          width: 60px;
          height: 60px;
        }
      }
    }
  }
</style>