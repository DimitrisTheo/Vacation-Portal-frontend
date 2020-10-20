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
        <b-form-group label="Date From" label-for="input-1">
          <b-form-datepicker id="input-1" required v-model="form.date_from" />
        </b-form-group>
        <b-form-group label="Date To" label-for="input-2">
          <b-form-datepicker id="input-2" required v-model="form.date_to" />
        </b-form-group>
        <b-form-group label="Reason" label-for="input-3">
          <b-form-textarea id="input-3" v-model="form.reason" name="email" />
        </b-form-group>

        <b-button type="submit" variant="primary">{{header}}</b-button>
        <b-button type="reset" variant="danger" class="mx-2">Reset</b-button>

        <b-form-group>
          <div v-if="message" class="alert alert-danger mt-2" role="alert">{{message}}</div>
        </b-form-group>
      </b-form>
      <b-form v-else>
        <div class="alert alert-success mt-2">Request Submitted Successfully </div>
        <button class="btn btn-success" @click="$router.push('/home')">&nbsp;Go back to submissions list</button>
      </b-form>

    </b-card>

  </div>
</template>

<script>
import http from "@/services/api";

export default {
  name: "SubmitRequest",
  props: ['header'],
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      form: {
        date_from: null,
        date_to: null,
        reason: null
      },
      submitted: false,
      message: ''
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let data = {
        date_from: this.form.date_from,
        date_to: this.form.date_to,
        reason: this.form.reason,
        user_id: this.currentUser.id
      };
      let url = '/submitRequest';
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
      this.form = {};
      this.$nextTick(() => { this.submitted = false })
    }
  },
  beforeMount() {
    //not access if not employee
    if (this.currentUser.user_type !== "employee")
      this.$router.push('/404')

  }
}
</script>

<style scoped>

</style>