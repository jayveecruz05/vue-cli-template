'use strict';

export default {
  computed: {
    defaultOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              gridLines: {
                color: this.gridLineColor
              },
              ticks: {
                fontColor: this.textColor
              }
            }
          ],
          yAxes: [
            {
              gridLines: {
                color: this.gridLineColor
              },
              ticks: {
                fontColor: this.textColor
              }
            }
          ]
        },
        legend: {
          labels: {
            boxWidth: 20,
            fontColor: this.textColor,
          }
        }
      };
    },
    textColor() {
      return this.$vuetify.theme.isDark ? this.$vuetify.theme.themes.dark.secondaryTextColor : this.$vuetify.theme.themes.light.secondaryTextColor;
    },
    gridLineColor() {
      return this.$vuetify.theme.isDark ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.15)';
    }
  }
};