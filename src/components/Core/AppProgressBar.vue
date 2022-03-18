<template>
  <v-fade-transition>
    <v-progress-linear v-if="(progress.loading)" id="app-progress-bar" indeterminate :color="((progress.status != 'initiate') ? ((progress.status == 'success') ? 'green darken-2' : 'red darken-2') : 'blue darken-2')" fixed top/>
  </v-fade-transition>
</template>

<script>
  export default {
    name: 'app-progress-bar',
    data() {
      return {
        progress: {
          status: false,
          success: true
        }
      };
    },
    methods: {
      initiate() {
        this.events();
      },
      events() {
        this.$eventBus.$on('progress', (status) => {
          // console.log(status);
          clearTimeout(this.progressTimeout);
          switch (status) {
            case 'initiate':
              setTimeout(() => { this.progress = { loading: true, status }; });
              break;
            case 'stop':
              this.progress = { ...this.progress, loading: false };
              break;
            default:
              this.progress.status = status;
              this.progressTimeout = setTimeout(() => { this.progress.loading = false; }, 2000);
          }
        });
      }
    },
    mounted() {
      this.initiate();
    },
    beforeDestroy() {
      this.$eventBus.$off('progress');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .v-progress-linear {
    &#app-progress-bar {
      z-index: 300;
    }
  }
  
  // #app-progress-bar {
  //   margin: 15px 0 5px 0;
  //   height: 13px;
  //   box-sizing: border-box;
  //   background-color: #e0e0e0;
  //   overflow: hidden;

  //   .bar {
  //     height: 13px;

  //     &.calm {
  //       background-color: #67b7dc;
  //     }

  //     &.angry {
  //       background-color: #a367dc;
  //     }

  //     &.fear {
  //       background-color: #6771dc;
  //     }

  //     &.happy {
  //       background-color: #8067dc;
  //     }

  //     &.confused {
  //       background-color: #ee6eb3;
  //     }

  //     &.disgusted {
  //       background-color: #c667dc;
  //     }

  //     &.sad {
  //       background-color: #6794dc;
  //     }

  //     &.surprised {
  //       background-color: #ff9c9c;
  //     }
  //   }
  // }
</style>