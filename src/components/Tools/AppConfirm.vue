<template>
  <v-dialog id="app-confirm" v-model="isShow" scrollable width="400" max-width="auto" color="primaryBackgroundColor" transition="scroll-y-reverse-transition" persistent>
    <v-card>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon class="dialog-close" v-on="on" @click="cancel" :disabled="loading">close</v-icon>
        </template>
        <span>Close</span>
      </v-tooltip>
      <v-card-title class="font-size-18 font-weight-bold">{{ title }}</v-card-title>
      <v-card-text class="px-6 py-4">
        <slot>
          <p class="font-size-14 ma-0">{{ message }}</p>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-row class="flex-row-reverse pb-3" align="center" justify="center">
          <v-col md="5" cols="12" class="pb-0">
            <v-btn class="confirm-btn btn-min-width" block depressed dark :color="buttonColor" :loading="loading" @click="confirm">{{ buttonText }}</v-btn>
          </v-col>
          <v-col md="5" cols="12" class="pb-0">
            <v-btn class="btn-min-width" block text :disabled="loading" @click="cancel">Cancel</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'app-confirm',
    model: {
      prop: 'show',
      event: 'input'
    },
    props: {
      show: { type: Boolean, default: false, required: false },
      loading: { type: Boolean, default: false, required: false },
      title: { type: String, default: 'Confirmation', required: false },
      message: { type: String, default: 'Confirmation Message.', required: false },
      buttonText: { type: String, default: 'confirm', required: false },
      buttonColor: { type: String, default: '#2F80ED', required: false },
      action: { type: String, default: '', required: false },
      data: { type: Object, default: () => ({}), required: false },
      callBack: { type: Function, default: () => {}, required: false }
    },
    data() {
      return {
        isShow: this.show
      };
    },
    watch: {
      show(to) { this.isShow = to; }
    },
    methods: {
      cancel() {
        this.isShow = false;
        this.$emit('input', this.isShow);
        this.$emit('cancel');
      },
      confirm() {
        this.callBack();
        setTimeout(() => {
          this.isShow = (this.loading) ? this.isShow : false;
          this.$emit('input', this.isShow);
          this.$emit('confirm');
        });
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>