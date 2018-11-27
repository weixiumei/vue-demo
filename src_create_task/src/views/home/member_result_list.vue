<template>
  <!-- 筛选出的会员list -->
  <div>
    <div v-if="member_list.length>0">
      <div style="padding-bottom: 1.6rem;">
        <div class="weui-cells" v-for="member in member_list" :key="member.code" v-on:click="toggle_select_click(member)">
          <div class="weui-cell" >
            <img src="static/img/check-box-on.png" v-show="member.selected" style="width: 20px;margin: 0 10px;">
            <img src="static/img/check-box-off.png" v-show="!member.selected" style="width: 20px;margin: 0 10px;">
            <div class="weui-cell__bd">
                <p class="member_name">{{member.member_name}}</p>
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
</template>
<script>
export default {
  data () {
    return {
      member_list:[],
      shop_id:localStorage.getItem('shop_id')*1,
    }
  },
  methods: {
    // 会员select
    toggle_select_click: function (e) {
      e.selected = !e.selected;
      this.$forceUpdate();
    },
    // 上一步到筛选
    pre_to_condition: function () {
      this.$router.push({
        name: '任务列表',
        params: {isActive: 'create'}
      })
    },
    // 下一步到任务编辑创建
    next_to_edit: function () {
      this.member_selected_list = [];
      for(var i=0;i<this.member_list.length;i++){
        if(this.member_list[i].selected){
          this.member_selected_list.push(this.member_list[i])
        }
      }
      if(this.member_selected_list.length==0){
        alert('请至少选择一个会员');
        return;
      }
      this.$router.push({
        name: '创建任务',
        params: {
          member_list: this.member_list,
          member_selected_list: this.member_selected_list
        }
      })
    }
  },
  created(){
    this.member_list = this.$route.params.member_list
  }
}
</script>

<style scoped>
.weui-cells{
  margin-top: 0;
  font-size: 14px;
}
.member_name{
  width: 4rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-right: 0;
}

</style>
