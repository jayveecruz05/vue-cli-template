import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
        primary: '#376BFA',
        primaryTextColor: '#FFFFFF',
        secondaryTextColor: '#000000de',
        primaryBackgroundColor: '#FFFFFF',
        secondaryBackgroundColor: '#F3F5F8',
        error: '#FF726F'
      },
      dark: {
        primary: '#376BFA',
        primaryTextColor: '#FFFFFF',
        secondaryTextColor: '#FFFFFF',
        primaryBackgroundColor: '#293143',
        secondaryBackgroundColor: '#252736',
        error: '#FF726F'
      }
    }
  }
});