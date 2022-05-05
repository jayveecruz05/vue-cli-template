<template>
  <v-container id="dashboard-module" fluid>
    <v-row class="fill-height flex-column flex-nowrap align-start">
      <v-col class="pa-0" cols="12">
        <v-row>
          <v-col md="auto" cols="12">
            <v-toolbar-title class="headline">Dashboard</v-toolbar-title>
          </v-col>
        </v-row>
      </v-col>
      
      <v-col class="pa-0 pt-5" cols="12">
        <v-row>
          <v-col v-for="(item, name) in profiles" :key="(name)" class="py-0 pb-4" md="3" cols="12">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-card color="primaryBackgroundColor" v-on="on" flat>
                  <!-- <v-skeleton-loader v-if="(item.quantity == 0)" type="list-item-avatar-two-line" :boilerplate="false" width="100%"/> -->
                  <v-list-item class="py-2">
                    <v-list-item-avatar>
                      <v-img :src="require(`@/assets/img/${item.avatar}`)" :lazy-src="require(`@/assets/img/${item.avatar}`)"/>
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title class="headline">
                        <number :from="0" :to="item.quantity" :duration="1" :delay="0"/>
                      </v-list-item-title>
                      <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </template>
              <span>{{ item.text }}</span>
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row>
          <v-col class="py-0 pb-4" md="6" cols="12">
            <v-card class="fill-height" color="primaryBackgroundColor" flat>
              <v-toolbar height="auto" flat color="primaryBackgroundColor">
                <v-card-title class="pl-1 py-2">Today's Profile Statuses</v-card-title>
              </v-toolbar>
              <v-divider/>
              <v-card-text class="pa-0">
                <v-data-table class="no-loading-bar" :headers="profileStatusDataTable.headers" :items="profileStatusDataTable.data" :loading="(profileStatusDataTable.loading)" loader-height="0" :page.sync="profileStatusDataTable.currentPage" :items-per-page.sync="profileStatusDataTable.itemLength" hide-default-footer>
                  <template v-slot:[`item.date_time`]="{ item }">
                    <span>{{ `${(new Date(item.date_time) != 'Invalid Date') ? `${new Date(item.date_time).toDateString()}, ${new Date(item.date_time).toLocaleTimeString()}` : ''}` }}</span>
                  </template>

                  <template v-slot:[`item.status`]="{ item }">
                    <v-chip v-if="item.status == 1" label color="green lighten-5" class="green--text text-capitalize">Feeling Well</v-chip> <!-- {{ item.status.toLowerCase() }} -->
                    <v-chip v-else-if="item.status == 2" label color="red lighten-5" class="red--text text-capitalize">Not Feeling Well</v-chip>
                    <v-chip v-else label class="text-capitalize">No Status</v-chip>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col class="py-0 pb-4" md="6" cols="12">
            <v-card class="fill-height" color="primaryBackgroundColor" flat>
              <v-toolbar height="auto" flat color="primaryBackgroundColor">
                <v-card-title class="pl-1 py-2">Today's profile By Location</v-card-title>
              </v-toolbar>
              <v-divider/>
              <v-card-text class="pa-0">
                <v-data-table class="no-loading-bar" :headers="profileLocationDataTable.headers" :items="profileLocationDataTable.data" :loading="(profileLocationDataTable.loading)" loader-height="0" :page.sync="profileLocationDataTable.currentPage" :items-per-page.sync="profileLocationDataTable.itemLength" hide-default-footer>
                  <template v-slot:[`item.count`]="{ item }">
                    <v-container fluid>
                      <v-row align="center">
                        <v-col class="pa-0 pr-4">
                          <v-progress-linear :value="((item.count / item.limit) * 100)" rounded height="10px" background-color="#ECEFF5" color="#52BEEA"/>
                        </v-col>
                        <v-col class="pa-0">
                          <span>{{ item.count }}/{{ item.limit }}</span>
                        </v-col>
                      </v-row>
                    </v-container>
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col md="6" cols="12">
            <v-card flat color="primaryBackgroundColor">
              <v-card-text>
                <bar-chart :chart-data="chart.data"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col md="6" cols="12">
            <v-card flat color="primaryBackgroundColor">
              <v-card-text>
                <pie-chart :chart-data="chart.data"/>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-card flat color="primaryBackgroundColor">
              <v-card-text>
                <line-chart :chart-data="chart.data"/>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'dashboard-module',
    metaInfo: {
      title: 'Dashboard'
    },
    data() {
      return {
        profiles: {
          registeredProfiles: { avatar: 'registered-profiles.svg', text: 'Registered Profiles', quantity: 500 },
          feelingWellProfiles: { avatar: 'feeling-well-profiles.svg', text: 'Feeling Well Profiles', quantity: 450 },
          notFeelingWellProfiles: { avatar: 'not-feeling-well-profiles.svg', text: 'Not-Feeling Well Profiles', quantity: 40 },
          noStatusProfiles: { avatar: 'no-status-profiles.svg', text: 'No Status Profiles', quantity: 10 }
        },
        profileStatusDataTable: {
          loading: true,
          itemLength: 10,
          currentPage: 1,
          headers: [
            { text: 'First Name', value: 'first_name' },
            { text: 'Last Name', value: 'last_name' },
            { text: 'Tenant', value: 'tenant' },
            { text: 'Location', value: 'location' },
            { text: 'Status', value: 'status' },
            {
              text: 'Date & Time',
              value: 'date_time',
              sort: (a, b) => {
                if (new Date(a) < new Date(b)) { return 1; }
                if (new Date(a) > new Date(b)) { return -1; }
                return 0;
              }
            }
          ],
          data: [
            { profile_id: 'P1', first_name: 'John', last_name: 'Doe', tenant: 'Yondu, Inc.', location: 'Panorama Tower', status: 1, date_time: '05/24/2020 14:13:00' },
            { profile_id: 'P2', first_name: 'Jane', last_name: 'Doe', tenant: 'Yondu, Inc.', location: 'Panorama Tower', status: 2, date_time: '04/27/2020 17:13:00' },
            { profile_id: 'P3', first_name: 'Richard', last_name: 'Doe', tenant: 'Yondu, Inc.', location: 'Panorama Tower', status: 1, date_time: '03/25/2020 12:13:00' },
            { profile_id: 'P4', first_name: 'Janie', last_name: 'Doe', tenant: 'Yondu, Inc.', location: 'Panorama Tower', status: 3, date_time: '03/25/2020 11:13:00' },
          ] || []
        },
        profileLocationDataTable: {
          loading: true,
          itemLength: 10,
          currentPage: 1,
          headers: [
            { text: 'Tenant', value: 'tenant' },
            { text: 'Location', value: 'location' },
            { text: 'Count Limit', value: 'count' }
          ],
          data: [
            { location_id: 'L1', tenant: 'Yondu, Inc.', location: 'Panorama Tower', count: 432, limit: 1000 },
            { location_id: 'L2', tenant: 'GLobe', location: 'TGT Tower', count: 321, limit: 500 }
          ] || []
        },
        chart: {
          data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 4, 3],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
          }
        }
      };
    },
    methods: {},
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>