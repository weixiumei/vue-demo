var Loading = {}
var showLoad = false // 存储loading显示状态
var loadNode = null // 存储loading节点元素

Loading.install = function (Vue) {
  Vue.prototype.$loading = function (status) {
    if (loadNode && status === 'close') {
      loadNode.show = showLoad = false
      return true
    } else if (showLoad) {
      return true
    } else if (status === undefined) {
      var LoadTpl = Vue.extend({
        data: function () {
          return {
            show: showLoad
          }
        },
        template: `
        <div v-show="show" id="loadingToast" style="display:none;">
          <div class="weui-mask_transparent"></div>
          <div class="weui-toast">
              <i class="weui-loading weui-icon_toast"></i>
          </div>
        </div>`
      })
      if (!loadNode) {
        loadNode = new LoadTpl()
        var tpl = loadNode.$mount().$el
        document.body.appendChild(tpl)
      }
      loadNode.show = showLoad = true
    }
  }
  Vue.prototype.$loading.close = function () {
    Vue.prototype.$loading('close')
  }
}
export default Loading
