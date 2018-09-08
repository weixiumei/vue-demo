<template>
<div>
    <div class="flex-center nav">
      <div class="width100 box_nav flex_2" @click="switchTab('1')"><img class="img" :src="img_pub_on" /><span>公共内容</span></div>
      <div class="width100 box_nav flex_2" @click="switchTab('2')"><img class="img" :src="img_per_off" /><span>我的创作</span></div>
      <div class="width100 box_nav flex_1" @click="switchTab('3')"><img class="img_search" src="static/img/icon_search.png" /><span>搜索</span></div>
    </div>
  <div class="public flex">
    <div class="slider_right" :style="{maxHeight: height + 'px'}">
      <div class="slider_nav flex-center" v-for="(slider, index) in sliderData" :key="index" :class="{active: changeColor == index}" v-bind:id="slider.id" @click="sliderChange(slider,index)">
        <span>{{slider.text}}</span>
      </div>
    </div>
    <div class="slider_left"  :style="{maxHeight: height + 'px'}" ref="sliderLeft" >
      <div class="content" v-for="(item, index) in contentData" :key="index"
        v-clipboard:copy="item.content"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        @click="addNum(item)"
      >
        <div class="content_detail">
          {{item.content}}
        </div>
        <div class="copy">
          <span class="copy_num" v-if="isShowNum">{{item.num_used}}次使用</span>
          <span class="copy_btn"><img class="img_copy" src="static/img/copy.png" 
              />复制</span>
        </div>
      </div>
    </div>
    <toast v-if="show" textMsg="已复制"></toast>
  </div>
</div>  
</template>

<script>
  import toast from "./../../components/toast"
  import { PUBLIC_LEFTLIST_GET, PUBLIC_RIGHTLIST_GET, UPDATE_LIST_NUM } from "@/api";
  export default {
    name: "public",
    data() {
      return {
        //显示弹框
        show: false,
        //侧边栏改变颜色
        changeColor: 0,
        sliderData: [],
        //侧边栏对应的内容
        contentData: [],
        isShowNum: true,
        height: 0,
        tab: '1',
        img_pub: '',
        img_per: '',
        img_pub_off: require('static/img/icon_public_content_off.png'),
        img_pub_on: require('static/img/icon_public_content_on.png'),
        img_per_off: require('static/img/icon_person_creat_off.png'),
        img_pre_on: require('static/img/icon_person_creat_on.png'),          
      }
    },
    methods: {
      switchTab: function(_tab) {
        let that = this
        if (_tab == '3') {
          that.$router.push({
            name: "searchContent",
          })
        }else if(_tab == '2'){
          that.$router.push({
            name: "personCreat",
          })          
        }
      },
      sliderChange: function(item, index) {
        this.changeColor = index;
        this.public_rightlist_get({category : item.id})
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
      public_leftlist_get: function () {
        this.sliderData = []
        PUBLIC_LEFTLIST_GET().then(res => {
          let _arr = []
          for(let key in res.data){
            let _obj = {}
            _obj.id = key
            _obj.text = res.data[key]
            _arr.push(_obj)
          }
          this.sliderData = _arr
        })
      },
      public_rightlist_get: function (_data) {
        PUBLIC_RIGHTLIST_GET(_data).then(res => {
          let that = this;
          if(_data.category == 'hot') {
              that.isShowNum = true
          }else{
             that.isShowNum = false
          }
          this.contentData = res.data
          this.$refs.sliderLeft.scrollTo(0,0)
        })
      }      
    },
    created() {
      this.public_leftlist_get()
      this.public_rightlist_get({category : "hot"})
    },
    components: {
      toast
    },
    mounted () {
      var screabHeight = document.documentElement.clientHeight-47
      this.height = screabHeight
    },    
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .slider_right {
    width: 160px;
    height: 100%;
    background: #ffffff;
    padding: 0 10px;
    margin-right: 10px;
    overflow: auto;
  }
  
  .slider_left {
    width: 100%;
    overflow: auto;
  }
  
  .slider_nav {
    width: 100%;
    height: 60px;
    margin-bottom: 10px;
    padding: 0 10px;
    font-family: PingFangSC-Regular;
    color: #6A6F74;
    font-size: 12px;
    border-bottom: 1px solid #ffffff;
    word-break: break-all;
    word-wrap: break-word;
    overflow: scroll
  }
  
  .active {
    border-bottom: 1px solid #3AA826;
    color: #81B83B;
    font-weight: 700
  }
  
  .content {
    padding: 17px 17px 0 17px;
    background: #ffffff;
    font-family: PingFangSC-Regular;
    border-bottom: 1px solid #CACFDA;
    margin-bottom: 10px
  }
  
  .content_detail {
    word-break: break-all;
    word-wrap: break-word;
    color: #353535;
    font-size: 12px;
    min-height: 60px;
  }
  
  .copy {
    text-align: right;
    height: 30px;
    width: 100%
  }
  
  .copy_num {
    color: rgba(34, 34, 34, 0.50);
    font-size: 12px
  }
  
  .copy_btn {
    color: #36A726;
    font-size: 14px;
  }
  
  .img_copy {
    display: inline;
    width: 14px;
    margin-right: 0.16rem;
    margin-left: 0.7rem;
    margin-bottom: 2px;
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
