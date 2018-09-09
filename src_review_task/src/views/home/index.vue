<template>
  <div class="home">
    <!-- 任务列表 -->
    <div v-show="isActive == 'now_task'">
      <div class="weui-cells">
        <a v-for="task in task_list" :key="task.task_code" class="weui-cell weui-cell_access" v-on:click="goTaskDetail(task)">
            <div class="weui-cell__bd">
                <p>{{task.task_name}}</p>
            </div>
            <div class="weui-cell__bd">
                <p>{{task.task_user}}</p>
            </div>
            <div class="weui-cell__bd">
              <p class="task_state_text">{{task.task_state_text}}</p>
            </div>
            <div class="weui-cell__ft">
            </div>
        </a>
      </div>
      <div class="nodata" v-if="task_list.length==0&&!loadingToastShow">暂无任务</div>
    </div>
    <!-- 任务详情 -->
    <div class="task_info" v-show="isActive == 'now_task_info'" style="padding-bottom: 1.6rem;min-height: 667px;background: #fff;">
      <!-- <input type="text" style="border:1px solid #d5d5d5;" v-model="task_item.task_name"> -->
      <div style="padding: 10px;margin-top: 0;">
        <div class="weui-cell" >
          <div class="weui-cell__bd" style="margin-top:0;">
            <input class="weui-input font-weight-500" type="text" v-model="task_item.task_name" placeholder="任务标题"/>
          </div>
        </div>
        <textarea class="weui-textarea" placeholder="任务描述" v-model="task_item.task_context" rows="3"></textarea>
      </div>
      <div class="jiange"></div>
      <div style="padding: 10px;">
        <div>
          <!-- <label 
            class=""
            style=""
            >
            {{task_item.task_user}}
          </label> -->
          <label>任务状态</label>
          <select name="select1" v-model="task_item.task_state" class="state" :class="edit ? 'border':'no_border'" :disabled="!edit">
            <option selected="" v-for="(value, key) in state_list" :key="key" :value="value.code">{{value.name}}</option>
          </select>
        </div>
        <div>
          <span>任务时间 {{task_item.start_date}} 至 {{task_item.end_date}}</span>
          
          <!-- <input class="weui-input" :class="edit ? 'border':''" :disabled="!edit" type="date" v-model="task_item.start_date" style="width:36%;padding: 15px 3px;text-align:center;"/>
          至 <input class="weui-input" :class="edit ? 'border':''" :disabled="!edit" type="date" v-model="task_item.end_date" style="width:36%;padding: 15px 3px;"/> -->
        </div>
        <!-- <div>
          <span>完成状态 </span>
          <select name="select1" v-model="task_item.task_state" :class="edit ? 'border':'no_border'" :disabled="!edit" style="background: #fff;border-radius: 1px;">
            <option selected="" v-for="(value, key) in state_list" :key="key" :value="value.code">{{value.name}}</option>
          </select>
        </div> -->
        <!-- <div v-on:click="goMemberList()" style="color:#0068c9;">查看相关会员</div> -->
      </div>
      <div class="btn_div">
        <div v-on:click="goBack1()" class="weui-btn weui-btn_default">返回</div>
        <div v-on:click="edit_btn()" v-show="!edit" class="weui-btn weui-btn_default">编辑</div>
        <!-- <div v-on:click="save()" v-show="edit" class="weui-btn weui-btn_default">保存</div> -->
        <div v-on:click="save()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-right: 0;">保存</div>
        <div v-on:click="cancel_edit()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-left: 8px;">取消</div>
      </div> 
    </div>
    
    <!-- tab -->
    <!-- <div v-show="isActive == 'now_task'||isActive == 'create'" class="weui-tabbar">
        <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('now_task')" v-bind:class="{ 'weui-bar__item_on': isActive == 'now_task' }">
            <p class="weui-tabbar__label" style="margin: 10px 0;">现有任务</p>
        </div>
        <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('create')" v-bind:class="{ 'weui-bar__item_on': isActive == 'create' }">
            <p class="weui-tabbar__label" style="margin: 10px 0;">新建任务</p>
        </div>
    </div> -->
    <!-- loading -->
    <div v-show="loadingToastShow" id="loadingToast" style="display:none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <!-- <p class="weui-toast__content">数据加载中</p> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { GET_MARKETING_TASK_LIST, UPDATE_TASK_INFO } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        edit:false,
        loadingToastShow:false,
        member_list_loading:false,
        isActive:'now_task',
        login_name:`${window.localStorage.getItem('login_name')}`,
        // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
        state_list:[
          {
            name:'草稿',
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
        task_list:[],
        task_item:{},
        member_list:[
        ]
      }
    },
    methods: {
      
      // 进去任务详情
      goTaskDetail: function (e) {
        this.edit = false;
        this.isActive = 'now_task_info';
        this.task_item = e;
        // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
        switch(this.task_item.task_state){
          case 'draft':
            this.task_item.task_state_text = '未完成';
            break;
          case 'process':
            this.task_item.task_state_text = '进行中';
            break;
          case 'done':
            this.task_item.task_state_text = '完成';
            break;
          case 'invalid':
            this.task_item.task_state_text = '作废';
            break;
        }
      },
      goMemberList: function () {
        var that = this;
        GET_MARKETING_TASK_INFO({'task_code': that.task_item.task_code}).then(res => {
          that.isActive = 'member_list2';
          that.member_list = res.data.task_info.member_list;
        })
      },
      // 返回
      goBack1: function () {
        this.isActive = 'now_task';
      },
      // 返回
      // goBack2: function () {
      //   this.isActive = 'now_task_info';
      // },
      // 下一步到编辑
      next_to_edit: function () {
        this.isActive = 'task_edit';
      },
      get_marketing_task_list: function () {
        this.loadingToastShow = true;
        // var that = this;
        // 任务列表
        var data = {
          "login_name":this.login_name,
          "login_name":this.login_name,
          // "task_state":"draft"
        }
        GET_MARKETING_TASK_LIST(data).then(res => {
          this.task_list = res.data.task_info_list;
          this.loadingToastShow = false;
          for(let i=0;i<this.task_list.length;i++){
            // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
            switch(this.task_list[i].task_state){
              case 'draft':
                this.task_list[i].task_state_text = '未完成';
                break;
              case 'process':
                this.task_list[i].task_state_text = '进行中';
                break;
              case 'done':
                this.task_list[i].task_state_text = '完成';
                break;
              case 'invalid':
                this.task_list[i].task_state_text = '作废';
                break;
            }
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
        this.loadingToastShow = true;
        var data = {
          "task_code": this.task_item.task_code,
          "task_name": this.task_item.task_name,
          "task_context": this.task_item.task_context,
          "task_state": this.task_item.task_state,
          "start_date": this.task_item.start_date,
          "end_date": this.task_item.end_date
        }
        // var data = this.task_item;
        UPDATE_TASK_INFO(data).then(res => {
          console.log(res);
          this.edit = false;
          this.loadingToastShow = false;
          // that.member_list = res.data.task_info.member_list;
        })
      }
    },
    mounted: function() {
    },
    created(){
      // 任务列表
      this.get_marketing_task_list();
    },
    components: {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weui-cells{
  margin-top: 0;
  font-size: 14px;
}
.weui-tabbar{
  position: fixed;
}
.weui-btn{
  font-size: 16px;
}
.label_style{
  border: 1px solid #d5d5d5;
  padding: 4px 8px;
  margin: 3px;
  display: inline-block;
}
.btn_div{
  width: 100%;
  position: fixed;
  bottom: .5rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
.btn_div div{
  padding: 0 45px;
}
.selected{
  border: 1px solid;
  font-weight: 500;
  color: #000;
}
.nodata, .searching{
  font-size: .3rem;
  background: #EDF0F4;
  text-align: center;
  padding: 1rem;
}
/* .task_info{
  margin: 10px;
} */
.task_info div, .task_info textarea{
  margin-top: 10px;
}
.task_info textarea{
  /* border: 1px solid rgb(213, 213, 213); */
  padding: 10px;
}
.border{
  border:1px solid #d5d5d5;
}
.no_border{
  border:0;
}
.state{
  /* background: #EDF0F4; */
  background: #fff;
  border-radius: 1px;
  /* float: right; */
  padding: 4px 12px;
}
.jiange{
  height: 10px;
  width: 100%;
  background: #EDF0F4;
}
.task_state_text{
  text-align: right;
}
.font-weight-500{
  font-weight: 500;
}
</style>
