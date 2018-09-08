<template>
  <div class="">
    <div class="flex-center nav">
      <div class="width100 box_nav flex_2" @click="switchTab('1')"><img class="img" :src="img_pub_off" /><span>公共内容</span></div>
      <div class="width100 box_nav flex_2" @click="switchTab('2')"><img class="img" :src="img_per_on" /><span>我的创作</span></div>
      <div class="width100 box_nav flex_1" @click="switchTab('3')"><img class="img_search" src="static/img/icon_search.png" /><span>搜索</span></div>
    </div>      
    <div class="box" :style="{maxHeight: height + 'px'}">
      <div class="content" v-for="(item, index) in list" :key="index" 
          v-clipboard:copy="item.content"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError"
          @click="addNum(item)"
      >
        <div class="content_detail">
          {{item.content}}
        </div>
        <div class="copy">
          <span class="copy_btn"><img class="img_copy" 
          src="static/img/copy.png"
          />复制</span>
        </div>
      </div>    
    </div>  
    <div class="foot_fixed flex-center" @click="creat">
      <img class="img_create" src="static/img/create.png"/>创建新内容
    </div>
    <toast v-if="show" textMsg="已复制"></toast>
  </div>
</template>

<script>
import toast from "./../../components/toast"
import { CREAT_LIST_GET, UPDATE_LIST_NUM } from "@/api"
import { user_id } from '@/common/util/common'
  export default {
    name: "creat",
    data() {
      return {
        show: false,
        list: [],
        height: 0,
        img_pub_off: require('static/img/icon_public_content_off.png'),
        img_pub_on: require('static/img/icon_public_content_on.png'),
        img_per_off: require('static/img/icon_person_creat_off.png'),
        img_per_on: require('static/img/icon_person_creat_on.png'),        
      }
    },
    methods: {
      switchTab: function(_tab) {
        let that = this
        if (_tab == '3') {
          that.$router.push({
            name: "searchContent",
          })
        }else if(_tab == '1'){
          that.$router.push({
            name: "publicContent",
          })          
        }
      },      
      onCopy: function(e) {
        let that = this;
        this.show = true;
        setTimeout(function () {
            that.show= false
        }, 1000);  
      },
      //复制次数
      addNum (item) {
        item.num_used = item.num_used + 1
        this.update_list_num({id: item.id})
      },
      update_list_num: function (data) {
        UPDATE_LIST_NUM(data).then(res => {
        })
      },
      onError: function(e) {
      },      
      creat: function () {
        this.$router.push({
          name: "creat",
        })       
      },
      creat_list_get: function (_data) {
        CREAT_LIST_GET(_data).then(res => {
          this.list = res.data
        })
      }      
    },
    created() {
      let _data = {
        user_id: user_id
      }
      this.creat_list_get(_data)
    },
    mounted () {
      var screabHeight = document.documentElement.clientHeight - 98
      this.height = screabHeight
    },
    components: {
      toast
    }    
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    margin-top: -10px;
    padding-bottom: 0.98rem;
    overflow: auto
  }
  .content{
    padding: 17px 17px 0 17px;
    background: #ffffff;
    font-family: PingFangSC-Regular; 
    border-bottom: 1px solid #CACFDA;
    margin-top: 10px  
  }
  .content_detail{
    word-break: break-all;
    word-wrap: break-word;
    color: #353535;
    font-size: 12px;
    min-height: 60px;
  }
  .copy{
    text-align: right;
    height: 30px;
    width: 100%
  }
  .copy_num{
    color: rgba(34,34,34,0.50);
    font-size: 12px
  }
  .copy_btn{
    color: #36A726;
    font-size: 14px;
  }
  .img_copy{
    display: inline;
    width: 14px;
    margin-right: 0.16rem;
    margin-left: 0.7rem;
    padding-bottom: 2px;
  }
  .foot_fixed{
    position: fixed;
    bottom: 0.1rem;
    right: 0.24rem;
    left: 0.24rem;
    background: #ffffff;
    height: 0.98rem;
    color: #34495E;
    font-weight: 700;
    border-radius: 4px
  }
  .img_create{
     display: inline;
    width: 14px;
    margin-right: 0.16rem;
    margin-left: 0.7rem;
  }

  /* 上面的导航栏 */
    .nav {
    height: 0.94rem;
    background: #ffffff;
    color: #7F8389;
    font-size: 12px;
    border-bottom: 2px solid #CACFDA
  }
  
  .width100 {
    width: 100%
  }
  
  .flex_2 {
    flex: 2
  }
  
  .flex_1 {
    flex: 1
  }
  
  .box_nav {
    text-align: center
  }
  
  .img {
    display: inline-block;
    width: 0.54rem;
    margin-right: 0.19rem
  }
  
  .img_search {
    display: inline-block;
    width: 0.24rem;
    margin-right: 0.19rem
  }
</style>
