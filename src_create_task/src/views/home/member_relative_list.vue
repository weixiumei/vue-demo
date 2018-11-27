<template>
  <!-- 查看相关会员 -->
  <div>
    <div class="members" :style="{maxHeight: maxheight + 'px','overflow':'scroll','background':'#fff'}">
      <div v-for="( member,index) in member_list" :key="member.code" style="border-bottom: 4px solid #EFEFF4;padding-bottom: 6px;">
        <div class="weui-cell">
          <a v-on:click="go_member_detail(member)" class="weui-cell__bd" :href="WX_URL_PREFIX+'/nt-html-pbmini/nt-member-phone/?token='+WPDF_TOKEN+'&member_code='+member.member_code+'&member_no='+member.member_code+'#/'">
            <p class="title_name"> <img src="static/img/detail.png" style="width: .3rem;"> {{member.member_name}}</p>
          </a>
          <a class="weui-cell__ft" :class="member.mobile==''?'':'color'" :href="!!member.mobile?('tel:' + member.mobile):'#'" style="font-size: 16px;"> 
            <img v-show="!!member.mobile" src="static/img/phone.png" style="width: .3rem;"> 
            {{member.mobile==''?'暂无':member.mobile}}
          </a>
        </div>
        <div class="weui-cell">
          <div class="two-cell" @click="is_done(member)">
            <img v-show="member.task_member_state=='al_marketing'" src="static/img/done-on.png">
            <div v-show="member.task_member_state=='al_marketing'">已执行营销</div>
            <img v-show="member.task_member_state=='no_marketing'" src="static/img/done-off.png">
            <div v-show="member.task_member_state=='no_marketing'" style="opacity: 0.5">未执行营销</div>
          </div>
          <div class="two-cell" @click="edit_describe(member, index)">
            <img src="static/img/edit.png" style="margin-left: 20px;">
            <div>备注描述</div>
          </div>
        </div>
        <div class="weui-cell" v-show="!!member.task_member_context&&!member.remark_show" style="border-top: 1px dashed #efeff4;">
          {{member.task_member_context}}
        </div>
        <div class="weui-cell" v-show="member.remark_show" style="border:1px solid #d5d5d5;">
          <div class="weui-cell__bd">
            <input class="weui-input" type="text" :ref="'input'+index" placeholder="请输入备注" v-model="member.task_member_context" @keyup.enter="save_remark(member)"/>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_div">
      <div v-on:click="goBack()" class="weui-btn weui-btn_default">返回</div>
    </div>
  </div>
</template>
<script>
import { GET_MARKETING_TASK_INFO, UPDATE_MEMBER_INFO } from "@/api"
export default {
  data(){
    return{
      WX_URL_PREFIX:WX_URL_PREFIX,
      WPDF_TOKEN:localStorage.getItem('WPDF_TOKEN'),
      login_name:localStorage.getItem('login_name'), 
      maxheight:0,
      member_list:[],
      task_item:{}
    }
  },
  methods: {
    go_member_detail: function (member) {
      sessionStorage.setItem('task_item',  JSON.stringify(this.task_item));
    },
    // 已执行促销
    is_done:function (member) {
      if(member.task_member_state=='no_marketing'){
        member.task_member_state='al_marketing'
      }else{
        member.task_member_state='no_marketing'
      }
      let data = {
        "task_code": this.task_item.task_code,
        "member_code": member.member_code,
        "task_member_state": member.task_member_state,
        "login_name": this.login_name, 
        // "task_context": "测试更改"
      }
      this.update_member_info(data);
    },
    edit_describe: function (member, index) {
      for (var i=0;i<this.member_list.length;i++) {
        if(this.member_list[i].member_code!=member.member_code){
          this.member_list[i].remark_show = false;
        }
      }
      member.remark_show = !member.remark_show;
      setTimeout(()=>{
        // document.getElementById('input'+index).focus();
        var str = 'input'+index
        this.$refs[str][0].focus()
      },100);
      
      this.$forceUpdate();
    },
    save_remark: function (member) {
      let data = {
        "task_code": this.task_item.task_code,
        "member_code": member.member_code,
        // "task_member_state": member.task_member_state,
        "login_name": this.login_name, 
        "task_member_context": member.task_member_context
      }
      this.update_member_info(data);
      member.remark_show = false;
      this.remarks = '';
      this.$forceUpdate();
    },
    goBack: function () {
      this.$router.push({
        name:'任务详情',
        params:{
          task_item:this.task_item
        }
      })
    },
    get_member_list: function () {
      var that = this;
      GET_MARKETING_TASK_INFO({'task_code': that.task_item.task_code}).then(res => {
        that.member_list = res.data.task_info.member_list;
        that.member_list.forEach(item => {
          item.remark_show = false;
        })
      })
    },
    update_member_info: function (data) {
      var that = this;
      UPDATE_MEMBER_INFO(data).then(res => {
      })
    },
  },
  created: function () {
    var screabHeight = window.innerHeight
    this.maxheight = screabHeight - 64

    if(!!sessionStorage.getItem('task_item')){
      this.task_item = JSON.parse(sessionStorage.getItem('task_item'));
    }else{
      this.task_item = this.$route.params.task_item
    }
    
    if(!!this.task_item&&!!this.task_item.task_code){
      sessionStorage.setItem('task_item', '');
      this.get_member_list();
    }
  }
}
</script>

<style scoped>
  .weui-cell:before{
    border-top: 0;
  }
  .two-cell{
    display:flex;align-items: center;
    font-size: 14px;
  }
  .two-cell img{
    width: .3rem;height:.3rem;margin-right: 10px;
  }
  .two-cell div{
    color:#222;;
  }
  .color{
    color: #09BB07;
  }
  .title_name{
    color:#353535;
    font-weight: 500;
    font-size: 16px;
    width: 4.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 0;
  }
</style>
