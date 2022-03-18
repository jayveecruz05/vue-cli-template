<template>
  <v-navigation-drawer id="app-navigation" app color="primaryBackgroundColor" v-model="navigationDrawer" :mini-variant="navigationDrawerMini" :temporary="navigationTemporaryDrawer" floating ref="navigationDrawer">
    <template v-slot:prepend>
      <v-list-item id="logo-holder" class="pa-0 px-2">
        <v-list-item-avatar tile>
          <div v-html="require(`!html-loader!@/assets/img/kaia-logo.svg`)"></div>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="logo-text">KAIA</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list class="v-list-navigation" dense>
      <router-link class="router-link" v-for="(item, key) in navigationList" :key="key" :to="{ name: item.to }" :exact="(item.to == 'dashboard')">
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item link v-on="on">
              <v-list-item-icon>
                <div v-if="(item.icon)" class="v-icon v-icon-fill" v-html="require(`!html-loader!@/assets/img/${item.icon}.svg`)"></div>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>{{ item.title }}</span>
        </v-tooltip>
      </router-link>
    </v-list>

    <!-- <template v-slot:append>
      <v-list class="v-list-navigation" dense>
        <v-tooltip right>
          <template v-slot:activator="{ on }">
            <v-list-item @click="logout" v-on="on">
              <v-list-item-icon>
                <div class="v-icon v-icon-fill" v-html="require(`!html-loader!@/assets/img/sign-out.svg`)"></div>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Sign Out</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <span>Sign Out</span>
        </v-tooltip>
      </v-list>
    </template> -->
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: 'app-navigation',
    data() {
      return {
        navigationDrawer: undefined,
        navigationTemporaryDrawer: undefined,
        navigationDrawerMini: undefined,
        temporaryDrawerPages: [],
        navigationList: [
          { title: 'Dashboard', to: 'dashboard', icon: 'dashboard' },
          { title: 'Users', to: 'users', icon: 'users' }
        ]
      };
    },
    computed: {
      isTemporaryDrawer() {
        return this.temporaryDrawerPages.includes(this.$route.name);
      }
    },
    methods: {
      initiate() {
        // Initial Value
        this.navigationDrawer = this.isTemporaryDrawer ? false : this.navigationDrawer;
        this.navigationTemporaryDrawer = this.isTemporaryDrawer ? true : this.navigationTemporaryDrawer;

        this.events();

        // Set Data Example
        // this.$eventBus.$emit('set-navigation-value', { property: 'navigationTemporaryDrawer', value: true });
      },
      events() {
        this.$eventBus.$on('toogle-navigation', this.toggleNavigation);
        this.$eventBus.$on('set-navigation-value', (details) => {
          let { property, value } = details;
          this[property] = typeof value == 'boolean' ? value : this[property];
        });
      },
      toggleNavigation() {
        if (!this.$refs.navigationDrawer.isMobile && !this.navigationTemporaryDrawer) {
          this.navigationDrawerMini = !this.navigationDrawerMini;
        } else {
          this.navigationDrawerMini = false;
          this.navigationDrawer = !this.navigationDrawer;
        }
      }
    },
    created() {
      this.initiate();
    },
    beforeDestroy() {
      this.$eventBus.$off('toogle-navigation');
      this.$eventBus.$off('set-navigation-value');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #app-navigation {
    #logo-holder {
      height: 64px;
      padding-top: 4px;
      padding-bottom: 4px;
      box-sizing: border-box;

      &.theme--light {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
      }

      &.theme--dark {
        border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
      }

      #logo {
        // margin-left: 35px;
        margin: 0 auto;
        min-height: 32px;
        transition: margin-left 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      }
    }

    .v-list.v-list-navigation {
      padding: 0;

      .v-list-item {
        padding: 5px 20px;

        .v-list-item__icon {
          margin-right: 20px;

          .v-icon {
            svg {
              width: 20px;
              height: 20px;
            }

            &.v-icon-fill {
              svg {
                path {
                  fill: #848C9C;
                }

                rect {
                  fill: #848C9C;
                }

                circle {
                  fill: #848C9C;
                }
              }
            }

            &.v-icon-stroke {
              svg {
                path {
                  stroke: #848C9C;
                }

                rect {
                  stroke: #848C9C;
                }

                circle {
                  stroke: #848C9C;
                }
              }
            }
          }
        }

        .v-list-item__title {
          color: #848C9C;
        }
      }

      .router-link {
        text-decoration: none;

        &.router-link-active {
          .v-list-item {
            border-left: 5px solid var(--v-primary-base);
            background-color: var(--v-secondaryBackgroundColor-base);

            &.theme--light {
              border-left: 5px solid var(--v-primary-base);
              background-color: var(--v-secondaryBackgroundColor-base);

              .v-list-item__title {
                color: rgba(0, 0, 0, 0.87);
              }
            }

            &.theme--dark {
              border-left: 5px solid var(--v-primary-base);
              background-color: var(--v-secondaryBackgroundColor-base);

              .v-list-item__title {
                color: rgba(255, 255, 255, 0.87);
              }
            }

            .v-list-item__title {
              color: rgba(0, 0, 0, 0.87);
            }

            .v-list-item__icon {
              margin-left: -5px;

              .v-icon-fill {
                svg {
                  path {
                    fill: var(--v-primary-base);
                  }

                  rect {
                    fill: var(--v-primary-base);
                  }

                  circle {
                    fill: var(--v-primary-base);
                  }
                }
              }

              .v-icon-stroke {
                svg {
                  path {
                    stroke: var(--v-primary-base);
                  }

                  rect {
                    stroke: var(--v-primary-base);
                  }

                  circle {
                    stroke: var(--v-primary-base);
                  }
                }
              }
            }
          }
        }
      }
    }

    // .v-navigation-drawer--mini-variant {
    //   #logo-holder #logo {
    //     margin-left: 0;
    //   }
    // }

    .v-navigation-drawer {
      &__prepend {
        #logo-holder {
          // border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important;
        }
      }
    }
    
    &.v-navigation-drawer--is-mobile {
      .v-navigation-drawer__content {
        overflow-y: auto;
      }
    }
  }
</style>