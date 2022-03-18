<script>
  import { Bar, mixins } from 'vue-chartjs';
  import chartsMixin from '@/mixins/charts';

  export default {
    name: 'bar-chart',
    extends: Bar,
    mixins: [ mixins.reactiveProp, chartsMixin ],
    props: {
      chartData: { type: Object, default: () => {}, required: false }
    },
    watch: {
      '$vuetify.theme.isDark'() {
        this.initiate();
      }
    },
    methods: {
      initiate() {
        this.renderChart(this.chartData, {
          ...this.defaultOptions,
          legend: {
            ...this.defaultOptions.legend,
            display: false
          }
        });
      }
    },
    mounted() {
      this.initiate();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>