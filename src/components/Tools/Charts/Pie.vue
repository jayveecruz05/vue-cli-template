<script>
  import { Pie, mixins } from 'vue-chartjs';
  import chartsMixin from '@/mixins/charts';

  export default {
    name: 'pie-chart',
    extends: Pie,
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
          scales: undefined,
          legend: {
            ...this.defaultOptions.legend,
            position: 'bottom'
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