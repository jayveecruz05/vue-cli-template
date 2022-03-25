<template>
  <notifications id="app-notifications" group="app-notifications" position="top right" animation-name="v-fade-right"/>
</template>

<script>
  export default {
    name: 'app-notifications',
    data() {
      return {}
    },
    methods: {},
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app-notifications {
    &.vue-notification-group {
      margin: 5px 0;

      .vue-notification {
        font-size: 14px;
        color: #ffffff;
        background-color: #44A4FC;
        border-left: 5px solid #187FE7;

        &.success {
          background-color: #68CD86 !important;
          border-left-color: #42A85F !important;
        }

        &.warning {
          background-color: #ffb648 !important;
          border-left-color: #f48a06 !important;
        }
        
        &.error {
          background-color: #E54D42 !important;
          border-left-color: #B82E24 !important;
        }

        .notification-title {
          text-transform: capitalize;
          word-wrap: break-word;
          overflow-wrap: break-word;
          -webkit-hyphens: auto;
          -moz-hyphens: auto;
          hyphens: auto;
        }

        .notification-content {
          word-wrap: break-word;
          overflow-wrap: break-word;
          -webkit-hyphens: auto;
          -moz-hyphens: auto;
          hyphens: auto;
          white-space: pre-wrap;
        }
      }

      .v-fade-right-enter-active,
      .v-fade-right-leave-active,
      .v-fade-right-move {
        transition: all .5s;
      }
      .v-fade-right-enter,
      .v-fade-right-leave-to {
        opacity: 0;
        transform: translateX(300px);
      }
    }
  }
</style>