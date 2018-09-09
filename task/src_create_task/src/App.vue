<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
//  @import "static/css/lib/iconfont.css";
  
//   /*过渡效果需要的动画库*/
  
//   @import "static/css/lib/animate.css";
  
//   /*weui 样式库 非常适合高仿微信*/
  
//   @import "static/css/lib/weui.min.css";
  #app {
    font-family: 'PingFang SC', 'Microsoft YaHei';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
