<template>
  <div id="main-view">
    <app-progress-bar/>
    <app-notifications/>
    <app-navigation/>
    <app-bar/>
    <v-main class="fill-height">
      <router-view class="content" />
    </v-main>
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
      return {};
    },
    watch: {
      $route() {
        // console.log(to, from);
        window.scrollTo(0, 0);
      }
    },
    methods: {
      initiate() {
        window.scrollTo(0, 0);
      }
    },
    mounted() {
      this.initiate();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
  }
</style>