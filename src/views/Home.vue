<template>
  <div class="text-center">
    <b-jumbotron style=" max-height: 5vh">
      <h2>Welcome {{currentUser.first_name}} {{ currentUser.last_name}}</h2>
    </b-jumbotron>
    <b-button to="/submitRequest" class="my-3" type="button" variant="primary">
      Submit Request
    </b-button>

    <div v-if="!submissions">
      <h4>No submissions made yet!
        Press the button to submit the first!</h4>
    </div>
    <div v-else>
      <b-card
          border-variant="dark"
          header="Past Submissions"
          header-border-variant="info"
          header-text-variant="info"
          header-class="h4"
      >
        <b-table caption-top head-row-variant="primary"
                 responsive="sm" striped hover small outlined fixed
                 :items="submissions" :fields="fields">

          <template v-slot:cell(date_submitted)="row">
            {{moment(row.item.date_submitted).format('DD-MM-YYYY')}}
          </template>
          <template v-slot:cell(date_from)="row">
            {{moment(row.item.date_from).format('DD-MM-YYYY')}}
          </template>
          <template v-slot:cell(date_to)="row">
            {{moment(row.item.date_to).format('DD-MM-YYYY')}}
          </template>
          <template v-slot:cell(days_requested)="row">
            {{ moment(row.item.date_to).diff(moment(row.item.date_from),'days')+1 }}
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
import http from "@/services/api";

export default {
  name: "HomePage",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  data() {
    return {
      message: '',
      submissions: [],
      fields: [
        {key: 'date_submitted', label: 'Date Submitted'},
        {key: 'date_from', label: 'Date From'},
        {key: 'date_to', label: 'Date To'},
        {key: 'days_requested', label: 'Days Requested'},
        {key: 'status', label: 'Status'}
      ],
    }
  },
  beforeMount() {
    let url = "/submissions?id="+this.currentUser.id;

    http.get(url)
        .then(response => {
          console.log(response.data.submissions);
          this.submissions = response.data.submissions;
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