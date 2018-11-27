<template>
  <!-- 创建任务 -->
  <div class="task_info">
    <div style="padding: 10px;margin-top: 0;">
      <div class="weui-cell border">
        <div class="weui-cell__bd" style="margin-top:0;">
          <input class="weui-input font-weight-500" type="text" v-model="task_name" placeholder="任务标题"/>
        </div>
      </div>
      <textarea class="weui-textarea border" placeholder="任务描述" v-model="task_context" rows="3"></textarea>
    </div>
    <div class="jiange"></div>
    <div style="padding: 10px;">
      <div>
        <span>任务时间 </span>
        <input class="weui-input border" type="date" v-model="start_date" style="width:36%;padding: 15px 3px;text-align:center;"/>
        至 <input class="weui-input border" type="date" v-model="end_date" style="width:36%;padding: 15px 3px;"/>
      </div>
      <div class="weui-cells__title">分配给如下导购</div>
      <label 
        class="label_style" 
        v-for="guide in shopping_guide" 
        :key="guide.code" 
        :class="{selected: guide.selected}"
        @click="item_click(guide, 'guide_param_list')"
        >
        {{guide.user_name}}
      </label>
    </div>
    <div class="btn_div">
      <div v-on:click="cancel()" class="weui-btn weui-btn_default">返回</div>
      <div v-on:click="finish()" class="weui-btn weui-btn_default">完成</div>
    </div>
  </div>
</template>
<script>
import { GET_SEARCH_RELATED_USERS, MARKETING_TASK_EDIT_INFO } from "@/api"
import { get_date_format, GetPreMonthDay } from '@/common/util/common'
export default {
  data () {
    return {
      login_name: localStorage.getItem('login_name'),
      shop_id: localStorage.getItem('shop_id')*1,
      task_name: '',
      task_context: '',
      start_date: '',
      end_date: '',
      guide_param_list:[],
      shopping_guide: [],
      member_list:[],
      member_selected_list:[]
    }
  },
  methods:{
    // 返回
    cancel: function () {
      var that = this
      this.$router.push({
        name: "会员列表",
        params: { member_list: that.member_list }
      }) 
    },
    // 完成
    finish: function () {
      let that = this
      if(!this.task_name){
        alert('请输入任务标题');
        return;
      }
      if(!this.task_context){
        alert('请输入任务描述');
        return;
      }
      if(!this.start_date||!this.end_date){
        alert('请输入任务时间');
        return;
      }
      if(this.guide_param_list.length==0){
        alert('请输入需分配的导购');
        return;
      }
      var data={
        "login_name": this.login_name,
        "related_shop_id":this.shop_id,
        "res_code_list": this.guide_param_list,
        "start_date": this.start_date,
        "end_date": this.end_date,
        "task_context": this.task_context,
        "task_name": this.task_name,
        "member_info_list": this.member_selected_list
      }
      
      MARKETING_TASK_EDIT_INFO(data).then(res => {
        // this.get_marketing_task_list();
        that.$router.push({
          name:'任务列表'
        })
      })
    },
    item_click: function (item_date, type) {
      item_date.selected = !item_date.selected;
      // this.$set(item_date, 'selected', !item_date.selected);
      this.set_param(item_date, type);
      this.$forceUpdate();
    },
    set_param: function (item_date, param_list) {
      if(item_date.selected){
        // 卡类型字段为level_code
        if(param_list=='card_styles_param_list'){
          this[param_list].push(item_date.level_code);
        } else if(param_list=='guide_param_list'){
          this[param_list].push(item_date.user_code);
        } else if (param_list=='sex'){// 性别
          for(var i=0;i<this.sex_list.length;i++){
            if(this.sex_list[i].code==item_date.code){
              this.sex_param = item_date.code
              this.sex_list[i].selected = true;
            }else{
              this.sex_list[i].selected = false;
            }
          }
        }else{
          this[param_list].push(item_date.code);
        }
      }else{
        if(param_list=='card_styles_param_list'){
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.level_code){
              this[param_list].splice(i,1);
            }
          }
        }else if(param_list=='guide_param_list'){
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.user_code){
              this[param_list].splice(i,1);
            }
          }
        } else if (param_list=='sex'){// 性别
          this.sex_param = '';
        }else{
          for(var i=this[param_list].length-1;i>=0;i--){
            if(this[param_list][i]==item_date.code){
              this[param_list].splice(i,1);
            }
          }
        }
      }
    },
    // 导购列表
    get_search_related_users: function (data) {
      var that = this;
      GET_SEARCH_RELATED_USERS(data).then(res => {
        that.shopping_guide = res.data.user_info_list;
        that.shopping_guide.forEach(item => {
          item.selected = false;
        })
      })
    }
  },
  created () {
    this.member_list = this.$route.params.member_list
    this.member_selected_list = this.$route.params.member_selected_list
    
    this.start_date=get_date_format(new Date());
    this.end_date=GetPreMonthDay(get_date_format(new Date()), -1);
    let that = this;
    let data = {
      "login_name": this.login_name, 
      "related_shop_id":this.shop_id
    }
    // 导购列表
    this.get_search_related_users(data);
  }
}
</script>

<style scoped>
  .task_info {
    padding-bottom: 1.6rem;
    min-height: 667px;
    background: #fff;
  }
  .task_info div, .task_info textarea{
    margin-top: 10px;
  }
  .task_info textarea{
    padding: 10px;
    background: #fff;
  }
  .border{
    border: 1px solid #e4e5e5;
    background: #fbfcfe!important;
  }
</style>
