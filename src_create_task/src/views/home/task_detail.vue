<template>
  <!-- 任务详情 -->
  <div class="task_info">
    <div style="padding: 10px;margin-top: 0;">
      <div class="weui-cell" :class="edit ? 'border':''" >
        <div class="weui-cell__bd" style="margin-top:0;">
          <input class="weui-input font-weight-500" :disabled="!edit" type="text" v-model="task_item.task_name" placeholder="任务标题"/>
        </div>
      </div>
      <textarea class="weui-textarea" :class="edit ? 'border':''" :disabled="!edit" placeholder="任务描述" v-model="task_item.task_context" rows="3"></textarea>
    </div>
    <div class="jiange"></div>
    <div style="padding: 10px;">
      <div>
        <label 
          class=""
          style=""
          >
          {{task_item.task_user}}
        </label>
        <select name="select1" v-model="task_item.task_state" class="state" :class="edit ? 'border':'no_border'" :disabled="!edit">
          <option selected="" v-for="(value, key) in state_list" :key="key" :value="value.code">{{value.name}}</option>
        </select>
      </div>
      <div>
        <span>任务时间 </span>
        <input class="weui-input" :class="edit ? 'border':''" :disabled="!edit" type="date" v-model="task_item.start_date" style="width:36%;padding: 15px 3px;text-align:center;"/>
        至 <input class="weui-input" :class="edit ? 'border':''" :disabled="!edit" type="date" v-model="task_item.end_date" style="width:36%;padding: 15px 3px;"/>
      </div>
      <div v-on:click="goMemberList()" style="color:#0068c9;">查看相关会员</div>
    </div>

    <div class="btn_div">
      <div v-on:click="goBack()" class="weui-btn weui-btn_default">返回</div>
      <div v-on:click="edit_btn()" v-show="!edit" class="weui-btn weui-btn_default">编辑</div>
      <div v-on:click="save()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-right: 0;">保存</div>
      <div v-on:click="cancel_edit()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-left: 8px;">取消</div>
    </div> 
  </div>
</template>
<script>
import { UPDATE_TASK_INFO } from "@/api"
export default {
  data(){
    return{
      task_item:{},
      edit:'',
      state_list:[
          {
            name:'未完成',
            code:'draft'
          },
          {
            name:'进行中',
            code:'process'
          },
          {
            name:'完成',
            code:'done'
          },
          {
            name:'作废',
            code:'invalid'
          }
        ],
    }
  },
  methods:{
    goMemberList: function () {
      this.$router.push({
        name:'相关会员列表',
        params:{
          task_item:this.task_item
        }
      })
    },
    edit_btn: function () {
      this.edit = true;
    },
    cancel_edit: function () {
      this.edit = false;
    },
    // 更新任务
    save: function () {
      var data = {
        "task_code": this.task_item.task_code,
        "task_name": this.task_item.task_name,
        "task_context": this.task_item.task_context,
        "task_state": this.task_item.task_state,
        "start_date": this.task_item.start_date,
        "end_date": this.task_item.end_date
      }
      if(!data.task_name){
        alert('请输入任务标题');
        return;
      }
      if(!data.task_context){
        alert('请输入任务描述');
        return;
      }
      if(!data.start_date || !data.end_date){
        alert('请输入任务时间');
        return;
      }
      UPDATE_TASK_INFO(data).then(res => {
        this.edit = false;
      })
    },
    goBack: function(){
      this.$router.push({
        name:'任务列表'
      })
    }
  },
  created(){
    this.task_item = this.$route.params.task_item
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
  .state{
    background: #fff;
    border-radius: 1px;
    float: right;
    padding: 0 12px;
  }
</style>
