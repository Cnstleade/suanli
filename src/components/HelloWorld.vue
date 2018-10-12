<template>
  <div class="container_fuild">
    <v-header class="c-header-fixed"></v-header>
    <v-slider></v-slider>
    <v-demo1></v-demo1>
  </div>
</template>

<script>
import vHeader from "./header/header";
import vSlider from "./slider/slider";
import vDemo1 from "./echartDemo/echartDemo";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  components: {
    vHeader,
    vSlider,
    vDemo1
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@media screen and (max-width: 720px) {
  .c-header-fixed {
    position: relative;
  }
}
@media screen and (min-width: 721px) {
  .c-header-fixed {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
  }
}
</style>
