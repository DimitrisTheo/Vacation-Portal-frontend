<template>
  <div id="app">
    <Navbar ></Navbar>

    <b-container style="flex: 1 0 auto;" class="my-2">
      <router-view></router-view>
    </b-container>

  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || 'Epignosis Assignment';
      }
    }
  },
  components: {
    Navbar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
