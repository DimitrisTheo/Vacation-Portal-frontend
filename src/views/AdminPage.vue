<template>
  <div class="text-center">
    <b-jumbotron style=" max-height: 5vh">
      <h2>Welcome Admin</h2>
    </b-jumbotron>
    <b-button to="/createNewUser" class="my-3" type="button" variant="primary">
      Create New User
    </b-button>

    <div v-if="!users">
      <h4>No Users available at the moment!
      Press the button to create the first!</h4>
    </div>
    <div v-else>
      <b-card
          border-variant="dark"
          header="List of Users"
          header-border-variant="info"
          header-text-variant="info"
          header-class="h4"
      >
        <b-table caption-top head-row-variant="primary"
                 responsive="sm" striped hover small outlined fixed
                 :items="users" :fields="fields">

          <template v-slot:cell(edit)="{index}">
            <b-button variant="danger" @click="editUser(index)"
                      v-b-tooltip.hover.right>Edit
            </b-button>
          </template>
        </b-table>

      </b-card>
    </div>


    <div class="col-md-6 mt-2">
      <div v-if="message" class="alert alert-danger" role="alert">{{message}}</div>
    </div>
  </div>
</template>

<script>
import http from "../services/api";

export default {
  name: "AdminPage",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      message: '',
      users: [],
      fields: [
        {key: 'first_name', label: 'First Name'},
        {key: 'last_name', label: 'Last Name'},
        {key: 'email', label: 'Email'},
        {key: 'user_type', label: 'User Type'},
        {key: 'edit', label: ''}
      ],
    }
  },
  beforeMount() {
    // NOT access if not admin
    if (this.currentUser.user_type !== "admin")
      this.$router.push('/404')

    let url = "/users";

    http.get(url)
    .then(response => {
      console.log(response.data.users);
      this.users = response.data.users;
    })
    .catch( error => {
      this.message = (error.response.data.error) || error.response.statusText;
    });
  },
  methods: {
    editUser(index){
      this.$router.push( { name: 'UpdateUser', params: { header : 'Update User', user: this.users[index]}});
    }
  }
}
</script>

<style scoped>

</style>