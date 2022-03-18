<template>
  <v-dialog v-model="dialog" scrollable max-width="840" color="primaryBackgroundColor" transition="scroll-y-reverse-transition" :fullscreen="$vuetify.breakpoint.xsOnly" persistent>
    <v-card id="user-form">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-icon class="dialog-close" v-on="on" :disabled="(formData.loading)" @click="dialog = false">close</v-icon>
        </template>
        <span>Close</span>
      </v-tooltip>
      <v-card-title class="font-weight-bold">
        <span>{{ `${((action == 'view') ? 'View' : (action == 'edit') ? 'Edit' : 'New')}` }} User</span>
        <!-- <v-tabs v-model="tab" color="primaryTextColor">
          <v-tab class="text-capitalize">Details</v-tab>
          <v-tab class="text-capitalize">Roles</v-tab>
        </v-tabs> -->
      </v-card-title>
      <v-card-text class="pt-7 px-2">
        <v-form v-model="formData.status" ref="formData">
          <!-- <v-tabs-items v-model="tab" class="pt-3">
            <v-tab-item> -->
              <v-row>
                <v-col cols="12" class="py-0">
                  <v-text-field v-model="formData.user_name" label="User Name" autocomplete="off" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required]" :disabled="(action == 'view' || formData.loading)"/>
                </v-col>
                <v-col md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.first_name" label="First Name" autocomplete="off" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required]" :disabled="(action == 'view' || formData.loading)" @keypress="$validate.lettersOnly"/>
                </v-col>
                <v-col md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.last_name" label="Last Name" autocomplete="off" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required]" :disabled="(action == 'view' || formData.loading)" @keypress="$validate.lettersOnly"/>
                </v-col>
                <v-col md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.mobile_number" label="Mobile Number" autocomplete="off" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required, $validate.rules.mobileNumber]" :disabled="(action == 'view' || formData.loading)" type="tel" prefix="+63" maxlength="10" counter="10" @keypress="$validate.numbersOnly"/>
                </v-col>
                <v-col md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.email" label="Email" autocomplete="off" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required, $validate.rules.email]" :disabled="(action == 'view' || formData.loading)"/>
                </v-col>
                <v-col v-if="(action == 'add')" md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.password" label="Password" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required]" :disabled="(formData.loading)" :type="((showPassword) ? 'text' : 'password')" :append-icon="((showPassword) ? 'mdi-eye' : 'mdi-eye-off')" @click:append="showPassword = !showPassword"/>
                </v-col>
                <v-col v-if="(action == 'add')" md="6" cols="12" class="py-0">
                  <v-text-field v-model="formData.confirm_password" label="Confirm Password" color="primaryTextColor" flat outlined dense clearable :rules="[$validate.rules.required]" :error-messages="((formData.password && formData.confirm_password) && (formData.confirm_password != formData.password)) ? 'Passwords don\'t match.' : ''" :disabled="(formData.loading)" :type="((showConfrimPassword) ? 'text' : 'password')" :append-icon="((showConfrimPassword) ? 'mdi-eye' : 'mdi-eye-off')" @click:append="showConfrimPassword = !showConfrimPassword"/>
                </v-col>
                <v-col cols="12" class="py-0">
                  <v-select v-model="formData.roles" :items="roleList" label="Roles" color="primaryTextColor" flat outlined multiple small-chips deletable-chips hide-selected clearable :menu-props="{ top: true, offsetY: true }" :rules="[$validate.rules.requiredList]" :disabled="(action == 'view' || formData.loading)">
                    <template v-slot:selection="{ item, parent, selected }">
                      <v-chip :input-value="selected" label small class="white--text" color="primary" @click.native.stop>
                        <span class="pr-2">{{ item }}</span>
                        <v-icon small right @click="parent.selectItem(item)">mdi-close</v-icon>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
                <v-col md="6" cols="12" class="py-0">
                  <v-select v-model="formData.sites" :items="siteList" label="Sites" color="primaryTextColor" flat outlined multiple small-chips deletable-chips hide-selected clearable :menu-props="{ top: true, offsetY: true }" :rules="[$validate.rules.requiredList]" :disabled="(action == 'view' || formData.loading)">
                    <template v-slot:selection="{ item, parent, selected }">
                      <v-chip :input-value="selected" label small class="white--text" color="primary" @click.native.stop>
                        <span class="pr-2">{{ item }}</span>
                        <v-icon small right @click="parent.selectItem(item)">mdi-close</v-icon>
                      </v-chip>
                    </template>
                  </v-select>
                </v-col>
                <!-- <v-col md="3" cols="12" class="py-0 mb-7">
                  <v-switch v-model="formData.active" class="mt-0 ml-1" inset label="Active" :disabled="(action == 'view' || formData.loading)" hide-details/>
                </v-col>
                <v-col md="3" cols="12" class="py-0 mb-7">
                  <v-switch v-model="formData.confirmed" class="mt-0 ml-1" inset label="Confirmed" :disabled="(action == 'view' || formData.loading)" hide-details/>
                </v-col> -->
                <v-col md="6" cols="12" class="py-0">
                  <v-select v-model="formData.commission" :items="Array.from({length: 99}, (_, i) => `${i + 1}%`)" label="Percent Commission (Optional)" color="primaryTextColor" flat outlined clearable :disabled="(action == 'view' || formData.loading)"/>
                </v-col>
              </v-row>
            <!-- </v-tab-item>
            <v-tab-item></v-tab-item>
          </v-tabs-items> -->
        </v-form>
      </v-card-text>

      <v-card-actions v-if="(action == 'add' || action == 'edit')" class="pa-0">
        <v-row align="center" justify="end" class="py-1 px-2">
          <!-- <v-col md="2" cols="12" class="px-2">
            <v-btn text block @click="clearForm" :disabled="(formData.loading)">Clear All</v-btn>
          </v-col> -->
          <v-col md="2" cols="12" class="px-2">
            <v-btn block depressed dark color="#376BFA" :loading="(formData.loading)" @click="addUpdate">{{ `${(action == 'edit') ? 'Update' : 'Add'}` }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    name: 'user-form',
    props: {
      show: { type: Boolean, default: false, required: true },
      action: { type: String, default: '' },
      data: { type: Object, default: new Object() }
    },
    data() {
      return {
        tab: '',
        dialog: this.show,
        showPassword: false,
        showConfrimPassword: false,
        roleList: ['Administrator', 'User', 'Agent', 'Arena Admin', 'Report Admin', 'CMS Admin', 'Agent Admin', 'User Admin', 'Declare Admin', 'Declare Confirmation Admin', 'Loading Admin', 'Finance Admin', 'CSR', 'Draw Admin', 'Support'],
        siteList: ['Site 1', 'Site 2', 'Site 3', 'Site 4', 'Site 5'],
        formData: {
          status: false,
          loading: false,
          user_name: '',
          first_name: '',
          last_name: '',
          mobile_number: undefined,
          email: '',
          // active: true,
          // confirmed: true,
          password: '',
          confirm_password: '',
          roles: [],
          sites: [],
          commission: ''
        }
      };
    },
    computed: {
      mainParent() { return this.getParent('users'); }
    },
    watch: {
      show(to) {
        this.dialog = to;
      },
      data(to) {
        if (Object.keys(to).length > 0) {
          this.formData = { ...this.formData, ...to };
        }
      },
      dialog(to) {
        if (!to) {
          this.clearForm();
          this.$emit('close');
        }
      }
    },
    methods: {
      clearForm() {
        this.$refs.formData.reset();

        // setTimeout(() => {
        //   this.formData = {
        //     status: false,
        //     loading: false,
        //     user_name: '',
        //     first_name: '',
        //     last_name: '',
        //     mobile_number: undefined,
        //     email: '',
        //     active: true,
        //     confirmed: true,
        //     password: '',
        //     confirm_password: '',
        //     roles: [],
        //     sites: [],
        //     commission: ''
        //   };
        // });
      },
      addUpdate() {
        // let formStatus = this.$refs.formData.validate();

        // if (formStatus && this.formData.status && !this.formData.loading) {
        //   this.formData.loading = true;

        //   const { roles, first_name, last_name, mobile_number, password  } = this.formData;

        //   this.$store.dispatch('users/addUser', {
        //     data: {
        //       status: 'active',
        //       roles,
        //       first_name,
        //       last_name,
        //       mobile_number,
        //       password,
        //     }
        //   }).then(
        //     () => {
        //       this.formData.loading = false;
        //       this.dialog = false;
        //     }
        //   ).catch(
        //     (error) => {
        //       console.log(error);
        //       this.formData.loading = false;
        //     }
        //   );
        // }
      }
    },
    mounted() {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped></style>