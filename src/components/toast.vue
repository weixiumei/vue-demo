<template>
  <div class="toast">
    <div class="mask"></div>
    <div class="hd-toast">
      <img src="static/img/copyToast.png" class="hd-img-success"/>
      <p class="hd-toast_content">{{textMsg}}</p>
    </div>
  </div>
</template>

<script>
  
  export default {
    name: "toast",
    data() {
      return {
      }
    },
    methods: {

    },
    props: {
      textMsg: String,
      default: '已完成'
    } ,   
    created() {

    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toast{
  }
  .mask{
    position: fixed;
    z-index: 1000;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  .hd-toast{
    position: fixed;
    z-index: 5000;
    width: 7.6em;
    min-height: 7.6em;
    top: 180px;
    left: 50%;
    margin-left: -3.8em;
    background: rgba(17, 17, 17, 0.7);
    text-align: center;
    border-radius: 5px;
    color: #FFFFFF;    
  }
  .hd-img-success{
    width: 4em;
    margin-top: 1.5em;
  }
  .hd-toast_content{
    margin: 10px 0 15px;
  }
</style>
