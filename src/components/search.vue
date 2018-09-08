<template>
  <div class="page__bd" :class="{'search-open':open}">
    <div class="weui-search-bar" id="searchBar" :class="{'weui-search-bar_focusing': open}">
      <form class="weui-search-bar__form">
        <div class="weui-search-bar__box">
          <i class="weui-icon-search"></i>
          <input type="search" v-model="searchIpt" ref="searchInput" class="weui-search-bar__input"  placeholder="请输入关键字"/>
          <a href="javascript:" class="weui-icon-clear"  id="searchClear" v-on:click="searchClear"></a>
        </div>
        <label for="search_input" class="weui-search-bar__label" v-show="isSearchText" @click="searchText">
          <i class="weui-icon-search"></i>
            <span>搜索</span>
        </label>
      </form>
      <a href="javascript:" class="weui-search-bar__cancel-btn" v-show="isShowCancel" @click="cancelSearch">取消</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      isSearchText : true,
      //获取焦点
      focusState: false,
      open: false,
      searchIpt: "",
      isShowCancel: true
    };
  },
  methods: {
    searchText () {
      this.open = true
      this.focusState = true
      this.$refs.searchInput.focus()
    },
    closeHeader() {
      this.isShowCancel = true;
    },
    // 清除输入的内容 可以直接写 v-on:click="searchIpt=''"
    searchClear() {
        this.searchIpt = ""
        this.$refs.searchInput.focus()
    },
    cancelSearch () {
      this.$emit('searchCancel', this.searchIpt)      
      this.open = false
      this.isSearchText = true
    },
    hideSearchResult () {
      this.searchIpt = ''
    }
  },
  watch: {
    searchIpt: {
      handler: function(val,oldVal) {
       this.$emit('searchVal', val)
      }
    }
  },
  mounted() {
    this.searchText()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.search-open {
    z-index:10; 
    height:100%; 
    width:100%; 
    transition:.3s 
}

</style>
