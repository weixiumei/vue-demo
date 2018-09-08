<template>
<div>
  <div class="search">
    <search 
    v-on:searchVal = "msgSearch"
    @searchCancel= "searchCancel"
    ></search>
  </div>
  <div class="box" :style="{maxHeight: height + 'px'}" v-if="isShowBox">
    <div class="content" v-for="(item, index) in list" :key="index"
        v-clipboard:copy="item.content"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"
        @click="addNum(item)"
    >
      <div class="content_detail" v-html="item.content_copy">
      </div>
      <div class="copy">
        <span class="copy_btn"><img class="img_copy" 
        src="static/img/copy.png"
        />复制</span>
      </div>
    </div>    
  </div>
  <toast v-if="show" textMsg="已复制"></toast>
</div> 
</template>

<script>
import toast from "./../../components/toast";
import search from "./../../components/search";
import { delay, user_id } from "@/common/util/common";
import { SEARCH_LIST_GET, UPDATE_LIST_NUM } from "@/api";
//延时函数
export default {
  name: "searchContent",
  data() {
    return {
      isShowBox: false,
      list: [],
      show: false,
      keyword: "",
    };
  },
  methods: {
    onCopy: function(e) {
      let that = this;
      this.show = true;
      setTimeout(function() {
        that.show = false;
      }, 1000);
    },
    onError: function(e) {},
    //复制次数
    addNum(item) {
      item.num_used = item.num_used + 1;
      this.update_list_num({ id: item.id });
    },
    update_list_num: function(data) {
      UPDATE_LIST_NUM(data).then(res => {});
    },
    msgSearch: function(val) {
      if (val) {
        let that = this
        delay(() => {
          that.search_list_get({ keyword: val, user_id: user_id })
        }, 300);
        this.keyword = val;
      } else {
        this.isShowBox = false;
      }
    },
    searchCancel(val) {
      this.$router.push({
        name: "home"
      });
    },
    search_list_get: function(_data) {
      let that = this;
      SEARCH_LIST_GET(_data).then(res => {
        that.isShowBox = true;
        for (let i in res.data) {
          let reg = new RegExp("" + _data.keyword + "", "g");
          res.data[i].content_copy = res.data[i].content.replace(
            reg,
            "<font style='color:#36A726;font-weight:700;'>" +
              _data.keyword +
              "</font>"
          );
        }
        that.list = res.data;
      });
    }
  },
  components: {
    search,
    toast
  },
  mounted() {
    var screabHeight = document.documentElement.clientHeight;
    this.height = screabHeight;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box {
  margin-top: -10px;
  padding-bottom: 0.98rem;
  overflow: auto;
}
.content {
  padding: 17px 17px 0 17px;
  background: #ffffff;
  font-family: PingFangSC-Regular;
  border-bottom: 1px solid #cacfda;
  margin-top: 10px;
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
  width: 100%;
}
.copy_num {
  color: rgba(34, 34, 34, 0.5);
  font-size: 12px;
}
.copy_btn {
  color: #36a726;
  font-size: 14px;
}
.img_copy {
  display: inline;
  width: 14px;
  margin-right: 0.16rem;
  margin-left: 0.7rem;
  padding-bottom: 2px;
}
</style>
