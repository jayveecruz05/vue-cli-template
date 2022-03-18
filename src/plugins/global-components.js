'use strict';

import Vue from 'vue';

// App Date Picker
import AppDatePicker from '@/components/Tools/AppDatePicker';
Vue.component(AppDatePicker.name, AppDatePicker);

// Bar Chart
import BarChart from '@/components/Tools/Charts/Bar';
Vue.component(BarChart.name, BarChart);

// Line Chart
import LineChart from '@/components/Tools/Charts/Line';
Vue.component(LineChart.name, LineChart);

// Pie Chart
import PieChart from '@/components/Tools/Charts/Pie';
Vue.component(PieChart.name, PieChart);

export default Vue;