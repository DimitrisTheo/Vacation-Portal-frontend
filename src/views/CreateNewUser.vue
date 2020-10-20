<template>
  <div class="container text-center col-lg-8">
    <b-card
        border-variant="dark"
        :header="header"
        header-border-variant="info"
        header-text-variant="info"
        header-class="h4"
    >
      <b-form @submit="onSubmit" @reset="onReset" v-if="!submitted" class="col-md-8 mx-auto font-weight-bold">
        <b-form-group label="First Name" label-for="input-1">
          <b-form-input id="input-1" type="text" required v-model="user.first_name" name="firstName" />
        </b-form-group>
        <b-form-group label="Last Name" label-for="input-2">
          <b-form-input id="input-2" type="text" required v-model="user.last_name" name="lastName" />
        </b-form-group>
        <b-form-group label="Email" label-for="input-3">
          <b-form-input id="input-3" type="email" required v-model="user.email" name="email" />
        </b-form-group>
        <b-form-group label="Password" label-for="input-4">
          <b-form-input id="input-4" type="password" required v-model="user.password" name="password" />
        </b-form-group>
        <b-form-group label="Confirm Password" label-for="input-5">
          <b-form-input id="input-5" type="password" required v-model="user.confirm_password" name="confirmPassword" />
        </b-form-group>
        <b-form-group label="User Type">
          <b-form-select v-model="user.user_type" :options="userTypes" required>
            <template #first>
              <b-form-select-option :value="null" disabled>-- Please select an option --</b-form-select-option>
            </template>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Create User</b-button>
        <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>

        <b-form-group>
          <div v-if="message" class="alert alert-danger mt-2" role="alert">{{message}}</div>
        </b-form-group>
      </b-form>
      <b-form v-else>
        <div class="alert alert-success mt-2">User Saved Successfully </div>
        <button class="btn btn-success" @click="onReset">&nbsp;Create New User</button>
      </b-form>

    </b-card>

  </div>
</template>

<script>
import http from "../services/api";

export default {
  name: "CreateNewUser",
  props: ['header'],
  data() {
    return {
      user: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
        confirm_password: null,
        user_type: null,
      },
      userTypes: [
        { value: 'admin', text: 'Admin' },
        { value: 'employee', text: 'Employee' },
      ],
      submitted: false,
      message: ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      if (this.user.password !== this.user.confirm_password){
        this.message = "Password was not confirmed!";
        return ;
      }
      let data = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: this.user.password,
        user_type: this.user.user_type,
        action: 'create'
      };
      let url = '/createUser';
      http.post(url, data)
        .then(response => {
          this.submitted = response.data.message;
          console.log(response.data.message);
        })
        .catch( error => {
          console.log(error.response);
          this.message = (error.response.data.error) || error.response.statusText;
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.message = '';
      this.user = {};
      this.$nextTick(() => { this.submitted = false })
    }
  }
}
</script>

<style scoped>

</style>