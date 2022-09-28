<template>
  <v-container id="users-module" class="pb-7" fluid>
    <v-row class="fill-height flex-column flex-nowrap align-start">
      <v-col class="pa-0" cols="12">
        <v-row>
          <v-col md="auto" cols="12">
            <v-toolbar-title class="headline">Users</v-toolbar-title>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="pa-0" cols="12">
        <v-row>
          <v-col md="3" lg="3" cols="12">
            <v-text-field v-model="dataTable.filter.search" label="Search" placeholder="Search" append-icon="search" solo dense flat color="primary" clearable hide-details/>
          </v-col>
          <v-col md="2" cols="12">
            <v-select v-model="dataTable.filter.status" :items="dataTable.filter.statusList" label="Status" placeholder="Status" solo dense flat color="primary" background-color="primaryBackgroundColor" clearable hide-details/>
          </v-col>
          <v-col md="2" cols="12">
            <v-select v-model="dataTable.filter.role" :items="dataTable.filter.roleList" label="Role" placeholder="Role" solo dense flat color="primary" background-color="primaryBackgroundColor" clearable hide-details/>
          </v-col>
          <v-col md="3" cols="12">
            <app-date-picker v-model="dataTable.filter.dates" label="Select Dates" placeholder="Select Dates" min="1950-01-01" :max="new Date().toISOString().substr(0, 10)" solo range-menu clearable hide-details />
          </v-col>
          <v-spacer/>
          <v-col md="auto" lg="auto" cols="12">
            <v-btn class="primaryTextColor--text" depressed block color="primary" @click="action({ action: 'add' })"><v-icon left>add</v-icon>Add User</v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-col class="d-flex flex-column flex-grow-1 py-0" cols="12">
        <v-data-table class="custom-table-ui no-loading-bar" v-model="dataTable.selected" :show-select="false" item-key="user_id" :headers="dataTable.headers" :items="dataTable.data" :loading="(dataTable.loading)" loader-height="0" loading-text="Loading data..." :page.sync="dataTable.filter.currentPage" :items-per-page.sync="dataTable.filter.itemLength" :sort-by.sync="dataTable.filter.sortBy" :sort-desc.sync="dataTable.filter.sortOrder" :custom-sort="(items) => (items)" hide-default-footer>
          <template v-slot:[`item.user_name`]="{ item }">
            <td class="sticky left">{{ item.user_name }}</td>
          </template>

          <template v-slot:[`item.mobile_number`]="{ item }">
            <span>{{ `+63${item.mobile_number}` }}</span>
          </template>

          <template v-slot:[`item.confirmed`]="{ item }">
            <v-chip v-if="(item.confirmed)" label color="green lighten-5" class="green--text text-capitalize">Yes</v-chip>
            <v-chip v-else label color="red lighten-5" class="red--text text-capitalize">No</v-chip>
          </template>

          <template v-slot:[`item.roles`]="{ item }">
            <span v-for="(value, key) in item.roles" :key="key">{{ `${value}${((key + 1) != item.roles.length) ? ', ' : ''}` }}</span>
          </template>

          <template v-slot:[`item.last_update`]="{ item }">
            <span>{{ `${(new Date(item.last_update) != 'Invalid Date') ? `${new Date(item.last_update).toDateString()}, ${new Date(item.last_update).toLocaleTimeString()}` : ''}` }}</span>
          </template>

          <template v-slot:[`item.status`]="{ item }">
            <p :class="['status', `${item.status}`, 'ma-0']">
              <span class="bullet">&bull;</span>
              <span class="text">{{ item.status }}</span>
            </p>
          </template>

          <template v-slot:[`item.actions`]="{ item }">
            <td class="actions sticky right text-right text-sm-center pa-0" :style="{ '--right': '0' }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2" small v-on="on" @click="action({ action: 'view', data: item })">mdi-eye</v-icon>
                </template>
                <span>View</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2" small v-on="on" @click="action({ action: 'edit', data: item })">mdi-pencil</v-icon>
                </template>
                <span>Edit</span>
              </v-tooltip>

              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon class="mr-2" small v-on="on" @click="confirmAction({ message: 'Are you sure you want to delete', buttonText: 'delete', buttonBGColor: '#EB5757', action: 'delete', data: item, callBack: () => { action({ action: 'delete', data: item }) } })">mdi-delete</v-icon>
                </template>
                <span>Delete</span>
              </v-tooltip>

              <v-menu min-width="160px">
                <template v-slot:activator="{ on: menu, attrs }">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on: tooltip }">
                      <v-icon small v-bind="attrs" v-on="{ ...tooltip, ...menu }">mdi-dots-vertical</v-icon>
                    </template>
                    <span>More</span>
                  </v-tooltip>
                </template>

                <v-list>
                  <v-list-item dense link>Change Password</v-list-item>
                  <v-list-item dense link>Deactivate</v-list-item>
                  <v-list-item dense link>Force Details Update</v-list-item>
                </v-list>
              </v-menu>
            </td>
          </template>
        </v-data-table>

        <!-- <v-spacer/> -->

        <v-card class="data-table-footer d-flex align-center justify-space-between flex-wrap border-radius-10 py-0" flat color="primaryBackgroundColor">
          <div class="flex-md-grow-0 flex-sm-grow-0 flex-grow-1 d-flex align-center justify-center py-2 px-3">
            <span>Show</span>
            <v-select class="item-length" v-model="dataTable.filter.itemLength" :items="[10, 20, 50, 100]" solo dense flat color="primary" background-color="secondaryBackgroundColor" hide-details/>
            <span class="px-0" md="auto" sm="auto" cols="auto">per page</span>
          </div>
          <v-pagination v-if="(dataTable.totalPages > 0)" class="flex-md-grow-0 flex-sm-grow-0 flex-grow-1 justify-center py-2" v-model="dataTable.filter.currentPage" :length="dataTable.totalPages" :total-visible="7"></v-pagination>
        </v-card>
      </v-col>
    </v-row>

    <user-form v-bind="userForm" @close="userForm = { ...userForm, show: false, data: {} }"/>

    <app-confirm v-model="confirmDialog.show" v-bind="confirmDialog">
      <p class="font-size-14 ma-0">{{ confirmDialog.message }} {{ `${(confirmDialog.data) ? `"${confirmDialog.data.user_name}"?` : 'this user?'}` }}</p>
    </app-confirm>
  </v-container>
</template>

<script>
  import UserForm from './Forms/UserForm';

  export default {
    name: 'users-module',
    metaInfo: {
      title: 'Users'
    },
    components: {
      UserForm
    },
    data() {
      return {
        dataTable: {
          headers: [
            { text: 'User Name', value: 'user_name', class: 'sticky left' },
            { text: 'Full Name', value: 'full_name', sort: (a, b) => String(a).localeCompare(String(b)) },
            { text: 'Mobile Number', value: 'mobile_number' },
            { text: 'Email Address', value: 'email' },
            { text: 'Confirmed', value: 'confirmed' },
            { text: 'Roles', value: 'roles' },
            {
              text: 'Last Update',
              value: 'last_update',
              sort: (a, b) => {
                if (new Date(a) < new Date(b)) { return 1; }
                if (new Date(a) > new Date(b)) { return -1; }
                return 0;
              }
            },
            // { text: 'Status', value: 'status' },
            { text: '', value: 'actions', class: 'sticky right', sortable: false, width: '130px' },
          ],
          data: [
            { user_id: 'U1', user_name: 'john', first_name: 'John', last_name: 'Doe', email: 'johndoe@yahoo.com', confirmed: true, mobile_number: '9112233445', roles: ['Super Admin', 'Admin'], last_update: '05/24/2020 14:13:00' },
            { user_id: 'U2', user_name: 'jane', first_name: 'Jane', last_name: 'Doe', email: 'janedoe@yahoo.com', confirmed: false, mobile_number: '9667788990', roles: ['Admin'], last_update: '04/27/2018 17:13:00' },
            { user_id: 'U3', user_name: 'richard', first_name: 'Richard', last_name: 'Doe', email: 'richarddoe@yahoo.com', confirmed: true, mobile_number: '9123124562', roles: ['Super Admin', 'Admin'], last_update: '03/25/2020 12:13:00' },
            { user_id: 'U4', user_name: 'janie', first_name: 'Janie', last_name: 'Doe', email: 'janiedoe@yahoo.com', confirmed: false, mobile_number: '9109283081', roles: ['Admin'], last_update: '03/25/2019 11:13:00' },
          ],
          loading: true,
          selected: [],
          totalPages: 1,
          filter: {
            search: this.$route.query?.search || '',
            statusList: ['active', 'deactivated', 'deleted'],
            status: this.$route.query?.status || '',
            roleList: ['Administrator', 'User', 'Agent', 'Arena Admin', 'Report Admin', 'CMS Admin', 'Agent Admin', 'User Admin', 'Declare Admin', 'Declare Confirmation Admin', 'Loading Admin', 'Finance Admin', 'CSR', 'Draw Admin', 'Support'],
            role: this.$route.query?.role || '',
            dates: (this.$route.query?.startDate && this.$route.query?.endDate) ? [this.$route.query.startDate, this.$route.query.endDate] : null,
            itemLength: parseInt(this.$route.query?.itemLength) || 10,
            currentPage: parseInt(this.$route.query?.currentPage) || 1,
            sortBy: (this.$route.query?.sortBy) ? [this.$route.query.sortBy] : [],
            sortOrder: (this.$route.query?.sortOrder) ? [this.$route.query.sortOrder === 'desc'] : []
          }
        },
        userForm: { show: false, action: '', data: {} }
      };
    },
    computed: {
      usersList() { return this.$store.getters['users/getUsersList']; },
      dataTableFilter() {
        const { search, status, role, dates, itemLength, currentPage, sortBy, sortOrder } = this.dataTable.filter;
        return {
          search: search || undefined,
          status: status || undefined,
          role: role || undefined,
          startDate: (dates && Array.isArray(dates) && dates.length == 2) ? dates[0] : undefined,
          endDate: (dates && Array.isArray(dates) && dates.length == 2) ? dates[1] : undefined,
          itemLength,
          currentPage,
          sortBy: sortBy[0],
          sortOrder: ((sortOrder[0] != undefined) ? ((!sortOrder[0]) ? 'asc' : 'desc') : undefined)
        };
      }
    },
    watch: {
      usersList(to) {
        // console.log(to);
        if (to) {
          this.dataTable.loading = false;
          this.dataTable.data = to.data;
          window.scrollTo(0, 0);
        }
      },
      'dataTable.filter': {
        deep: true,
        handler() { this.setUrlFilter(); }
      },
      'dataTable.filter.search'() {
        clearTimeout(this.searchTimeout);
        this.searchTimeout = setTimeout(() => {
          this.dataTable.filter.currentPage = 1;
          this.getData();
        }, 300);
      },
      'dataTable.filter.itemLength'() {
        this.dataTable.filter.currentPage = 1;
        this.getData();
      },
      'dataTable.filter.currentPage'() {
        this.getData();
      },
      'dataTable.filter.sortBy'() {
        const sortBy = this.dataTable.filter.sortBy[0],
              sortOrder = this.dataTable.filter.sortOrder[0];
        if (sortBy != undefined && sortOrder != undefined && sortOrder != true) {
          // console.log('sortBy');
          // console.log({ sortBy, sortOrder });
          this.getData();
        } else if (sortBy == undefined && sortOrder == undefined) {
          this.getData();
        }
      },
      'dataTable.filter.sortOrder'() {
        const sortBy = this.dataTable.filter.sortBy[0],
              sortOrder = this.dataTable.filter.sortOrder[0];
        if (sortBy != undefined && sortOrder != undefined) {
          // console.log('sortOrder');
          // console.log({ sortBy, sortOrder });
          this.getData();
        } else if (sortBy == undefined && sortOrder == undefined) {
          this.getData();
        }
      }
    },
    methods: {
      initiate() {
        this.setUrlFilter();
        // this.getData();
        this.dataTable.data = this.dataTable.data.map((details) => ({ ...details, full_name: `${details.first_name} ${details.last_name}` }));
      },
      getData() {
        this.$api.main.cancelCurrentApiCall(this.userApiCancelToken);
        this.userApiCancelToken = this.generateApiCancelToken();
        this.dataTable.loading = true;
        const { search, itemLength, currentPage, sortBy, sortOrder } = this.dataTableFilter;
        this.$store.dispatch('users/fetchUsers', {
          config: {
            params: {
              search,
              limit: itemLength,
              page: currentPage,
              sortBy,
              sortOrder
            }
          },
          apiCancelToken: this.userApiCancelToken
        }).then(
          (response) => {
            this.$notify({
              group: 'app-notifications',
              type: 'success',
              title: 'Users',
              text: response.message
            });
          }
        ).catch(
          (error) => {
            // console.log(error.response);
            this.dataTable.loading = false;
            let text = [];

            if (error.response.data.errors) {
              error.response.data.errors.forEach((item) => {
                // console.log(item);
                for (let value in item) {
                  // console.log(item[value][0]);
                  text = [ ...text, `${item[value][0]} <br/>` ];
                }
              });
            }

            this.$notify({
              group: 'app-notifications',
              type: 'error',
              duration: 5000,
              title: 'Users',
              text: (text.length > 0) ? text.toString().replace(/,/ig, '') : error.response.data.message || error.response.statusText
            });
          }
        );
      },
      setUrlFilter() {
        this.$router.replace({ query: { ...this.$route.query, ...this.dataTableFilter } });
      },
      action({ action, data }) {
        // console.log(action, data);
        switch (action) {
          case 'add':
            this.userForm = { show: true, action };
            break;
          case 'view':
          case 'edit':
            this.userForm = { show: true, action, data }
            break;
          case 'delete':
            this.confirmDialog.loading = true;
            setTimeout(() => { this.confirmDialog.show = false; }, 1000);
            break;
        }
      }
    },
    created() {
      this.initiate();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>