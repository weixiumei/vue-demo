<template>
  <div class="home">
    <!-- 创建的任务列表 -->
    <div class="weui-cells" v-show="isActive == 'now_task'">
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
      <div class="nodata" v-if="task_list.length==0&&!loadingToastShow">暂无任务</div>
    </div>
    <!-- 任务详情 -->
    <div class="task_info" v-show="isActive == 'now_task_info'" style="padding-bottom: 1.6rem;min-height: 667px;background: #fff;">
      <!-- <input type="text" style="border:1px solid #d5d5d5;" v-model="task_item.task_name"> -->
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
        <!-- <div>
          <span>完成状态 </span>
          <select name="select1" v-model="task_item.task_state" :class="edit ? 'border':'no_border'" :disabled="!edit" style="background: #fff;border-radius: 1px;">
            <option selected="" v-for="(value, key) in state_list" :key="key" :value="value.code">{{value.name}}</option>
          </select>
        </div> -->
        <div v-on:click="goMemberList()" style="color:#0068c9;">查看相关会员</div>
      </div>
      <div class="btn_div">
        <div v-on:click="goBack1()" class="weui-btn weui-btn_default">返回</div>
        <div v-on:click="edit_btn()" v-show="!edit" class="weui-btn weui-btn_default">编辑</div>
        <div v-on:click="save()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-right: 0;">保存</div>
        <div v-on:click="cancel_edit()" v-show="edit" class="weui-btn weui-btn_default" style="padding: 0 12px;margin-left: 8px;">取消</div>
      </div> 
    </div>
    <!-- 查看相关会员 -->
    <div v-show="isActive == 'member_list2'">
      <div style="padding-bottom: 1.6rem;">
        <div class="weui-cells" v-for="member in member_list" :key="member.code">
          <div class="weui-cell" >
              <div class="weui-cell__bd">
                  <p>{{member.member_name}}</p>
              </div>
              <div class="weui-cell__ft">{{member.mobile==''?'暂无':member.mobile}}</div>
          </div>
        </div>
      </div>
      <div class="btn_div">
        <div v-on:click="goBack2()" class="weui-btn weui-btn_default">返回</div>
      </div>
    </div>
    <!-- 筛选会员 -->
    <div v-show="isActive == 'create'" style="padding-bottom: 60px;">
      <div class="weui-cells weui-cells_form">
        <!-- 门店 -->
        <!-- <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">门店</label></div>
          <div class="weui-cell__bd">
            <select name="select1" v-model="shop_id">
              <option selected="" v-for="(value, key) in shop_list" :key="key" :value="value.shop_id">{{value.shop_name}}</option>
            </select>
          </div>
        </div> -->
        <!-- 最近购物日期 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">最近购物日期</label></div>
            <div class="weui-cell__bd">
              <label 
                class="label_style" 
                v-for="(last_shoping_date) in last_shoping_date_list" 
                :key="last_shoping_date.code" 
                :class="{selected: last_shoping_date.selected}"
                @click="item_click(last_shoping_date, 'last_shopping_date_param_list')"
                >
                {{last_shoping_date.name}}
              </label>
            </div>
        </div>
        <!-- 开卡日期 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">开卡日期</label></div>
            <div class="weui-cell__bd">
                <input class="weui-input" type="date" v-model="start_open_card_date" style="width:49%;"/>
                <input class="weui-input" type="date" v-model="end_open_card_date" style="width:49%;"/>
            </div>
        </div>
        <!-- 生日月 -->
        <div class="weui-cell">
            <div class="weui-cell__hd"><label for="" class="weui-label">生日月</label></div>
            <div class="weui-cell__bd">
                <!-- <select name="select1">
                    <option selected="" value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select> -->
                <label 
                  class="label_style" 
                  v-for="month in birthday_month_list" 
                  :key="month.code"
                  :class="{selected: month.selected}"
                  @click="item_click(month, 'birthday_month_param_list')"
                  >
                  {{month.name}}
                </label>
            </div>
        </div>
        <!-- 类型 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">类型</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="style in style_list" 
              :key="style.code"
              :class="{selected: style.selected}"
              @click="item_click(style, 'style_param_list')"
              >
              {{style.name}}
            </label>
          </div>
        </div>
        <!-- 性别 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">性别</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="sex in sex_list" 
              :key="sex.code"
              :class="{selected: sex.selected}"
              @click="item_click(sex, 'sex')"
              >
              {{sex.name}}
            </label>
          </div>
        </div>
        <!-- 卡类型 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">卡类型</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="card_style in card_style_list" 
              :key="card_style.level_id"
              :class="{selected: card_style.selected}"
              @click="item_click(card_style, 'card_styles_param_list')"
              >
              {{card_style.level_name}}
            </label>
          </div>
        </div>
        <!-- 积分 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">积分</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="point in points" 
              :key="point.code"
              :class="{selected: point.selected}"
              @click="item_click(point, 'point_param_list')"
            >
            {{point.name}}
            </label>
          </div>
        </div>
        <!-- 未消费季节 -->
        <div class="weui-cell">
          <div class="weui-cell__hd"><label for="" class="weui-label">未消费季节</label></div>
          <div class="weui-cell__bd">
            <label 
              class="label_style" 
              v-for="season in season_list" 
              :key="season.code"
              :class="{selected: season.selected}"
              @click="item_click(season, 'season_param_list')"
              >
              {{season.name}}
            </label>
          </div>
        </div>
      </div>
      <!-- <i v-show="member_list_loading" class="weui-loading"></i> -->
		  <div v-on:click="next_member_list()" class="weui-btn weui-btn_default weui-btn_loading" style="margin: 15px 55px 0 55px;">下一步</div>
    </div>
    <!-- 筛选出的会员list -->
    <div v-show="isActive == 'member_list'">
      <div v-if="member_list.length>0">
        <div style="padding-bottom: 1.6rem;">
          <div class="weui-cells" v-for="member in member_list" :key="member.code" v-on:click="toggle_select_click(member)">
            <div class="weui-cell" >
              <img src="src/assets/image/check-box-on.png" v-show="member.selected" style="width: 20px;margin: 0 10px;">
              <img src="src/assets/image/check-box-off.png" v-show="!member.selected" style="width: 20px;margin: 0 10px;">
              <!-- <div style="width: 20px;margin: 0 10px;" v-show="!member.selected"></div> -->
              <div class="weui-cell__bd">
                  <p>{{member.member_name}}</p>
              </div>
              <div class="weui-cell__ft">{{member.mobile==''?'暂无':member.mobile}}</div>
            </div>
          </div>
        </div>
        <div class="btn_div">
          <div v-on:click="pre_to_condition()" class="weui-btn weui-btn_default">上一步</div>
          <div v-on:click="next_to_edit()" class="weui-btn weui-btn_default">下一步</div>
        </div>
      </div>
      <div v-if="member_list.length==0">
        <div class="nodata">暂无会员</div>
        <div class="btn_div">
          <div v-on:click="pre_to_condition()" class="weui-btn weui-btn_default">上一步</div>
        </div>
      </div>
    </div>
    <!-- 编辑任务 -->
    <div class="task_info" v-show="isActive == 'task_edit'" style="padding-bottom: 1.6rem;min-height: 667px;background: #fff;">
      <!-- <input type="text" style="border:1px solid #d5d5d5;" v-model="task_item.task_name"> -->
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
        <!-- <div v-on:click="goMemberList()" style="color:#0068c9;">查看相关会员</div> -->
      </div>
      <div class="btn_div">
        <div v-on:click="cancel()" class="weui-btn weui-btn_default">返回</div>
        <div v-on:click="finish()" class="weui-btn weui-btn_default">完成</div>
      </div>
    </div>

    <!-- tab -->
    <div v-show="isActive == 'now_task'||isActive == 'create'" class="weui-tabbar">
        <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('now_task')" v-bind:class="{ 'weui-bar__item_on': isActive == 'now_task' }">
            <p class="weui-tabbar__label" style="margin: 10px 0;">现有任务</p>
        </div>
        <div href="javascript:;" class="weui-tabbar__item" v-on:click="active('create')" v-bind:class="{ 'weui-bar__item_on': isActive == 'create' }">
            <p class="weui-tabbar__label" style="margin: 10px 0;">新建任务</p>
        </div>
    </div>
    <!-- loading -->
    <div v-show="loadingToastShow" id="loadingToast" style="display:none;">
      <div class="weui-mask_transparent"></div>
      <div class="weui-toast">
          <i class="weui-loading weui-icon_toast"></i>
          <!-- <p class="weui-toast__content"></p> -->
      </div>
    </div>
  </div>
</template>

<script>
  import { GET_SHOP_LIST, GET_MARKETING_TASK_LIST, GET_MARKETING_TASK_INFO, MEMBER_LEVEL_LIST, MEMBER_LIST, MARKETING_TASK_EDIT_INFO, GET_SEARCH_RELATED_USERS, UPDATE_TASK_INFO } from "@/api";
  export default {
    name: "home",
    data() {
      return {
        edit:false,
        loadingToastShow:false,
        // member_list_loading:false,
        isActive:'now_task',
        login_name:`${window.localStorage.getItem('login_name')}`,
        // 筛选会员条件
        last_shopping_date_param_list:[],
        start_open_card_date:'',
        end_open_card_date:'',
        birthday_month_param_list:[],
        style_param_list:[],
        sex_param:'',
        card_styles_param_list:[],
        point_param_list:[],
        season_param_list:[],
        // 创建任务输入
        start_date:'',
        end_date:'',
        task_name:'',
        task_context:'',
        guide_param_list:[],

        // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
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
        task_list:[],
        task_item:{},
        shop_list:[
        ],
        shop_id:`${window.localStorage.getItem('shop_id')}`*1,
        last_shoping_date_list:[
          {
            name:'1个月以内',
            code:'TAG18000000000000000001',
            minMonth:0,
            maxMonth:1,
            selected:false
          },
          {
            name:'1-3个月',
            code:'TAG18000000000000000002',
            minMonth:1,
            maxMonth:3,
            selected:false
          },
          {
            name:'4-6个月',
            code:'TAG18000000000000000003',
            minMonth:4,
            maxMonth:6,
            selected:false
          },
          {
            name:'6个月以内',
            code:'TAG18000000000000000004',
            minMonth:0,
            maxMonth:6,
            selected:false
          },
          {
            name:'6-9个月',
            code:'TAG18000000000000000005',
            minMonth:6,
            maxMonth:9,
            selected:false
          },
          {
            name:'1年以内',
            code:'TAG18000000000000000006',
            minMonth:0,
            maxMonth:12,
            selected:false
          },
          {
            name:'1年以上',
            code:'TAG18000000000000000007',
            minMonth:12,
            selected:false
          },
          {
            name:'无消费',
            code:'TAG18000000000000000008',
            selected:false
          }
        ],
        birthday_month_list:[
          {
            name:'1月',
            code:'01',
            selected:false
          },
          {
            name:'2月',
            code:'02',
            selected:false
          },
          {
            name:'3月',
            code:'03',
            selected:false
          },
          {
            name:'4月',
            code:'04',
            selected:false
          },
          {
            name:'5月',
            code:'05',
            selected:false
          },
          {
            name:'6月',
            code:'06',
            selected:false
          },
          {
            name:'7月',
            code:'07',
            selected:false
          },{
            name:'8月',
            code:'08',
            selected:false
          },
          {
            name:'9月',
            code:'09',
            selected:false
          },
          {
            name:'10月',
            code:'10',
            selected:false
          },
          {
            name:'11月',
            code:'11',
            selected:false
          },
          {
            name:'12月',
            code:'12',
            selected:false
          }
        ],
        style_list:[
          {
            name:'时尚新品型',
            code:'TAG180905112309082226',
            selected:false
          },
          {
            name:'折扣敏感型',
            code:'TAG180905113345558646',
            selected:false
          },
          {
            name:'无倾向型',
            code:'TAG180905113427261745',
            selected:false
          }
        ],
        sex_list:[
          {
            name:'男',
            code:'male',
            selected:false
          },
          {
            name:'女',
            code:'female',
            selected:false
          },
          {
            name:'其他',
            code:'other',
            selected:false
          }
        ],
        card_style_list:[
        ],
        points:[
          {
            name:'0-1999',
            code:'TAG18000000000000000023',
            min:0,
            max:1999,
            selected:false
          },
          {
            name:'2000-5999',
            code:'TAG18000000000000000024',
            min:2000,
            max:5999,
            selected:false
          },
          {
            name:'6000-9999',
            code:'TAG18000000000000000025',
            min:6000,
            max:9999,
            selected:false
          },
          {
            name:'10000以上',
            code:'TAG18000000000000000026',
            min:10000,
            selected:false
          }
        ],
        season_list:[
          {
            name:'春',
            code:'TAG18000000000000000027',
            selected:false
          },
          {
            name:'夏',
            code:'TAG18000000000000000028',
            selected:false
          },
          {
            name:'秋',
            code:'TAG18000000000000000029',
            selected:false
          },
          {
            name:'冬',
            code:'TAG18000000000000000030',
            selected:false
          }
        ],
        member_list:[
        ],
        shopping_guide:[
        ]
      }
    },
    methods: {
      // tab切换
      active: function (tab) {
        this.isActive = tab;
        if(this.isActive=='create'){
          // init
          this.last_shopping_date_param_list=[];
          this.start_open_card_date=this.GetPreMonthDay(this.get_date_format(new Date()), 12);
          this.end_open_card_date=this.get_date_format(new Date());
          this.birthday_month_param_list=[];
          this.style_param_list=[];
          this.sex_param='';
          this.card_styles_param_list=[];
          this.point_param_list = [];
          this.tag_code_list = [];
          this.season_param_list = [];

          this.start_date=this.get_date_format(new Date());
          this.end_date=this.GetPreMonthDay(this.get_date_format(new Date()), -1);
          this.task_name='';
          this.task_context='';

          this.init_selected_to_false(this.last_shoping_date_list, this.last_shopping_date_param_list, 0);
          this.init_selected_to_false(this.birthday_month_list);
          this.init_selected_to_false(this.style_list);
          this.init_selected_to_false(this.sex_list);
          this.init_selected_to_false(this.card_style_list, this.card_styles_param_list, 0, 'level_code');
          this.init_selected_to_false(this.points, this.point_param_list, 0, 'code');
          this.init_selected_to_false(this.season_list);
          this.init_selected_to_false(this.shopping_guide);
          // this.$forceUpdate();
        }
      },
      init_selected_to_false: function (data_list, param_list, default_num, code) {
        for(let i=0;i<data_list.length;i++){
          if(i==default_num){
            data_list[i].selected = true;
            param_list.push(data_list[i][code]);
          }else if(!!data_list[i].selected){
            data_list[i].selected = false;
          }
        }
      },
      // select label
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
      get_date_format: function(date){
        var year = date.getFullYear();
        var day = date.getDate();
        var month = date.getMonth()+1;
        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
        return year + '-' + month + '-' + day;
      },
      GetPreMonthDay:function (date,monthNum) {
        var dateArr = date.split('-');
        var year = dateArr[0]; //获取当前日期的年份
        var month = dateArr[1]; //获取当前日期的月份
        var day = dateArr[2]; //获取当前日期的日
        var days = new Date(year, month, 0);
        days = days.getDate(); //获取当前日期中月的天数
        var year2 = year-parseInt(monthNum/12);
        var month2 = parseInt(month) - monthNum;
        if (month2 <=0) {
         year2 = parseInt(year2) - parseInt(month2 / 12 == 0 ? 1 : parseInt(month2) / 12);
         month2 = 12 - (Math.abs(month2) % 12);
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
         day2 = days2;
        }
        if (month2 < 10) {
         month2 = '0' + month2;
        }
        var t2 = year2 + '-' + month2 + '-' + day2;
        return t2;
      },
      transform_date: function (month_string_arr) {
        let month_date_arr = [];
        let now_date = new Date();
        let year_month_day = now_date.getFullYear() + '-' + ((now_date.getMonth()+1)<10 ? ('0'+(now_date.getMonth()+1)):(now_date.getMonth()+1)) + '-' + (now_date.getDate()<10 ? ('0'+now_date.getDate()):now_date.getDate())

        if(month_string_arr.length==2){
          month_date_arr[0] = this.GetPreMonthDay(year_month_day,month_string_arr[1]);
          month_date_arr[1] = this.GetPreMonthDay(year_month_day,month_string_arr[0]);
        }else{
          month_date_arr[0] = this.GetPreMonthDay(year_month_day,month_string_arr[0]);
          if(!!month_string_arr[1]){
            month_date_arr[1] = this.GetPreMonthDay(year_month_day,month_string_arr[1]);
          }
        }
        return month_date_arr;
      },
      doHandleMonth: function(month){  
        var m = month;  
        if(month.toString().length == 1){  
          m = "0" + month;  
        }  
        return m;  
      },
      getDay: function (day) {
        var today = new Date();  
        var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;          
        today.setTime(targetday_milliseconds); //注意，这行是关键代码
        var tYear = today.getFullYear();  
        var tMonth = today.getMonth();  
        var tDate = today.getDate();  
        tMonth = this.doHandleMonth(tMonth + 1);  
        tDate = this.doHandleMonth(tDate);
        return tYear+"-"+tMonth+"-"+tDate;
      },
      // 下一步到会员list
      next_member_list: function () {
        this.member_list_loading = true;
        this.loadingToastShow = true;
        // 最近购物日期
        let last_shopping_date_param_list = [];
        for(let i=0;i<this.last_shopping_date_param_list.length;i++){
          for(let j=0;j<this.last_shoping_date_list.length;j++){
            if(this.last_shopping_date_param_list[i]==this.last_shoping_date_list[j].code){
              let minMonth = this.last_shoping_date_list[j].minMonth;
              let maxMonth = this.last_shoping_date_list[j].maxMonth;
              if(!minMonth&&minMonth!=0){
                last_shopping_date_param_list.push(['none']);
              }else if(!maxMonth){
                last_shopping_date_param_list.push(this.transform_date([minMonth]));
              }else{
                last_shopping_date_param_list.push(this.transform_date([minMonth,maxMonth]));
              }
            }
          }
        }
        // 积分
        let point_param_list = [];
        for(let i=0;i<this.point_param_list.length;i++){
          for(let j=0;j<this.points.length;j++){
            if(this.point_param_list[i]==this.points[j].code){
              let min = this.points[j].min;
              let max = this.points[j].max;
              if(!max){
                point_param_list.push([min]);
              }else{
                point_param_list.push([min,max]);
              }
            }
          }
        }
        
        var data = {
          "login_name": this.login_name,
          "related_shop_id":this.shop_id,
          "tag_code_list":this.season_param_list.concat(this.style_param_list),
          "limit_size":200,
          "offset_size":1,
          "last_shopping_date_list":last_shopping_date_param_list,
          "start_open_card_date":this.start_open_card_date,
          "end_open_card_date":this.end_open_card_date,
          "birthday_month_list":this.birthday_month_param_list,
          "sex":this.sex_param,
          "level_code_list":this.card_styles_param_list,
          "point_range_list":point_param_list
        }
        console.log(data);
        MEMBER_LIST(data).then(res => {
          this.member_list = res.data.member_list;
          this.member_list.forEach(item => {
            item.selected = true;
          })
          this.isActive = 'member_list';
          // this.member_list_loading = false;
          this.loadingToastShow = false;
        })
      },
      toggle_select_click: function (e) {
        e.selected = !e.selected;
        this.$forceUpdate();
      },
      // 进去任务详情
      goTaskDetail: function (e) {
        this.isActive = 'now_task_info';
        this.edit = false;
        this.task_item = e;
        // 任务的状态：’draft’代表”草稿”，’process’代表”进行中”, ‘done’代表’完成’,’invalid’代表’作废’
        // switch(this.task_item.task_state){
        //   case 'draft':
        //     this.task_item.task_state_text = '未完成';
        //     break;
        //   case 'process':
        //     this.task_item.task_state_text = '进行中';
        //     break;
        //   case 'done':
        //     this.task_item.task_state_text = '完成';
        //     break;
        //   case 'invalid':
        //     this.task_item.task_state_text = '作废';
        //     break;
        // }
      },
      goMemberList: function () {
        var that = this;
        GET_MARKETING_TASK_INFO({'task_code': that.task_item.task_code}).then(res => {
          that.isActive = 'member_list2';
          that.member_list = res.data.task_info.member_list;
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
        if(!data.start_date||!data.end_date){
          alert('请输入任务时间');
          return;
        }
        this.loadingToastShow = true;
        // var data = this.task_item;
        UPDATE_TASK_INFO(data).then(res => {
          console.log(res);
          this.edit = false;
          this.loadingToastShow = false;
          // that.member_list = res.data.task_info.member_list;
        })
      },
      // 返回
      goBack1: function () {
        this.isActive = 'now_task';
      },
      // 返回
      goBack2: function () {
        this.isActive = 'now_task_info';
      },
      removeItem: function(src, cb) {
        var counter = src.length - 1;
        while (true) {
          var result = cb(src[counter]);
          if (result) {
            src.splice(counter, 1);
            counter = src.length - 1;
          } else {
            counter--;
          }
          if (counter < 0) {
            break;
          }
        }
      },
      // 下一步到编辑
      next_to_edit: function () {
        
        this.removeItem(this.member_list, c => c.selected == false);
        if(this.member_list.length==0){
          alert('请至少选择一个会员');
          return;
        }
        this.loadingToastShow = true;
        let that = this;
        // 导购列表
        GET_SEARCH_RELATED_USERS({"login_name": this.login_name, "related_shop_id":this.shop_id}).then(res => {
          console.log('导购列表', res);
          that.shopping_guide = res.data.user_info_list;
          that.shopping_guide.forEach(item => {
            item.selected = false;
          })
          that.isActive = 'task_edit';
          this.loadingToastShow = false;
        })
      },
      // 上一步到筛选
      pre_to_condition: function () {
        this.isActive = 'create';
      },
      // 返回
      cancel: function () {
        this.isActive = 'member_list'
      },
      // 完成
      finish: function () {
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
        this.loadingToastShow = true;
        var data={
          "login_name": this.login_name,
          "related_shop_id":this.shop_id,
          "res_code_list": this.guide_param_list,
          "start_date": this.start_date,
          "end_date": this.end_date,
          "task_context": this.task_context,
          "task_name": this.task_name,
          "member_info_list": this.member_list
        }
        
        MARKETING_TASK_EDIT_INFO(data).then(res => {
          // this.member_list = res.data.member_list;
          this.isActive = 'member_list';
          // this.member_list_loading = false;
          this.isActive = 'now_task';
          this.loadingToastShow = false;
          this.get_marketing_task_list();
        })
      },
      get_marketing_task_list: function () {
        this.loadingToastShow = true;
        var that = this;
        // 任务列表
        var data = {
          "login_name":this.login_name
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
      dispatchEvent(event, message) {
        this.$dispatch(event, message)
        if (event === 'weui-action-click') {
          this.hideActionSheet()
        }
      },
      hideActionSheet() {
        this.show = false;
      }
    },
    mounted: function() {
    },
    created(){
      // 任务列表
      this.get_marketing_task_list();
      var that = this;
      // // 门店shop_list
      // GET_SHOP_LIST({"login_name":this.login_name}).then(res => {
      //   console.log(res)
      //   this.shop_list = res.data.shop_info_list;
      //   this.shop_id = this.shop_list[0].shop_id
      // })
      // 等级
      MEMBER_LEVEL_LIST().then(res => {
        that.card_style_list = res.data.result;
        that.card_style_list.forEach(item => {
          item.selected = false;
        })
      })
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
  border: 1px solid #e4e5e5;
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
  color: #09BB07;
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
  /* background: #EDF0F4; */
}
.border{
  border: 1px solid #e4e5e5;
  background: #fbfcfe!important;
}
.no_border{
  border:0;
}
.font-weight-500{
  font-weight: 500;
}
.state{
  /* background: #EDF0F4; */
  background: #fff;
  border-radius: 1px;
  float: right;
  padding: 0 12px;
}
.jiange{
  height: 10px;
  width: 100%;
  background: #EDF0F4;
}
.task_state_text{
  text-align: right;
}
</style>
