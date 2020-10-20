<template>
  <div class="container text-center col-lg-8">
    <b-card
        border-variant="dark"
        :header="header"
        header-border-variant="info"
        header-text-variant="info"
        header-class="h4"
    >
      <b-form @submit="onSubmit" v-if="!submitted" class="col-md-8 mx-auto font-weight-bold">
        <b-form-group label="First Name" label-for="input-1">
          <b-form-input id="input-1" type="text" required v-model="form.first_name" name="firstName" />
        </b-form-group>
        <b-form-group label="Last Name" label-for="input-2">
          <b-form-input id="input-2" type="text" required v-model="form.last_name" name="lastName" />
        </b-form-group>
        <b-form-group label="Email" label-for="input-3">
          <b-form-input id="input-3" type="email" required v-model="form.email" name="email" />
        </b-form-group>
        <b-form-group label="Password" label-for="input-4">
          <b-form-input id="input-4" type="password" required v-model="form.password" name="password" />
        </b-form-group>
        <b-form-group label="Confirm Password" label-for="input-5">
          <b-form-input id="input-5" type="password" required v-model="form.confirm_password" name="confirmPassword" />
        </b-form-group>
        <b-form-group label="User Type">
          <b-form-select v-model="form.user_type" :options="userTypes" required>
          </b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary">Update User</b-button>

        <b-form-group>
          <div v-if="message" class="alert alert-danger mt-2" role="alert">{{message}}</div>
        </b-form-group>
      </b-form>
      <b-form v-else>
        <div class="alert alert-success mt-2">User Updated Successfully </div>
          <button class="btn btn-success" @click="$router.push('/admin')">&nbsp;Go back to Admin Page</button>
      </b-form>

    </b-card>

  </div>

</template>

<script>
import http from "@/services/api";

export default {
  name: "UpdateUser",
  props: ['header', 'user'],
  data(){
    return{
      message: '',
      form: {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
        password: null,
        confirm_password: null,
        user_type: this.user.user_type,
      },
      userTypes: [
        { value: 'admin', text: 'Admin' },
        { value: 'employee', text: 'Employee' },
      ],
      submitted: false
    }
  },
  beforeMount() {
    // console.log(this.user.id)
  },
  methods:{
    onSubmit(evt) {
      evt.preventDefault();
      if (this.form.password !== this.form.confirm_password){
        this.message = "Password was not confirmed!";
        return ;
      }
      let data = {
        id: this.user.id,
        first_name: this.form.first_name,
        last_name: this.form.last_name,
        email: this.form.email,
        password: this.form.password,
        user_type: this.form.user_type,
        action: 'update'
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
    }
  }
}
</script>

<style scoped>

</style>