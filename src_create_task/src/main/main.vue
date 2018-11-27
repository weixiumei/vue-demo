<template>
    <div class="app" :style="{minHeight: height + 'px'}">
      <div>
          <router-view></router-view>
      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      height: ''
    }
  },
  mounted () {
    var screabHeight = document.documentElement.clientHeight
    this.height = screabHeight
  }
}
</script>

<style scoped>
.app {
  background: #EDF0F4
}
</style>