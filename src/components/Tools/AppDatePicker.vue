<template>
  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="fade-transition" :nudge-bottom="((hideDetails) ? 5 : -20)" :min-width="(!customRange) ? '290px' : undefined" offset-y :disabled="disabled">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field :value="dateText" v-on="on" v-bind="attrs" :label="label" :placeholder="placeholder" append-icon="date_range" dense flat :solo="solo" :outlined="outlined" readonly :clearable="clearable" :rules="rules" :hide-details="hideDetails" :disabled="disabled" @click:clear="onClear" />
    </template>

    <v-fade-transition v-if="menu">
      <v-card color="primaryBackgroundColor">
        <v-card-text class="d-flex flex-wrap pa-0">
          <v-list v-if="(customRange)" class="flex-grow-1" width="150px">
            <v-list-item :input-value="dateRange === 'today'" color="primary" dense @click="changeDateRange('today')">Today</v-list-item>
            <v-list-item :input-value="dateRange === 'yesterday'" color="primary" dense @click="changeDateRange('yesterday')">Yesterday</v-list-item>
            <v-list-item :input-value="dateRange === 'last_7_days'" color="primary" dense @click="changeDateRange('last_7_days')">Last 7 Days</v-list-item>
            <v-list-item :input-value="dateRange === 'last_30_days'" color="primary" dense @click="changeDateRange('last_30_days')">Last 30 Days</v-list-item>
            <v-list-item :input-value="dateRange === 'this_month'" color="primary" dense @click="changeDateRange('this_month')">This Month</v-list-item>
            <v-list-item :input-value="dateRange === 'last_month'" color="primary" dense @click="changeDateRange('last_month')">Last Month</v-list-item>
            <v-list-item :input-value="dateRange === 'custom_range'" color="primary" dense @click="changeDateRange('custom_range')">Custom Range</v-list-item>
          </v-list>
          <v-date-picker :class="['app-date-picker', 'pb-3', { 'flex-grow-1': customRange }]" ref="datePicker" v-model="inputValue" :min="min" :max="max" color="primary" :range="range || customRange" @change="$emit('change', $event); save($event);" />
        </v-card-text>
      </v-card>
    </v-fade-transition>
  </v-menu>
</template>

<script>
  export default {
    name: 'app-date-picker',
    emits: ['clear', 'change', 'input'],
    props: {
      value: { required: false },
      label: { type: String, default: 'Select Date', required: false },
      placeholder: { type: String, default: '', required: false },
      solo: { type: Boolean, default: false, required: false },
      outlined: { type: Boolean, default: false, required: false },
      clearable: { type: Boolean, default: false, required: false },
      rules: { type: Array, default: () => ([]), required: false },
      hideDetails: { type: Boolean, default: false, required: false },
      disabled: { type: Boolean, default: false, required: false },
      min: { type: String, default: '', required: false },
      max: { type: String, default: '', required: false },
      range: { type: Boolean, default: false, required: false },
      customRange: { type: Boolean, default: false, required: false }
    },
    data() {
      return {
        menu: false,
        dateRange: 'custom_range',
        date: this.value || null
      }
    },
    computed: {
      inputValue: {
        get() { return this.date },
        set(newValue) {
          this.date = (newValue && Array.isArray(newValue)) ? newValue.sort((a, b) => (new Date(a) - new Date(b))) : newValue
          if ((!this.range && !this.customRange) || !this.date || ((this.range || this.customRange) && Array.isArray(this.date) && this.date.length === 2)) {
            this.dateRange = 'custom_range';
            this.$emit('input', this.date);
          }
        }
      },
      dateText() {
        const newDateFormat = (this.inputValue) ? ((this.inputValue && Array.isArray(this.inputValue)) ? this.inputValue.map((date) => (new Date(date).toLocaleDateString())).join(' ~ ') : new Date(this.inputValue).toLocaleDateString()) : this.inputValue;
        return newDateFormat;
      }
    },
    watch: {
      value(to) { this.date = to; },
      menu() { this.date = ((!this.range && !this.customRange) || !this.date || ((this.range || this.customRange) && Array.isArray(this.date) && this.date.length === 2)) ? this.date : this.value; }
    },
    methods: {
      changeDateRange(data) {
        this.dateRange = data;
        const today = new Date(),
              yesterday = new Date(new Date().setDate(today.getDate() - 1)),
              last_7_days = new Date(new Date().setDate(today.getDate() - 6)),
              last_30_days = new Date(new Date().setDate(today.getDate() - 29));
        switch (this.dateRange) {
          case 'today':
            this.date = [today.toISOString().slice(0, 10), today.toISOString().slice(0, 10)];
            break;
          case 'yesterday':
            this.date = [yesterday.toISOString().slice(0, 10), yesterday.toISOString().slice(0, 10)];
            break;
          case 'last_7_days':
            this.date = [last_7_days.toISOString().slice(0, 10), today.toISOString().slice(0, 10)];
            break;
          case 'last_30_days':
            this.date = [last_30_days.toISOString().slice(0, 10), today.toISOString().slice(0, 10)];
            break;
          case 'this_month':
            this.date = [new Date(today.getFullYear(), today.getMonth(), 2).toISOString().slice(0, 10), new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().slice(0, 10)];
            break;
          case 'last_month':
            this.date = [new Date(today.getFullYear(), today.getMonth() - 1, 2).toISOString().slice(0, 10), new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10)];
            break;
          default:
            this.date = null;
            break;
        }
        this.$emit('input', this.date);
        this.$emit('change', this.date);
        if (this.dateRange != 'custom_range') { this.save(this.date) }
      },
      onClear() {
        this.inputValue = null;
        this.dateRange = 'custom_range';
        this.$emit('clear');
      },
      save(date) {
        this.$refs.menu.save(date);
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .app-date-picker {
    border-radius: 0;
  }
</style>