<template>
  <div class="">
    <div class="box">
      <textarea placeholder="编辑内容添加" class="textarea" v-model="content" maxlength="500" :style="{minHeight: height + 'px'}" ref='textArea'></textarea>
    </div>
    <div class="foot_fixed flex-center">
      <div class="btn flex-center flex_1" @click="cancel">取消</div>
      <div class="btn flex-center flex_2" @click="save"><span>保存</span></div>
    </div>
    <toast v-if="show" textMsg="已完成"></toast>
    <wv-dialog :title="dialog.title" :type = "dialog.type" @handle = "handle"  @maskCancel= "maskCancel" v-show = 'dialog.isDialogShow' ></wv-dialog>
  </div>
</template>

<script>
import toast from "./../../components/toast"
import wvDialog from "./../../components/dialog/Dialog"
import { ADD_LIST_GET } from "@/api"
  export default {
    name: "public",
    data() {
      return {
        //弹框是否展示
        show: false,
        height: 0,
        content: '',
        dialog: {
          title: '是否要取消?',
          type: 'confirm',
          isDialogShow: false
        }
      }
    },
    methods: {
      maskCancel() {
        this.dialog.isDialogShow = false
      },
      cancel() {
          this.dialog.isDialogShow = true
          this.dialog.title = '是否要取消?'
          this.dialog.type = 'confirm'        
      },
      handle (msg) {
        let that = this
        if(that.dialog.type === 'confirm') {
          if(msg == 'no') {
            that.dialog.isDialogShow = false
          }else{
            that.$router.push({
              name: "personCreat",
            }) 
          }
        }else{
          that.dialog.isDialogShow = false
        }
      },
      save() {
        let _data = {
          content: this.content
        }
        if(!this.content){
          this.dialog.isDialogShow = true
          this.dialog.title = '请填写编辑内容'
          this.dialog.type = 'alert'
          return
        }
        this.save_list_get(_data)
      },
      save_list_get: function (_data) {
        let that = this
        that.show = false;
        ADD_LIST_GET(_data).then(res => {
          that.show = true;
          setTimeout(function () {
              that.show= false
              that.$router.push({
                name: "personCreat",
              })               
          }, 1000);

        })
      },      
    },
    components: {
      toast,
      wvDialog
    },
    mounted () {
      var screabHeight = document.documentElement.clientHeight/2
      this.height = screabHeight
      this.$refs.textArea.focus()
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  scoped>
  .textarea{
    width: 100%;
    padding: 0.1rem;
    outline:none
  }
  .foot_fixed{
    position: fixed;
    padding: 0.1rem 0.24rem 0.1rem 0.24rem;
    bottom: 0;
    right: 0;
    left: 0;
    background: #ffffff;
    height: 0.98rem;
    font-weight: 700;
  }
  .btn{
    height: 100%;
    color: #ffffff;
    border-radius: 8px;
  }
  .flex_1{
    flex: 1;
    background: #A4ADB7;
    margin-right: 8px
  }
  .flex_2{
    flex: 2;
    background: #37A726;
    margin-left: 8px
  }
</style>
