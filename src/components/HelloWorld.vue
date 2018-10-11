<template>
  <div class="container_fuild">
    <v-header></v-header>
  </div>
</template>

<script>
import vHeader from "./header/header";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    vHeader
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
