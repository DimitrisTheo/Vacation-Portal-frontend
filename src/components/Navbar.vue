<template>
  <div>
    <b-navbar toggleable="md" variant="secondary">
      <b-navbar-brand href="#" @click.prevent>
        <img
            src="@/assets/logo.png"
            class="d-inline-block align-top"
            alt="Epignosis"
            width="80" height="80"
        />
      </b-navbar-brand>

      <b-navbar-toggle target="navbar-toggle-collapse">
        <span class="navbar-toggler-icon"></span>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" class="collapse navbar-collapse text-center">
        <b-navbar-nav v-if="currentUser">
            <b-nav-item href="" @click.prevent="logOut">
              <font-awesome-icon icon="sign-out-alt" />Logout
            </b-nav-item>
          </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
          .finally( () => {
            this.$router.push('/');
          })
    }
  }
}
</script>

<style scoped>

</style>