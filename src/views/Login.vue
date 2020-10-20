<template>
  <div class="container col-md-6">
    <h1>Welcome to Vacation Portal</h1>
    <b-card class="mt-5">
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-input
            id="input-1"
            class="mb-2"
            v-model="user.email"
            type="email"
            required
            placeholder="Enter email"
        ></b-form-input>

        <b-form-input
            id="input-2"
            class="mb-2"
            v-model="user.password"
            type="password"
            required
            placeholder="Enter your password"
          ></b-form-input>
        <b-button class="mr-2" type="submit" variant="primary">Sign-in</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>

        <div class="form-group mt-2">
          <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: "Login",
  data() {
    return {
      user: new User.constructor('', ''),
      message: ''
    };
  },
  computed: {
    alreadyLoggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  created() {
    if (this.alreadyLoggedIn) {
      if (this.currentUser.user_type === 'admin')
        this.$router.push('/admin');
      else this.$router.push('/home');
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("auth/login", this.user)
      .then((response) => {
        if (response.user_type === 'admin') {
          this.$router.push('/admin');
        }
        else this.$router.push('/home');
      })
      .catch( error => {
        this.message = (error.response.data.error) || error.response.statusText;
      });

      // axios.post('/', {
      //   "email": this.user.email,
      //   "password": this.user.password
      // })
      // .then(response => {
      //   // if (response.data.token) {
      //   //   console.log("response token  = " + response.data.token);
      //   //   localStorage.setItem('user', JSON.stringify(response.data));
      //   //   console.log(JSON.parse(localStorage.getItem('user')));
      //   // }
      //   console.log(typeof response.data);
      // })
      // .catch( error => {
      //   this.message =
      //       (error.response.data.message) || error.response.statusText;
      // });
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.user = new User.constructor('', '');
    }
  }
}
</script>

<style scoped>

</style>