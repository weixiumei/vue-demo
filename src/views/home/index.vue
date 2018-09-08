<template>
  <div class="home">
    <div>index</div>
    <!-- <public-content></public-content> -->
  </div>
</template>

<script>
  import publicContent from "./publicContent"
  export default {
    name: "home",
    data() {
      return {
      }
    },
    methods: {
    },
    mounted: function() {
    },
    components: {
      publicContent,
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
