<template>
  <div class="js_dialog" style="opacity: 1;">
    <div class="weui-mask" @click="maskFn"></div>
    <div class="weui-dialog">
      <div class="weui-dialog__hd">
        <strong class="weui-dialog__title">{{title}}</strong>
      </div>
      <div class="weui-dialog__bd">
        <slot></slot>
      </div>
      <div class="weui-dialog__ft">
        <a v-if="type === 'confirm'" href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" @click="callEvent('no')">{{cancelButton}}</a>
        <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" @click="callEvent('yes')">{{confirmButton}}</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'wv-dialog',
    data() {
      return {
        // isShow: false
      }
    },
    props: {
      /**
       * 对话框类型
       * alert: 提示框，只包含确定按钮（默认）
       * confirm: 询问框，包含确定和取消按钮
       */
      type: {
        type: String,
        required: false,
        default: 'alert'
      },   

      /**
       * 对话框标题
       */
      title: {
        type: String,
        required: true
      },

      /**
       * 确定按钮名称
       */
      confirmButton: {
        type: String,
        required: false,
        default: '确定'
      },

      /**
       * 取消按钮名称
       */
      cancelButton: {
        type: String,
        required: false,
        default: '取消'
      }

    },

    methods: {
      callEvent(event, message) {
        this.$emit('handle', event)
      },
      maskFn () {
        this.$emit('maskCancel','')
      }
    }
  }
</script>